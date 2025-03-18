import { getCurrentDate, getDomain } from './utils';


export function ex__observer(callback) {
    // запуск наблюдателя за изменениями в текущих открытых вкладках
    // при каждом изменении выполняется переданная функция

    try {
        // обновление текущих вкладок при переходе на вкладку расширения
        document.addEventListener('visibilitychange', callback);

        // обновление текущих вкладок при закрытии какой-то вкладки
        chrome.tabs.onRemoved.addListener(callback);

        // обновление текущих вкладок при открытии какой-то вкладки
        chrome.tabs.onCreated.addListener(callback);

        // обновление текущих вкладок при завершении загрузки вкладки
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.status === 'complete') 
                callback()
        });

        // chrome.webNavigation.onCommitted.addListener((details) => {
        //     console.log('Navigation committed:', details);
        // });
        
        chrome.webNavigation.onDOMContentLoaded.addListener(details => callback());
        
        // chrome.webNavigation.onCompleted.addListener((details) => {
        //     console.log('Page fully loaded:', details);
        // });
    } catch (error) {
        console.log("Observer launch failed")
    }
}


export async function ex__getCurrentTabs() {
    // получение информации о всех открытых вкладках

    try {
        const date = getCurrentDate();

        const tabs = await chrome.tabs.query({ currentWindow: true });

        const conversionToExtensionFormat = (tabs, date) => {
            let currentTabs = [];

            tabs.forEach( tab => {
                if (!tab.pinned) {

                    const domain = getDomain(tab.url);

                    if (domain != null) {

                        const isTabEx = domain[1] === "chrome-extension" && tab.title === "TabEx";

                        // // достать описание, если оно было задано для текущей вкладки
                        // const descr = dataDescriptionForCurrentTabs.find( e => e.id === tab.id);

                        if (!isTabEx) {
                            currentTabs.push({
                                id: tab.id,
                                title: tab.title,
                                url: tab.url,
                                icon: tab.favIconUrl,
                                date,
                                domain: domain[1],
                                // description: descr === undefined ? "" : descr.description,
                                description: "",
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

        return conversionToExtensionFormat(tabs, date)

    } catch (error) {
        console.log("Error #4785 ")
        console.log(error)
        return []
    }
}


export async function ex__filterCurrentTabs (mode, requests) {

    let result = [];

    try {
        const tabs = await ex__getCurrentTabs();

        switch (mode) {
            case 0: { // title + description
                result = tabs.filter( tab => {
                    const title = tab.title.toLowerCase();
                    const descr = tab.description.toLowerCase();
                    for (let i = 0; i < requests.length; i++) {
                        if (title.includes(requests[i]) || descr.includes(requests[i])) 
                            return true;
                    }
                    return false
                })
                break;
            }
            case 1: { // title
                result = tabs.filter( tab => {
                    const title = tab.title.toLowerCase();
                    for (let i = 0; i < requests.length; i++) {
                        if (title.includes(requests[i])) 
                            return true;
                    }
                    return false
                })
                break;
            }
            case 2: // description & tag
            case 3: {
                result = tabs.filter( tab => {
                    const descr = tab.description.toLowerCase();
                    for (let i = 0; i < requests.length; i++) {
                        if (descr.includes(requests[i])) 
                            return true;
                    }
                    return false
                })
                break;
            }
            case 4: { // domain
                result = tabs.filter( tab => {
                    const domain = tab.domain.toLowerCase();
                    for (let i = 0; i < requests.length; i++) {
                        if (domain.includes(requests[i])) 
                            return true;
                    }
                    return false
                })
                break;
            }
            case 5: { // url
                result = tabs.filter( tab => {
                    const url = tab.domain.toLowerCase();
                    for (let i = 0; i < requests.length; i++) {
                        if (url.includes(requests[i])) 
                            return true;
                    }
                    return false
                })
                break;
            }
            default:
                break;
        }
    } catch (error) {
        
    }
    
    return result
}


export function ex__openTab (event, isCurrent, objTab) {
    // открытие вкладок в браузере
    try {
        if (isCurrent) {
            chrome.tabs.update(objTab.id, { active: true });
        } else if (event.button === 0) {
            chrome.tabs.create({ url: objTab.url });
        } else if (event.button === 1) {
            chrome.tabs.create({ url: objTab.url, active: false });
        }

        console.log(event.button)
    } catch (error) {
        console.log("Open tab > ", error)
    }
}


export function ex__closeTab (tabID) {
    chrome.tabs.remove(tabID);
}



