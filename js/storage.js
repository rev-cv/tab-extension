
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