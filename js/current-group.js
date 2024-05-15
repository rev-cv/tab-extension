

function getDomain (url) {
    let domain = /^(?:https?|ftp):\/\/([^\/]+)/.exec(url);

    if (domain === null) {
        if ( url.includes("file:///") ) {
            domain = ["", "file"];
        } else if ( url.includes("chrome-extension://") ) {
            domain = ["", "chrome-extension"];
        } else if ( url.includes("chrome://extensions/") ) {
            domain = ["", "extensions"];
        } else if (url.includes("chrome://newtab/")) {
            domain = ["", "newtab"];
        } else if (url.includes("chrome://downloads/")) {
            domain = ["", "downloads"];
        }
    }
    return domain
}

function getCurrentTabs(tabs, date){
    // преобразование текущих открытых вкладок в объект для расширения

    let currentTabs = [];

    tabs.forEach( tab => {
        if (!tab.pinned) {

            const domain = getDomain(tab.url);

            if (domain != null) {

                const isTabEx = domain[1] === "chrome-extension" && tab.title === "TabEx";

                // достать описание, если оно было задано для текущей вкладки
                const descr = dataDescriptionForCurrentTabs.filter( e => e.id === tab.id);

                if (!isTabEx) {
                    currentTabs.push({
                        id: tab.id,
                        title: tab.title,
                        url: tab.url,
                        icon: tab.favIconUrl,
                        date,
                        domain: domain[1],
                        description: descr.length === 1 ? descr[0].description : "",
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
    const m = String(date.getMonth()+1).padStart(2,0);
    const d = String(date.getDate()).padStart(2,0);
    const H = String(date.getHours()).padStart(2,0);
    const M = String(date.getMinutes()).padStart(2,0);
    const S = String(date.getSeconds()).padStart(2,0);
    return `${y}-${m}-${d} ${H}:${M}:${S}`
}


async function addCurrentSession () {
    // добавление текущей сессии при первом открытии окна расширения
    const date = getCurrentDate();

    const tabs = await chrome.tabs.query({ currentWindow: true });

    setGroup({
        id: "current",
        name: "Current",
        date,
        tabs: getCurrentTabs(tabs, date)
    })

}
addCurrentSession()


async function updateCurrentSession__FULL () {
    // перерисовывает группу Current

    const current = document.querySelector("#group-current");
    const counter1 = document.querySelector("#point-for-current > .count");
    const counter2 = current.querySelector(`.control-panel > .count`);

    current.querySelectorAll(".tab").forEach( elem => elem.remove());

    const tabs = getCurrentTabs(
        await chrome.tabs.query({ currentWindow: true }), 
        getCurrentDate()
    );

    counter1.innerText = tabs.length;
    counter2.innerText = tabs.length;
    tabs.forEach( tab => setTab(current, tab, true))

    if (filteringModeEnabled) filtrationCurrent(presetfilter, appliedFilters)
}


async function updateCurrentSession (IDTabUploaded) {

    // перерисовывает группу Current

    const currentGroup = document.querySelector("#group-current");
    const counter1 = document.querySelector("#point-for-current > .count");
    const counter2 = currentGroup.querySelector(`.control-panel > .count`);
    const current = currentGroup.querySelectorAll(".tab");

    /*
        Подобная сложная схема управлению ссылками на открытые вкладки 
        необходима для того, чтобы избежать лишних пересозданий ссылок
        и сгладить дерганье интерфейса появляющее при перерисовке.
    */

    // получение открытых окон
    const modified = getCurrentTabs(
        await chrome.tabs.query({ currentWindow: true }), 
        getCurrentDate()
    );

    const modifiedID = modified.map( tab => tab.id );
    const currentID = [];

    // удаление ссылок на закрытые вкладки
    current.forEach( elem => {
        const elemID = Number(elem.id.replace("tab-", ""));
        if (!modifiedID.includes(elemID)){
            elem.remove();
        } else {
            currentID.push(elemID)
        }
    })

    let isMoveTo = false;

    // добавление открытых вкладок
    for (let i = 0; i < modified.length; i++) {
        const elem = modified[i];

        if (elem.id === currentID[i]){
            // все находится на своих местах

            if (elem.id === IDTabUploaded){
                // обновление данных загруженной вкладки
                const imgSel = `#tab-${modified[i-1].id} > .btn-ico-domain > img`;
                const img = currentGroup.querySelector(imgSel);
                img.src = elem.favIconUrl != undefined ? elem.favIconUrl : "";

                const titleSel = `#tab-${modified[i-1].id} > .btn-title`;
                const title = currentGroup.querySelector(titleSel);
                title.innerText = elem.title;
            }

            continue
        }
        
        if (!currentID.includes(elem.id)) {
            // в currentGroup нет ссылки на вкладку
            // добавляется новая ссылка на вкладку
            const setAfterNode = i === 0 ?
                currentGroup.querySelector(`.sub-control-panel`)
                :
                currentGroup.querySelector(`#tab-${modified[i-1].id}`)

            setTab(currentGroup, elem, true, setAfterNode)
        } else {
            // требуется сортировка вкладок
            if (!isMoveTo) isMoveTo = true;
        }
    }

    if (isMoveTo)
        sortTabs(currentGroup, modifiedID)

    counter1.innerText = modified.length;
    counter2.innerText = modified.length;

    if (modified.length === 0) {
        currentGroup.classList.remove("is-select-mode");
    }

    if (filteringModeEnabled) filtrationCurrent(presetfilter, appliedFilters)
}


async function filtrationCurrent (preset, conditions) {

    const currentTabs = await chrome.tabs.query({ currentWindow: true });
    let tabs = [];

    switch (preset) {

        case "td": {                
            tabs = currentTabs.filter( elem => {
                const t = elem.title.toLowerCase();
                let d = dataDescriptionForCurrentTabs.find( descr => 
                    descr.id === elem.id
                )
                if (d === undefined) {
                    return conditions.some( c => t.includes(c) )
                } else {
                    d = d.toLowerCase();
                    return conditions.some( c => t.includes(c) || d.includes(c) )
                }
            });
            break;
        }

        case "tag": {
            const cons = conditions.map( c => c.startsWith("#") ? c : "#" + c);
            tabs = currentTabs.filter( elem => {
                let d = dataDescriptionForCurrentTabs.find( descr => 
                    descr.id === elem.id
                )
                if (d === undefined) {
                    return false
                } else {
                    d = d.toLowerCase();
                    return cons.some( d.includes(c) )
                }
            });
            break;
        }
        case "descr": {
            tabs = currentTabs.filter( elem => {
                let d = dataDescriptionForCurrentTabs.find( descr => 
                    descr.id === elem.id
                )
                if (d === undefined) {
                    return false
                } else {
                    d = d.toLowerCase();
                    return conditions.some( c => d.includes(c) )
                }
            });
            break;
        }
        case "title": {
            tabs = currentTabs.filter( elem => {
                const t = elem.title.toLowerCase();
                return conditions.some( c => t.includes(c) )
            });
        }
        case "domain": {
            tabs = currentTabs.filter( elem => {
                const d = getDomain(elem.url);
                return conditions.some( c => d === c )
            })
        }
        case "url": {
            tabs = currentTabs.filter( elem => 
                conditions.some( c => elem.url.includes(c) )
            )
        }
    }

    if (tabs.length > 0) {
        const tabID = tabs.map(item => `#tab-${item.id}`).join(", ");

        console.log(tabID)


        document.querySelectorAll(`#group-current > .tab:not(${tabID})`).forEach( node => {
            node.classList.add("disabled")
        })

        document.querySelectorAll(`#group-current > ${tabID}`).forEach( node => {
            node.classList.remove("disabled")
        })
    }
}

// обновление текущих вкладок при переходе на вкладку расширения
document.addEventListener('visibilitychange', updateCurrentSession__FULL);

// обновление текущих вкладок при закрытии какой-то вкладки
chrome.tabs.onRemoved.addListener(updateCurrentSession);

// обновление текущих вкладок при открытии какой-то вкладки
// chrome.tabs.onCreated.addListener(tab => {
//     const tabId = tab.id;
//     const onTabUpdated = (updatedTabId, changeInfo, updatedTab) => {
//         if (updatedTabId === tabId && changeInfo.status === "complete") {
//             // Вкладка полностью загружена
//             updateCurrentSession(tabId)
//             chrome.tabs.onUpdated.removeListener(onTabUpdated);
//         }
//     };
//     // отслеживание окончания загрузки вкладки
//     chrome.tabs.onUpdated.addListener(onTabUpdated);
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        updateCurrentSession();

        if (tab.favIconUrl) {
            detectiveIcons(
                getDomain(tab.url)[1],
                tab.favIconUrl
            )
        }

    }
});