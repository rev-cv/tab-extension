
// const regexDomain = /(?:https?|ftp):\/\/([^\s\/]+)(\/|$)/gm;

const regexDomain = /^(?:https?|ftp):\/\/([^\/]+)/;

function getCurrentTabs(tabs, date){
    // преобразование текущих открытых вкладок в объект для расширения

    let currentTabs = [];

    tabs.forEach( tab => {
        if (!tab.pinned) {

            let domain = regexDomain.exec(tab.url);

            if (domain === null) {
                if ( tab.url.includes("file:///") ) {
                    domain = ["", "file"];
                } else if ( tab.url.includes("chrome-extension://") ) {
                    domain = ["", "chrome-extension"];
                } else if ( tab.url.includes("chrome://extensions/") ) {
                    domain = ["", "extensions"];
                }
            }

            if (domain != null) {

                const isTabEx = domain[1] === "chrome-extension" && tab.title === "TabEx";

                if (!isTabEx) {
                    currentTabs.push({
                        id: tab.id,
                        title: tab.title,
                        url: tab.url,
                        icon: tab.favIconUrl,
                        date,
                        domain: domain[1],
                        description: "",
                    })
                }
            } else {
                console.log("--------------")
                console.log(tab)
                console.log(domain)
            }
        }
    });

    return currentTabs
}

function getCurrentDate () {
    // стандартизированная функция получения текущего времени
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth()).padStart(2,0);
    const d = String(date.getDay()).padStart(2,0);
    const H = String(date.getHours()).padStart(2,0);
    const M = String(date.getMinutes()).padStart(2,0);
    const S = String(date.getSeconds()).padStart(2,0);
    return `${y}-${m}-${d} ${H}:${M}:${S}`
}


function addCurrentSession () {
    // добавление текущей сессии при первом открытии окна расширения
    const date = getCurrentDate();

    chrome.tabs.query({ currentWindow: true }, tabs => {
        setGroup({
            id: "current",
            name: "Current",
            date,
            tabs: getCurrentTabs(tabs, date)
        })
    });

}


document.addEventListener('visibilitychange', () => {
    // обновление текущих вкладок при переходе на вкладку расширения
    const date = getCurrentDate();

    const current = document.querySelector("#current");
    const counter1 = document.querySelector("#point-for-current  > .count");
    const counter2 = current.querySelector(`.control-panel > .count`);
    current.querySelectorAll(".tab").forEach( elem => elem.remove())


    chrome.tabs.query({ currentWindow: true }, tabs => {
        const alltabs = getCurrentTabs(tabs, date);
        counter1.innerHTML = alltabs.length;
        counter2.innerHTML = alltabs.length;
        alltabs.forEach( tab => setTab(current, tab))
    });
});

addCurrentSession()


