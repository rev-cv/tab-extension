
var db = new Dexie("tab-ex-database");
db.version(1).stores({
    tabs: `++id, title, url, icon, date, domain, description`,
    tags: `++id, name, description`,
    sessions: `++id, name, date`,
});


async function saveCurrentSession () {

    const date = getCurrentDate();
    const tabs = await chrome.tabs.query({ currentWindow: true });
    let tabsForWrite = getCurrentTabs(tabs, date);

    

    if (0 < tabsForWrite.length) {

        // сохранить информацию о сессии
        const sessID = await db.sessions.bulkPut([{name: date, date: date}]);

        tabsForWrite.forEach( tab => {
            chrome.tabs.remove(tab.id);
            delete tab.id;
        })

        // сохранить информацию о вкладках сессии
        await db.tabs.bulkPut(tabsForWrite);

        // отобразить добавленную в базу новую сессию
        const newTabs = await db.tabs.where('date').equals(date).toArray();
        setGroup({
            id: sessID,
            name: date, 
            date: date,
            tabs: newTabs
        }, true);

        // очистить вкладки из session current
        document.querySelectorAll("#group-current > .tab").forEach(old_tab => {
            old_tab.remove()
        })

        // очистить временное описание для не сохраненных вкладок
        clearDataDescr(tabs.map( item => item.id ));
    }

    if (filteringModeEnabled) filtration()
}


async function saveSelectedTabs () {

    const current = document.querySelector("#group-current");

    const tabID = [...current.querySelectorAll(".tab.selected")]
        .map( node => Number(node.id.replace("tab-", "")) )

    if (tabID.length != 0) {

        const date = getCurrentDate();
        
        let tabs = await chrome.tabs.query({ currentWindow: true })
        tabs = tabs.filter( tab => tabID.includes(tab.id) );

        if (tabs.length != 0) {
            // сохранить сессию в базу
            await db.sessions.bulkPut([{name: date, date: date}]);

            // сохранить вкладки в базу
            await db.tabs.bulkPut(
                getCurrentTabs(tabs, date)
            );

            // отобразить добавленную в базу группу 
            let newGroup = await db.sessions.where('date').equals(date).first();
            let newTabs = await db.tabs.where('date').equals(date).toArray();

            setGroup({
                id: newGroup.id,
                name: date, 
                date: date,
                tabs: newTabs
            }, true);

        }

        // очистить временное описание для не сохраненных вкладок
        clearDataDescr(tabID);
    }

    if (filteringModeEnabled) filtration()
}


async function deleteSelectedTabs(nodeGroup) {

    [...nodeGroup.querySelectorAll(".tab.selected")]
        .map( node => {
            const idn = Number(node.id.replace("tab-", ""));
            node.remove();
            return idn
        })
        .forEach( tabid => db.tabs.delete(tabid) )
    
    if (nodeGroup.querySelectorAll(".tab").length === 0){
        // группа пуста —> удалить
        const sessID = Number(nodeGroup.id.replace("group-", ""))
        db.sessions.delete(sessID);
        nodeGroup.remove()
        document.querySelector(`#point-for-${sessID}`).remove();
    }

}


function addAllSessions () {
    // отрисовывает все сессии

    db.sessions.toArray().then(sessions => {

        sessions.reverse().forEach( sess => {

            db.tabs.where('date').equals(sess.date).toArray().then(tabs => {

                setGroup({ ...sess, tabs });

            });
        });
    });
}
addAllSessions()


function deleteTab (tabID, session) {
    
    db.tabs.delete(tabID).then(() => {
        
        db.tabs.where('date').equals(session).count().then(count => {

            if (count === 0) {
                
                db.sessions.where('date').equals(session).first().then( sess => {
                    const sessID = sess.id;
                    db.sessions.delete(sessID)
                    document.querySelector(`#group-${sessID}`).remove();
                    document.querySelector(`#point-for-${sessID}`).remove();
                })
            } else {
                db.sessions.where('date').equals(session).first().then( sess => {
                    const sessID = sess.id;
                    document.querySelector(
                        `#group-${sessID} > .control-panel > .count`
                    ).innerHTML = count;
                    document.querySelector(`#point-for-${sessID} > .count`).innerHTML = count;
                })
            }
        })
    });
}


function checkingForEmptySession () {
    // проверка всех сессий на пустоту

    db.sessions.toArray().then(sessions => {

        sessions.forEach( sess => {

            db.tabs.where('date').equals(sess.date).count().then(count => {

                if (count === 0){
                    const sessID = sess.id;
                    db.sessions.delete(sessID);
                    document.querySelector(`#group-${sessID}`).remove();
                    document.querySelector(`#point-for-${sessID}`).remove();
                }
            });
        });
    })
}
checkingForEmptySession()


function updateDescription (id, description) {

    db.tabs.update(id, { description });

}

function renameGroup(id, name) {

    db.sessions.update(id, { name });

}


async function saveImportData (groups) {

    let sessions = [];
    let tabs = [];
    let groupDate = [];

    groups.forEach( g => {
        sessions.push({name: g.name, date: g.date});
        tabs = [...tabs, ...g.tabs];
        groupDate.push(g.date);
    })

    await db.tabs.bulkPut(tabs);
    await db.sessions.bulkPut(sessions);

    let groupFromDB = [];

    for (let i = 0; i < groupDate.length; i++) {
        const g = await db.sessions.where('date').equals(groupDate[i]).first();
        g.tabs = await db.tabs.where('date').equals(groupDate[i]).toArray();
        groupFromDB.push(g);
    }

    return groupFromDB;
}

async function findIcon (domain) {

    const tab = await db.tabs.filter( tab => 
        tab.icon != "" && tab.icon != undefined && tab.domain === domain
    ).first();

    return tab === undefined ? "" : tab.icon
}

async function detectiveIcons (domain, icon) {
    // добавляет иконки всем вкладкам с доментом у которых иконка отсутствует 

    const tabs = await db.tabs.filter( 
        tab => tab.icon === "" && tab.domain === domain
    ).toArray();

    tabs.forEach( tab => {
        db.tabs.update(tab.id, { icon });

        document.querySelector(`#tab-${tab.id} > .btn-ico-domain`).innerHTML = `
            <img src="${icon}" />
        `
    })
}


async function exportInOneTab (event) {
    let text = "";

    const sessions = await db.sessions.toArray();

    for (let i = 0; i < sessions.length; i++) {
        const tabs = await db.tabs.where('date').equals(sessions[i].date).toArray();
        tabs.forEach( tab => text += `${tab.url} | ${tab.title}\n`);
        text += "\n";
    }
    
    document.querySelector("#popup-export > textarea").textContent = text.trim();
}


async function exportInTabEx (event) {
    let text = "";

    const sessions = await db.sessions.toArray();

    for (let i = 0; i < sessions.length; i++) {
        const tabs = await db.tabs.where('date').equals(sessions[i].date).toArray();

        text += `## ${sessions[i].name}\n`;
        text += `date: ${sessions[i].date}\n\n`;
        
        tabs.forEach( tab => {
            text += `- [${tab.title}](${tab.url}) ${tab.description}\n`
        });

        text += "\n";
    }
    
    document.querySelector("#popup-export > textarea").textContent = text.trim();

}


async function filteringByCondition (preset, conditions) {
    
    const currentTabs = await chrome.tabs.query({ currentWindow: true });

    let tabs = [];

    switch (preset) {

        case "td": {                
            tabs = await db.tabs.filter( elem => {
                const t = elem.title.toLowerCase();
                const d = elem.description.toLowerCase();
                return conditions.some( c => t.includes(c) || d.includes(c) )
            }).toArray();
            break;
        }

        case "title": {
            tabs = await db.tabs.filter( elem => {
                const t = elem.title.toLowerCase();
                return conditions.some( c => t.includes(c))
            }).toArray();
            break;
        }
        
        case "tag": {
            const cons = conditions.map( c => c.startsWith("#") ? c : "#" + c);

            tabs = await db.tabs.filter( elem => {
                const d = elem.description.toLowerCase();
                return cons.some( c => d.includes(c))
            }).toArray();
            break;
        }

        case "descr": {
            tabs = await db.tabs.filter( elem => {
                const d = elem.description.toLowerCase();
                return conditions.some( c => d.includes(c))
            }).toArray();
            break;
        }

        case "domain": {
            tabs = await db.tabs.filter( elem => {
                const d = elem.domain.toLowerCase();
                return conditions.some( c => d === c )
            }).toArray();
            break;
        }

        case "url": {
            
            tabs = await db.tabs.filter( elem => {
                const u = elem.url.toLowerCase();
                return conditions.some( c => u.includes(c) )
            }).toArray();
            break;
        }
    }

    const dates = Array.from(new Set( tabs.map(item => item.date) ))

    const sess = await db.sessions.where('date').anyOfIgnoreCase(dates).primaryKeys();

    return [
        tabs.map(item => `#tab-${item.id}`).join(", "), 
        sess.map(item => `#group-${item}`).join(", "),
        sess.map(item => `#point-for-${item}`).join(", "),
    ]
}


async function tagManagment (tagInTab) {
    // удаляет больше не присутствующие теги
    // добавляет вновь добавленные теги
}

async function getAllTags(){

    const regex = /(\#.*?)(?=\s|$)/gm;
    let result = [];

    const tabs = await db.tabs.filter( tab => tab.description.includes("#")).toArray();
    const tags = await db.tags.toArray();

    // const tagTagNames = tags.map( t => t.name);

    // подсчитывание количества тегов
    let counter = {};
    tabs.forEach( tab => {
        tab.description.match(regex).forEach(t => {
            counter[t] = counter[t] === undefined ? 1 : counter[t] + 1;
        })
    })

    // вывод тегов уже находящихся в базе
    const allTagInTabs = Object.keys(counter);
    let allTagInDB = [];
    await tags.forEach( t => {
        if (allTagInTabs.includes(t.name)) {
            result.push({
                id: t.id,
                name: t.name,
                description: t.description,
                count: counter[t.name],
            })
            allTagInDB.push(t.name)
        } else {
            // удалить элемент
            db.tags.delete(t.id)
        }
    });

    // вывод тегов НЕ находящихся в базе
    for (let i = 0; i < allTagInTabs.length; i++) {
        const t = allTagInTabs[i];
        if (!allTagInDB.includes(t)) {
            // добавить тег в базу
            const tagID = await db.tags.bulkPut([{name: t, description: ""}]);
            result.push({
                id: tagID,
                name: t,
                description: "",
                count: counter[t],
            })
        }
    }

    return result.sort( (a, b) => a.name.localeCompare(b.name) )
}


function updateTagDescription (id, description) {

    db.tags.update(id, { description });

}