import { getCurrentDate, getDomain } from './utils';


export function ex__launchObserver(callback) {
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

        return conversionToExtensionFormat(tabs, date)

    } catch (error) {
        console.log("Retrieving current tabs failed")
        return []
    }
}


export function ex__openTab (event, isCurrent) {
    // открытие вкладок в браузере
    try {
        if (isCurrent) {
            chrome.tabs.update(objTab.id, { active: true });
        } else if (event.button === 0) {
            chrome.tabs.create({ url: objTab.url });
        } else if (event.button === 1) {
            chrome.tabs.create({ url: objTab.url, active: false });
        }
    } catch (error) {
        console.log("Open tab")
    }
}






