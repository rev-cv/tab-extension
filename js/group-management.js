
const filterInput = document.querySelector("#text-input");
const backFilter = document.querySelector("#back-filtration");
document.querySelector("#start-filtration").onclick = filtration;
backFilter.onclick = backFiltration;
backFilter.style.visibility = "hidden";
filterInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') filtration()
});
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') backFiltration()
});


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


let presetfilter = "td";
let filteringModeEnabled = false;
let appliedFilters = [];


async function backFiltration (event) {
    const show = ".g.disabled, .tab.disabled, .group-links > .disabled";
    document.querySelectorAll(show).forEach( node => {
        node.classList.remove("disabled")
    })
    backFilter.style.visibility = "hidden";
    filterInput.value = "";
    filteringModeEnabled = false;
    appliedFilters = [];

    nodeGroups.querySelectorAll(".tab.selected").forEach( node => {
        node.classList.remove("selected")
    })

    nodeGroups.querySelectorAll(".g.is-select-mode").forEach( node => {
        node.classList.remove("is-select-mode")
    })
}


async function filtration (event) {

    appliedFilters = filterInput.value
        .toLowerCase()
        .split(",")
        .map( c => c.trim() )
        .filter( c => c != "" );

    if (appliedFilters.length === 0) {
        backFiltration()
        return undefined
    }

    filteringModeEnabled = true;

    const [tabs, groups, points] = await filteringByCondition(presetfilter, appliedFilters);

    if (tabs.length === 0) {
        document.querySelectorAll(".g, .menu-bottom > button").forEach( node => {
            node.classList.add("disabled")
        })
    } else {
        const hide = `.tab:not(${tabs}), .g:not(${groups}), button:not(${points})`;
        const show = `${tabs}, ${groups}, ${points}, #point-for-current, #group-current`;
        
        document.querySelectorAll(hide).forEach( node => {
            node.classList.add("disabled")
        })

        document.querySelectorAll(show).forEach( node => {
            node.classList.remove("disabled")
        })
    }

    filtrationCurrent(presetfilter, appliedFilters);
    backFilter.style.visibility = "visible";

    nodeGroups.querySelectorAll(".tab.selected").forEach( node => {
        node.classList.remove("selected")
    })

    nodeGroups.querySelectorAll(".g.is-select-mode").forEach( node => {
        node.classList.remove("is-select-mode")
    })
}


document.querySelectorAll(".presets > button").forEach( (btn, index, array) => {
    btn.onclick = event => {
        array.forEach( bbb => bbb.classList.remove("active") );
        event.currentTarget.classList.add("active");
        presetfilter = event.currentTarget.dataset.preset;
    }   
})


function setPreset (preset) {
    document.querySelectorAll(".presets > button").forEach( btn => 
        btn.classList.remove("active")
    )
    document.querySelector(`.presets > button[data-preset="${preset}"]`)
        .classList.add("active");
    presetfilter = preset;
}
