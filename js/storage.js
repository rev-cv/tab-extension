
var db = new Dexie("tab-ex-database");
db.version(1).stores({
    tabs: `++id, title, url, icon, date, domain, description`,
    sessions: `++id, name, date`,
});


function saveCurrentSession () {

    const date = getCurrentDate();

    // сохранить вкладки

    chrome.tabs.query({ currentWindow: true }, tabs => {
        const tabsForWrite = getCurrentTabs(tabs, date)

        if (0 < tabsForWrite.length) {
            
            // сохранить информацию о сессии
            db.sessions.bulkPut([{name: date, date: date}]).then(sessID => {

                tabsForWrite.map(tab => {
                    // между прочим закрыть вкладку
                    chrome.tabs.remove(tab.id)
        
                    // удалить индекс заданный браузером
                    delete tab.id;
                    return tab;
                })

                // отобразить добавленную в базу новую сессию
                db.tabs.bulkPut(tabsForWrite).then( () => {

                    db.tabs.where('date').equals(date).toArray().then(newTabs => {

                        setGroup({
                            id: sessID,
                            name: date, 
                            date: date,
                            tabs: newTabs
                        }, true);

                    })
                })

                // очистить вкладки из session current
                document.querySelectorAll("#group-current > .tab").forEach(old_tab => {
                    old_tab.remove()
                })
            })
        }
    });
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

            // закрыть вкладки в браузере
            tabs.forEach( tab => chrome.tabs.remove(tab.id) );
            // очистка вкладок в current должна произойти автоматически

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
    }
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