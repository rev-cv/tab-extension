
let currentTabs = [];


function getDomain (url) {
    let domain = /^(?:https?|ftp?|chrome?):\/\/([^\/]+)/.exec(url);

    if (domain === null) {
        if ( url.includes("file:///") ) {
            domain = ["", "file"];
        } else if ( url.includes("chrome-extension://") ) {
            domain = ["", "chrome-extension"];
        }
    }
    return domain === null ? ["", "undefined"] : domain
}


function getCurrentTabs(tabs, date){
    // преобразование текущих открытых вкладок в объекты

    let currentTabs = []; // очистка глобальной переменной хранящий текущие вкладки

    tabs.forEach( tab => {
        if (!tab.pinned) {

            const domain = getDomain(tab.url);

            if (domain != null) {

                const isTabEx = domain[1] === "chrome-extension" && tab.title === "TabEx";

                // достать описание, если оно было задано для текущей вкладки
                const descr = dataDescriptionForCurrentTabs.find( e => e.id === tab.id);

                if (!isTabEx) {
                    currentTabs.push({
                        id: tab.id,
                        title: tab.title,
                        url: tab.url,
                        icon: tab.favIconUrl,
                        date,
                        domain: domain[1],
                        description: descr === undefined ? "" : descr.description,
                    })
                }
            } else {
                console.log("TAB NOT ADDED")
                console.log(`   URL: ${tab}`)
                console.log(`DOMAIN: ${domain}`)
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

    currentTabs = getCurrentTabs(tabs, date);

    setGroup({
        id: "current",
        name: "Current",
        date,
        tabs: currentTabs
    })

}
addCurrentSession()


async function updateCurrentSession__V4 () {

    /*
        V3
        Подобная сложная схема управлению ссылками на открытые вкладки 
        необходима для того, чтобы избежать лишних пересозданий ссылок
        и сгладить дерганье интерфейса появляющее при перерисовке.

        V4
        Универсальная схема обновления текущих вкладок.
    */

    const currentGroup = document.querySelector("#group-current");
    const counter1 = document.querySelector("#point-for-current > .count");
    const counter2 = currentGroup.querySelector(`.control-panel > .count`);
    
    const browserTabs = getCurrentTabs(
        await chrome.tabs.query({ currentWindow: true }), 
        getCurrentDate()
    );
    counter1.innerText = browserTabs.length;
    counter2.innerText = browserTabs.length;


    // поиск добавленных и измененных вкладок
    browserTabs.forEach( tab => {

        const oldTab = currentTabs.find( elem => elem.id === tab.id);

        // в старой версии нет вкладки? 
        if (oldTab === undefined) {
            // добавить новую вкладку
            setTab(currentGroup, tab, true)

        } else {

            // сравнить различия между старой и обновленной вкладкой

            if (tab.title != oldTab.title) {
                currentGroup.querySelector(
                    `#tab-${tab.id} > .btn-title`
                ).innerText = tab.title;
            }

            if (tab.icon != oldTab.icon)  {
                const img = currentGroup.querySelector(
                    `#tab-${tab.id} > .btn-ico-domain > img`
                )

                if (img === null) {
                    currentGroup.querySelector(
                        `#tab-${tab.id} > .btn-ico-domain`
                    ).innerHTML = `<img src="${tab.icon}" />`
                } else {
                    img.src = tab.icon;
                }
            }
        }
    })


    // поиск удаленных вкладок и удаление их из DOM
    let tabIDForDelete = [];
    const browserTabsID = browserTabs.map( elem => elem.id);
    currentTabs.forEach( (tab, index) => {
        if (!browserTabsID.includes(tab.id))
            tabIDForDelete.push(`#tab-${tab.id}`)
    })

    if (0 < tabIDForDelete.length){
        currentGroup.querySelectorAll(tabIDForDelete.join(", ")).forEach( node => 
            node.remove()
        )
    }


    currentTabs = [...browserTabs];


    // сортировка вкладок в DOM
    sortTabs (currentGroup, browserTabsID)
    

    // применение фильтрации, если она включена
    if (filteringModeEnabled) filtrationCurrent(presetfilter, appliedFilters)

    
    // выключение режима выделения, если выделять нечего
    if (browserTabs.length === 0) {
        currentGroup.classList.remove("is-select-mode");
    }

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
            tabs = currentTabs.filter( elem => {
                const u = elem.url.toLowerCase();
                return conditions.some( c => u.includes(c) )
            })
        }
    }

    if (tabs.length > 0) {
        const tabID = tabs.map(item => `#tab-${item.id}`).join(", ");
        
        document.querySelectorAll(`#group-current > .tab:not(${tabID})`).forEach( node => {
            node.classList.add("disabled")
        })

        document.querySelectorAll(`#group-current > ${tabID}`).forEach( node => {
            node.classList.remove("disabled")
        })
    }
}

// обновление текущих вкладок при переходе на вкладку расширения
document.addEventListener('visibilitychange', updateCurrentSession__V4);

// обновление текущих вкладок при закрытии какой-то вкладки
chrome.tabs.onRemoved.addListener(updateCurrentSession__V4);

// обновление текущих вкладок при открытии какой-то вкладки
chrome.tabs.onCreated.addListener(updateCurrentSession__V4);

// обновление текущих вкладок при завершении загрузки вкладки
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        updateCurrentSession__V4();

        if (tab.favIconUrl) {
            detectiveIcons(
                getDomain(tab.url)[1],
                tab.favIconUrl
            )
        }
    }
});