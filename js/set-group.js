
let textObjGroup = {
    id: "g-202405051245",
    name: "",
    date: "2024-05-05T12:45", // дата создания
    tabs: [
        {
            id: "t-202405051245-0001",
            title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1 Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1 Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
            url: "https://habr.com/ru/companies/otus/articles/809865/",
            icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
            date: "2024-05-05T12:45",
            domain: "habr.com",
            description: "",
        },
        {
            id: "t-202405051245-0001",
            title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
            url: "https://habr.com/ru/companies/otus/articles/809865/",
            icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
            date: "2024-05-05T12:45",
            domain: "habr.com",
            description: "",
        },
        {
            id: "t-202405051245-0001",
            title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
            url: "https://habr.com/ru/companies/otus/articles/809865/",
            icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
            date: "2024-05-05T12:45",
            domain: "habr.com",
            description: "",
        },
        {
            id: "t-202405051245-0001",
            title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
            url: "https://habr.com/ru/companies/otus/articles/809865/",
            icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
            date: "2024-05-05T12:45",
            domain: "habr.com",
            description: "",
        },
        {
            id: "t-202405051245-0001",
            title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
            url: "https://habr.com/ru/companies/otus/articles/809865/",
            icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
            date: "2024-05-05T12:45",
            domain: "habr.com",
            description: "",
        },
        {
            id: "t-202405051245-0001",
            title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
            url: "https://habr.com/ru/companies/otus/articles/809865/",
            icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
            date: "2024-05-05T12:45",
            domain: "habr.com",
            description: "",
        },
        {
            id: "t-202405051245-0001",
            title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
            url: "https://habr.com/ru/companies/otus/articles/809865/",
            icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
            date: "2024-05-05T12:45",
            domain: "habr.com",
            description: "",
        },
        {
            id: "t-202405051245-0001",
            title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
            url: "https://habr.com/ru/companies/otus/articles/809865/",
            icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
            date: "2024-05-05T12:45",
            domain: "habr.com",
            description: "",
        },
        {
            id: "t-202405051245-0001",
            title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
            url: "https://habr.com/ru/companies/otus/articles/809865/",
            icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
            date: "2024-05-05T12:45",
            domain: "habr.com",
            description: "",
        },
        {
            id: "t-202405051245-0001",
            title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
            url: "https://habr.com/ru/companies/otus/articles/809865/",
            icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
            date: "2024-05-05T12:45",
            domain: "habr.com",
            description: "",
        },
    ],
}

const nodeMenu = document.querySelector("menu > .group-links")
const nodeGroups = document.querySelector("main > .groups")


function setGroup (objGroup) {

    let nameGroup = objGroup.name.length === 0 ? objGroup.date : objGroup.name;

    let group = document.createElement('div');
    group.id = objGroup.id;
    group.className = "g";

    // PANEL
    let panel = document.createElement('div');
    panel.className = "control-panel";
    group.append(panel);

    let btnSelect = document.createElement('button');
    btnSelect.className = "btn-g-select";
    btnSelect.innerHTML = '<svg class="icon"><use xlink:href="#ico-select"/></svg>'
    btnSelect.onclick = () => {
            group.classList.toggle("is-select-mode");
            group.querySelectorAll(".tab").forEach( elem => {
                elem.classList.remove("selected")
            })
            btnSelectAll.classList.remove("active");
            btnSelectAll.querySelector("span").innerHTML = 0;
    }
    panel.append(btnSelect);

    let inputTittle = document.createElement('input');
    inputTittle.className = "edit-title";
    inputTittle.type = "text";
    inputTittle.value = nameGroup;
    panel.append(inputTittle);

    let btnSortAlp = document.createElement('button');
    btnSortAlp.className = "btn-g-sort-alp";
    btnSortAlp.title = "sort alphabetically";
    btnSortAlp.innerHTML = '<svg class="icon"><use xlink:href="#ico-sort-alp"/></svg>'
    panel.append(btnSortAlp);
    
    let btnSortWWW = document.createElement('button');
    btnSortWWW.className = "btn-g-sort-www";
    btnSortWWW.title = "sort by domain";
    btnSortWWW.innerHTML = '<svg class="icon"><use xlink:href="#ico-www"/></svg>';
    panel.append(btnSortWWW);

    let count = document.createElement('div');
    count.className = "count";
    count.innerHTML = objGroup.tabs.length;
    panel.append(count);

    if (objGroup.id === "current") {
        let btnSave = document.createElement('button');
        btnSave.className = "btn-save";
        btnSave.title = "save to storage";
        btnSave.innerHTML = '<svg class="icon"><use xlink:href="#ico-save"/></svg>';
        btnSave.onclick = event => saveCurrentSession();
        panel.append(btnSave);
    }



    // SUB PANEL

    let subPanel = document.createElement('div');
    subPanel.className = "sub-control-panel";

    let btnSelectAll = document.createElement('button');
    btnSelectAll.className = "select-all-select";
    btnSelectAll.innerHTML = `
        <svg class="icon"><use xlink:href="#ico-check-true"/></svg>
        <svg class="icon"><use xlink:href="#ico-check-false"/></svg>
        <span>0</span>
    `;
    btnSelectAll.onclick = () => {
            const allTabs = group.querySelectorAll(".tab");

            let select = 0;
            let nselect = 0;

            allTabs.forEach( elem => {
                if (elem.classList.contains("selected")) {
                    select += 1;
                } else {
                    nselect += 1;
                }
            })

            if (select <= nselect) {
                allTabs.forEach( elem => elem.classList.add("selected"));
                btnSelectAll.classList.add("active");
                btnSelectAll.querySelector("span").innerHTML = allTabs.length;
            } else {
                allTabs.forEach( elem => elem.classList.remove("selected"));
                btnSelectAll.classList.remove("active");
                btnSelectAll.querySelector("span").innerHTML = 0;
            }
    }
    subPanel.append(btnSelectAll);

    let btnOpenThis = document.createElement('button');
    btnOpenThis.className = "select-open-this";
    btnOpenThis.innerHTML = `
        <svg class="icon"><use xlink:href="#ico-this-win"/></svg>
        <span>open in this window</span>
    `;
    subPanel.append(btnOpenThis);

    let btnOpenNew = document.createElement('button');
    btnOpenNew.className = "select-open-new";
    btnOpenNew.innerHTML = `
        <svg class="icon"><use xlink:href="#ico-new-win"/></svg>
        <span>open in new window</span>
    `;
    subPanel.append(btnOpenNew);

    let btnDelete = document.createElement('button');
    btnDelete.className = "select-delete";
    btnDelete.innerHTML = `
        <svg class="icon"><use xlink:href="#ico-del"/></svg>
        <span>${ objGroup.id != "current" ? "delete" : "close" }</span>
    `;
    subPanel.append(btnDelete);


    group.append(subPanel);



    objGroup.tabs.forEach( tab => setTab(group, tab) );



    nodeGroups.append(group)



    let pointMenu = document.createElement('button');
    pointMenu.id = `point-for-${objGroup.id}`;
    pointMenu.onclick = () => {
            scrollToElement(group)
    }

    let pointMenuTitle = document.createElement('div');
    pointMenuTitle.className = "title";
    pointMenuTitle.innerHTML = nameGroup;
    pointMenu.append(pointMenuTitle);

    let pointMenuCount = document.createElement('div');
    pointMenuCount.className = "count";
    pointMenuCount.innerHTML = objGroup.tabs.length;
    pointMenu.append(pointMenuCount);

    nodeMenu.append(pointMenu);
}


function setTab (group, objTab) {
    let tab = document.createElement('div');
    tab.className = "tab";

    let sw = document.createElement('div');
    sw.className = "sw";
    tab.append(sw);

    let btnDelete = document.createElement('button');
    btnDelete.className = "btn-delete";
    btnDelete.innerHTML = '<svg class="icon"><use xlink:href="#ico-del"/></svg>'
    sw.append(btnDelete);

    let btnSelect = document.createElement('button');
    btnSelect.className = "btn-select";
    btnSelect.innerHTML = `
        <svg class="icon"><use xlink:href="#ico-check-true"/></svg>
        <svg class="icon"><use xlink:href="#ico-check-false"/></svg>
    `
    btnSelect.onclick = () => {
            tab.classList.toggle("selected")

            const allTabs = group.querySelectorAll(".tab");
            const btnAllSelect = group.querySelector(".select-all-select");
            const btnAllSelectCount = group.querySelector(".select-all-select > span");

            let select = 0;
            let nselect = 0;

            allTabs.forEach( elem => {
                if (elem.classList.contains("selected")) {
                    select += 1;
                } else {
                    nselect += 1;
                }
            })

            btnAllSelectCount.innerHTML = select;

            if (select === allTabs.length) {
                btnAllSelect.classList.add("active")
            } else {
                btnAllSelect.classList.remove("active")
            }
    }
    sw.append(btnSelect);

    let btnDomain = document.createElement('button');
    btnDomain.className = "btn-ico-domain";
    btnDomain.title = objTab.domain;
    btnDomain.innerHTML = objTab.icon != "" && objTab.icon != undefined ? 
        `<img src="${objTab.icon}" />`
        : objTab.domain === "extensions" ?
            '<svg class="icon"><use xlink:href="#ico-extension"/></svg>'
            : 
            '<svg class="icon"><use xlink:href="#ico-no-image"/></svg>'
    tab.append(btnDomain);

    let btnTitle = document.createElement('button');
    btnTitle.className = "btn-title";
    btnTitle.title = objTab.title;
    btnTitle.innerHTML = objTab.title;
    tab.append(btnTitle);

    let btnDescription = document.createElement('button');
    btnDescription.className = "btn-descr";
    btnDescription.title = "description";
    btnDescription.innerHTML = '<svg class="icon"><use xlink:href="#ico-code"/></svg>';
    tab.append(btnDescription);

    let btnDuplicates = document.createElement('button');
    btnDuplicates.className = "btn-dup";
    btnDuplicates.title = "duplicates";
    btnDuplicates.innerHTML = '<svg class="icon"><use xlink:href="#ico-dup"/></svg>';
    tab.append(btnDuplicates);

    if (objTab.description.length != 0) {
        let description = document.createElement('div');
        description.className = "description";
        btnDuplicates.innerHTML = objTab.description;
        tab.append(description);
    }

    group.append(tab);
}


function scrollToElement(element) {
    const container = nodeGroups.parentNode;
    let startScrollTop = container.scrollTop;
    let distance = element.offsetTop - container.scrollTop - 20;
    let duration = 500; // Длительность анимации в миллисекундах
    let startTime = null;
  
    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = Math.min(timeElapsed / duration, 1);
        const newScrollTop = startScrollTop + distance * (run < 0.5 ? 0.5 * Math.pow(run * 2, 2) : 1 - 0.5 * Math.pow(2 - run * 2, 2));
        
        container.scrollTop = newScrollTop;

        if (timeElapsed < duration) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}


// for (let index = 0; index < 10; index++) {
//     textObjGroup.id = `g-${index}`;
//     textObjGroup.name = `g-${index}`;
//     setGroup (textObjGroup);
// }

