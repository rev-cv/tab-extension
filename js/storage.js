
var db = new Dexie("tab-ex-database");
db.version(1).stores({
    tabs: `++id, title, url, icon, date, domain, description`,
    sessions: `++id, name, date`,
});


function saveCurrentSession () {

    const date = getCurrentDate();


    // сохранить информацию о сессии

    db.sessions.bulkPut([
        {name: date, date: date},
    ])


    // сохранить вкладки

    chrome.tabs.query({ currentWindow: true }, tabs => {
        const tabsForWrite = getCurrentTabs(tabs, date).map(tab => {
            // между прочим закрыть вкладку
            chrome.tabs.remove(tab.id)

            // удалить индекс заданный браузером
            delete tab.id;
            return tab;
        })

        db.tabs.bulkPut(tabsForWrite)
    });
    console.log("ok")
}
 
