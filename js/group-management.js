
const filterInput = document.querySelector("#text-input");

function sortTabs (group, list) {

    // сортировка добавленных в DOM ссылок на вкладки
    // в соответствии со списком содержащий порядок ID вкладок
    
    list.reverse()
    let lastNode;

    for (let index = 0; index + 1 < list.length; index++) {
        const referenceNode = index != 0 ? 
            lastNode 
            : 
            group.querySelector(`#tab-${list[index]}`);
        const nodeToMove = group.querySelector(`#tab-${list[index + 1]}`);
        group.insertBefore(nodeToMove, referenceNode);
        lastNode = nodeToMove;
    }
}


async function sortByTitle(group, tabs, isReverse=false){
    
    let sortedTabs = tabs.sort( (a, b) => a.title.localeCompare(b.title));

    if (isReverse) sortedTabs.reverse()

    sortTabs(group, sortedTabs.map( elem => elem.id))
}


async function sortForCurrentByTitle(isReverse) {
    // сортируются вкладки браузера

    const tabs = await chrome.tabs.query({ currentWindow: true });

    let sortedTabs = tabs.sort((a, b) => a.title.localeCompare(b.title));

    if (isReverse) sortedTabs.reverse()

    sortedTabs.forEach( (tab, index) => {
        chrome.tabs.move(tab.id, { index });
    });

    updateCurrentSession()
}


async function sortByDomain(group, tabs, isReverse=false) {

    let sortedTabs = tabs.sort( (a, b) => {

        let aDom = getDomain(a.url);
        let bDom = getDomain(b.url);

        if (aDom === null || bDom === null) {
            return false
        }

        aDom = aDom[1];
        bDom = bDom[1];

        if (aDom[1].slice(0, 4) === "www."){
            aDom = aDom.replace("www.", "")
        }

        if (bDom[1].slice(0, 4) === "www."){
            bDom = bDom.replace("www.", "")
        }

        return aDom.localeCompare(bDom)
    });

    if (isReverse) sortedTabs.reverse()

    sortTabs(group, sortedTabs.map( elem => elem.id))
}


async function sortForCurrentByDomain(isReverse) {
    // сортируются вкладки браузера

    const tabs = await chrome.tabs.query({ currentWindow: true });

    let sortedTabs = tabs.sort((a, b) => {

        let aDom = getDomain(a.url);
        let bDom = getDomain(b.url);

        if (aDom === null || bDom === null) {
            return false
        }

        aDom = aDom[1];
        bDom = bDom[1];

        if (aDom[1].slice(0, 4) === "www."){
            aDom = aDom.replace("www.", "")
        }

        if (bDom[1].slice(0, 4) === "www."){
            bDom = bDom.replace("www.", "")
        }

        return aDom.localeCompare(bDom)
    });

    if (isReverse) sortedTabs.reverse()

    sortedTabs.forEach( (tab, index) => {
        chrome.tabs.move(tab.id, { index });
    });

    updateCurrentSession()
}


async function backFiltration (event) {
    document.querySelectorAll(".g").forEach( node => {
        node.classList.remove("disabled")
    })
    document.querySelectorAll(".tab").forEach( node => {
        node.classList.remove("disabled")
    })

    document.querySelector("#back-filtration").style.visibility = "hidden";
    filterInput.value = "";
}


async function filtration (event) {

    const textFilter = filterInput.value.trim().toLowerCase();

    if (textFilter.length === 0) {
        backFiltration()
        return undefined
    }

    await iterationOverTabs(textFilter);

    document.querySelectorAll(".g").forEach( group => {
        if (group.querySelectorAll(".tab:not(.disabled)").length === 0){
            group.classList.add("disabled")
        } else {
            group.classList.remove("disabled")
        }
    })

    document.querySelector("#back-filtration").style.visibility = "visible";
}

async function iterationOverTabs (text) {
    const tabs = document.querySelectorAll(".tab");
    for (let index = 0; index < tabs.length; index++) {
        matchFilter(tabs[index], text)
    }
}

async function matchFilter (nodeTab, text) {

    let isMatch = false;

    if (nodeTab.querySelector(".btn-title").title.toLowerCase().includes(text)) {
        isMatch = true;
    } else if (nodeTab.dataset.toUrl.includes(text)) {
        isMatch = true;
    } else {
        const descr = nodeTab.querySelector(".description");
        if (descr != null) {
            if (descr.innerText.toLowerCase().includes(text)) {
                isMatch = true;
            }
        }
    }
    
    if (!isMatch) {
        nodeTab.classList.add("disabled")
    } else {
        nodeTab.classList.remove("disabled")
    }
}

document.querySelector("#start-filtration").onclick = filtration;
document.querySelector("#back-filtration").onclick = backFiltration;
document.querySelector("#back-filtration").style.visibility = "hidden";
filterInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') filtration()
});
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') backFiltration()
});