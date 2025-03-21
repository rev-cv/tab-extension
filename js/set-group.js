// пример группы
// {
//     id: "t-202405051245-0001",
//     title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
//     url: "https://habr.com/ru/companies/otus/articles/809865/",
//     icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
//     date: "2024-05-05T12:45",
//     domain: "habr.com",
//     description: "",
// },


const nodeMenu = document.querySelector("menu > .group-links")
const nodeGroups = document.querySelector("main > .groups")
let dataDescriptionForCurrentTabs = [];
async function clearDataDescr(arrTabID){
    arrTabID.forEach( tabID => {
        let dID = dataDescriptionForCurrentTabs.findIndex( d => d.id === tabID)
        if (dID >= 0) delete dataDescriptionForCurrentTabs[dID]
    })
}


function setGroup (objGroup, isAfterCurrent=false) {

    const nameGroup = objGroup.name.length === 0 ? objGroup.date : objGroup.name;
    const isCurrent = objGroup.id === "current";
    let currentSort = "none";

    let group = document.createElement('div');
    group.id = `group-${objGroup.id}`;
    group.className = "g";


    // GROUP PANEL


    let panel = document.createElement('div');
    panel.className = "control-panel";
    group.append(panel);
    
    let btnSelect = document.createElement('button');
    btnSelect.className = "btn-g-select";
    btnSelect.innerHTML = '<svg class="icon"><use xlink:href="#ico-select"/></svg>'
    btnSelect.onclick = event => {
            const tabs = group.querySelectorAll(".tab");
            if (tabs.length != 0){
                group.classList.toggle("is-select-mode");
                tabs.forEach( elem => {
                    elem.classList.remove("selected")
                })
                btnSelectAll.classList.remove("active");
                btnSelectAll.querySelector("span").innerText = 0;
            }
    };
    panel.append(btnSelect);

    if (isCurrent) {
        let btnSave = document.createElement('button');
        btnSave.className = "btn-save";
        btnSave.title = "save to storage";
        btnSave.innerHTML = '<svg class="icon"><use xlink:href="#ico-save"/></svg>';
        btnSave.onclick = saveCurrentSession;
        panel.append(btnSave);
    } 

    if (isCurrent) {
        let inputTittle = document.createElement('h2');
        inputTittle.innerText = nameGroup;
        panel.append(inputTittle);
    } else {

        let inputTittle = document.createElement('input');
        inputTittle.id = `H2FORM-${objGroup.id}`
        inputTittle.className = "edit-title";
        inputTittle.type = "text";
        inputTittle.value = nameGroup;
        inputTittle.onchange = event => {
            if (inputTittle.value.length === 0) {
                inputTittle.value = objGroup.date;
            }
            renameGroup(objGroup.id, inputTittle.value);
            pointMenuTitle.innerText = inputTittle.value;
        };
        panel.append(inputTittle);

        let viewDate = document.createElement('div');
        viewDate.className = "about-date";
        viewDate.innerHTML = objGroup.date.slice(0,10);
        viewDate.title = objGroup.date;
        panel.append(viewDate);
    }

    let btnSortAlp = document.createElement('button');
    btnSortAlp.className = "btn-g-sort-alp";
    btnSortAlp.title = "sort alphabetically";
    btnSortAlp.innerHTML = '<svg class="icon"><use xlink:href="#ico-sort-alp"/></svg>';
    btnSortAlp.onclick = event => {
            // сортировка по title
            currentSort = currentSort === "+alp" ? "-alp" : "+alp";
            if (isCurrent) {
                sortForCurrentByTitle(currentSort === "-alp");
            } else {
                sortByTitle(group, objGroup.tabs, currentSort === "-alp")
            }
    }
    panel.append(btnSortAlp);
    
    let btnSortWWW = document.createElement('button');
    btnSortWWW.className = "btn-g-sort-www";
    btnSortWWW.title = "sort by domain";
    btnSortWWW.innerHTML = '<svg class="icon"><use xlink:href="#ico-www"/></svg>';
    btnSortWWW.onclick = event => {
            // сортировка по domain
            currentSort = currentSort === "+dom" ? "-dom" : "+dom";
            if (isCurrent) {
                sortForCurrentByDomain(currentSort === "-dom");
            } else {
                sortByDomain(group, objGroup.tabs, currentSort === "-dom")
            }
    }
    panel.append(btnSortWWW);

    let count = document.createElement('div');
    count.className = "count";
    count.innerText = objGroup.tabs.length;
    panel.append(count);


    // GROUP SUB PANEL

    
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
            const allTabs = group.querySelectorAll(".tab:not(.disabled)");

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
                btnSelectAll.querySelector("span").innerText = allTabs.length;
            } else {
                allTabs.forEach( elem => elem.classList.remove("selected"));
                btnSelectAll.classList.remove("active");
                btnSelectAll.querySelector("span").innerText = 0;
            }
    }
    subPanel.append(btnSelectAll);

    if (!isCurrent) {
        let btnOpenThis = document.createElement('button');
        btnOpenThis.className = "select-open-this";
        btnOpenThis.innerHTML = `
            <svg class="icon"><use xlink:href="#ico-this-win"/></svg>
            <span>open in this window</span>
        `;
        btnOpenThis.onclick = event => {
            group.querySelectorAll(".tab.selected").forEach( node => {
                chrome.tabs.create({ 
                    url: node.dataset.toUrl,
                    active: false
                });
            })
        };
        subPanel.append(btnOpenThis);
    } else {
        let btnSaveAndClose = document.createElement('button');
        btnSaveAndClose.className = "select-open-this";
        btnSaveAndClose.innerHTML = `
            <svg class="icon"><use xlink:href="#ico-save"/></svg>
            <span>save</span>
        `;
        btnSaveAndClose.onclick = saveSelectedTabs;
        subPanel.append(btnSaveAndClose);
    }

    let btnSaveInGroup = document.createElement('button');
    btnSaveInGroup.className = "select-save-in-group";
    btnSaveInGroup.innerHTML = `
        <svg class="icon"><use xlink:href="#ico-move-to"/></svg>
        <span>${isCurrent ? "save in group" : "move to group"}</span>
    `;
    btnSaveInGroup.onclick = event => {
        
            openPopUp("groups", groupObj => {

                if (isCurrent) {
                    saveSelectedTabsByGroup(groupObj);
                } else {

                    // получить выбранные вкладки
                    const nodetabs = group.querySelectorAll(".tab.selected");
                    const tabID = [...nodetabs].map( node => {
                        return Number(node.id.replace("tab-", ""))
                    });
                    
                    moveToGroup(groupObj, tabID);
                }

                closePopUp();
            })
    }
    subPanel.append(btnSaveInGroup);

    let btnOpenNew = document.createElement('button');
    btnOpenNew.className = "select-open-new";
    btnOpenNew.innerHTML = `
        <svg class="icon"><use xlink:href="#ico-new-win"/></svg>
        <span>open in new window</span>
    `;
    btnOpenNew.onclick = event => {
            const tabs = [...group.querySelectorAll(".tab.selected")];
            if (tabs.length != 0) {
                chrome.windows.create( { url: tabs[0].dataset.toUrl }, newWindow => {
                    tabs.splice(1,).forEach( node => {
                        chrome.tabs.create({
                            url: node.dataset.toUrl,
                            active: false,
                            windowId: newWindow.id
                        });
                    });
                })
            }
    }
    subPanel.append(btnOpenNew);

    let btnDelete = document.createElement('button');
    btnDelete.className = "select-delete";
    btnDelete.innerHTML = `
        <svg class="icon"><use xlink:href="#ico-del"/></svg>
        <span>${ objGroup.id != "current" ? "delete" : "close" }</span>
    `;
    btnDelete.onclick = event => {
            if (isCurrent) {
                group.querySelectorAll(".tab.selected").forEach( node => {
                    chrome.tabs.remove(
                        Number(node.id.replace("tab-", ""))
                    );
                })
            } else {
                deleteSelectedTabs(group)
            }
    }
    subPanel.append(btnDelete);


    group.append(subPanel);
    

    // GROUP TABS


    if (0 < objGroup.tabs.length){
        objGroup.tabs.forEach( tab => setTab(group, tab, isCurrent) );
    } else {
        // let noTabs = document.createElement('div');
        // noTabs.className = ".tab";
        // noTabs.innerHTML = "no tabs";
        // group.append(noTabs);
    }
    

    // LINK ON GROUP


    let pointMenu = document.createElement('button');
    pointMenu.id = `point-for-${objGroup.id}`;
    pointMenu.onclick = () => {
            scrollToElement(group)
    }

    pointMenu.insertAdjacentHTML( 'afterbegin', isCurrent ?
        '<svg class="icon"><use xlink:href="#ico-point-current"/></svg>'
        :
        '<svg class="icon"><use xlink:href="#ico-point-group"/></svg>'
    );

    let pointMenuTitle = document.createElement('div');
    pointMenuTitle.className = "title";
    pointMenuTitle.innerHTML = nameGroup;
    pointMenu.append(pointMenuTitle);

    let pointMenuCount = document.createElement('div');
    pointMenuCount.className = "count";
    pointMenuCount.innerText = objGroup.tabs.length;
    pointMenu.append(pointMenuCount);

    
    // место вставки группы
    if (isAfterCurrent) {
        document.querySelector("#point-for-current").after(pointMenu)
        document.querySelector("#group-current").after(group)
    } else {
        nodeMenu.append(pointMenu);
        nodeGroups.append(group)
    }
}


function setTab (group, objTab, isCurrent, previousNode) {

    let tab = document.createElement('div');
    tab.id = `tab-${objTab.id}`
    tab.className = "tab";
    tab.setAttribute("data-to-url", objTab.url.toLowerCase());
    tab.setAttribute("data-domain", objTab.domain);

    let sw = document.createElement('div');
    sw.className = "sw";

    let btnDelete = document.createElement('button');
    btnDelete.className = "btn-delete";
    btnDelete.innerHTML = '<svg class="icon"><use xlink:href="#ico-del"/></svg>'
    btnDelete.onclick = event => {
            if (isCurrent){
                // закрыть закрыть вкладку в браузере
                chrome.tabs.remove(objTab.id);
            } else {
                // удалить вкладку из базы
                tab.remove();
                deleteTab(objTab.id, objTab.date);
            }
    }

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

    sw.append(btnDelete, btnSelect);

    let btnDomain = document.createElement('button');
    btnDomain.className = "btn-ico-domain";
    btnDomain.title = objTab.domain;
    btnDomain.innerHTML = objTab.icon != "" && objTab.icon != undefined ? 
        `<img src="${objTab.icon}" />`
        : objTab.domain === "extensions" ?
            '<svg class="icon"><use xlink:href="#ico-extension"/></svg>'
            : 
            '<svg class="icon"><use xlink:href="#ico-no-image"/></svg>'
    btnDomain.onclick = event => {
        setPreset("domain")
        filterInput.value = objTab.domain;
        filtration();
    }

    let btnTitle = document.createElement('button');
    btnTitle.className = "btn-title";
    btnTitle.title = objTab.title;
    btnTitle.innerText = objTab.title;
    btnTitle.addEventListener("mousedown", event => {
        if (isCurrent) {
            chrome.tabs.update(objTab.id, { active: true });
        } else if (event.button === 0) {
            chrome.tabs.create({ url: objTab.url });
            // tab.remove();
            // deleteTab(objTab.id, objTab.date);
        } else if (event.button === 1) {
            chrome.tabs.create({ url: objTab.url, active: false });
        }
    })

    let btnDescription = document.createElement('button');
    btnDescription.className = "btn-descr";
    btnDescription.title = "description";
    btnDescription.innerHTML = '<svg class="icon"><use xlink:href="#ico-description"/></svg>';
    btnDescription.onclick = event => {
            const editInput = tab.querySelector(".edit-description");
            if (editInput){
                description.className = objTab.description.length != 0 ? "description" : "description hide";
                editInput.remove()
            } else {
                description.className = "description hide";
                setInputDescription(objTab, tab, description, isCurrent)
            }
    }

    let btnDuplicates = document.createElement('button');
    btnDuplicates.className = "btn-dup";
    btnDuplicates.title = "duplicates";
    btnDuplicates.innerHTML = '<svg class="icon"><use xlink:href="#ico-dup"/></svg>';
    btnDuplicates.onclick = event => {
        setPreset("url");
        filterInput.value = objTab.url;
        filtration();
    }

    let description = document.createElement('div');
    description.className = 0 < objTab.description.length ? "description" : "description hide";
    description.innerHTML = extractTagsAndLinks(encodeHTML(objTab.description)).replaceAll("\n", "<br>");
    setActionForBtnsInDescription(description)

    tab.append(
        sw,
        btnDomain,
        btnTitle,
        btnDescription,
        btnDuplicates,
        description
    );

    // отоборажение формы редактирования, если та не была закрыта ранее
    if (isCurrent) {
        let descr = dataDescriptionForCurrentTabs.find( d => d.id === objTab.id);
        if (descr != undefined) {
            if (descr.isEdited){
                description.className = "description hide";
                setInputDescription(objTab, tab, description, isCurrent)
            }
        }
    }

    if (previousNode) previousNode.after(tab)
    else group.append(tab)
}


function setInputDescription(objTab, nodeTab, nodeDescr, isCurrent){

    let form = document.createElement('div');
    form.className = "edit-description";

    const closeThisWidget = event => {
        nodeDescr.className = objTab.description.length != 0 ? 
            "description" : "description hide";
        if (isCurrent){
            let dID = dataDescriptionForCurrentTabs.findIndex( d => d.id === objTab.id)
            if (dID >= 0){
                dataDescriptionForCurrentTabs[dID].isEdited = false;
            }
        }
        form.remove()
    }

    let textarea = document.createElement('textarea');
    textarea.textContent = objTab.description;
    textarea.rows = 7;
    textarea.addEventListener("input", e => {
        const text = textarea.value.trim();
        if (isCurrent){
            let descr = dataDescriptionForCurrentTabs.find( d => d.id === objTab.id)

            if (descr != undefined ){
                descr.temp = text;
                descr.isEdited = true;
            } else {
                dataDescriptionForCurrentTabs.push({
                    id: objTab.id,
                    temp: text,
                    isEdited: true,
                })
            }
        }

    }) 
    form.append(textarea);

    if (isCurrent){
        let warning = document.createElement('span');
        warning.innerText = "Descriptions of open tabs are stored temporarily until the page is reloaded!"
        form.append(warning);
    }

    let form__ok = document.createElement('button');
    form__ok.innerText = "ok";
    form__ok.onclick = event => {
        const text = textarea.value.trim();
        nodeDescr.innerHTML = extractTagsAndLinks(encodeHTML(text)).replaceAll("\n", "<br>");
        setActionForBtnsInDescription(nodeDescr)
        objTab.description = text;

        if (isCurrent){
            let descr = dataDescriptionForCurrentTabs.find( d => d.id === objTab.id)

            if (descr != undefined ){
                descr.description = text;
                descr.isEdited = false;
            } else {
                dataDescriptionForCurrentTabs.push({
                    id: objTab.id,
                    description: text,
                    isEdited: false,
                })
            }
        } else {
            updateDescription(objTab.id, text);
        }
        closeThisWidget();
    }

    let form__cancel = document.createElement('button');
    form__cancel.innerText = "cancel";
    form__cancel.onclick = closeThisWidget;
    
    form.append(form__ok, form__cancel)
    nodeTab.append(form);

    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
}


function scrollToElement(element) {
    const container = nodeGroups.parentNode;
    let startScrollTop = container.scrollTop;
    let distance = element.offsetTop - container.scrollTop - 90;
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


function extractTagsAndLinks (description) {
    // заменяет #tag на кнопку #tag
    return description.replace(/(#[\d\w]{1,})(?=\s|$)/g, match => {
        return `<button class="open-tag" data-tag="${match}">${match}</button>`
    }).replace(/https:\/\/(.+?)(?= |$)/gm, match => {
        return `<button class="open-link" data-link="${match}">${match}</button>`
    })
}


function setActionForBtnsInDescription (nodeDescr) {
    nodeDescr.querySelectorAll(".open-tag").forEach(btn => {
        btn.onclick = event => {
            setPreset("tag");
            filterInput.value = event.currentTarget.dataset.tag;
            filtration();
        }
    })

    nodeDescr.querySelectorAll(".open-link").forEach(btn => {
        btn.onclick = event => {
            chrome.tabs.create({ 
                url: event.currentTarget.dataset.link, 
                active: false 
            });
        }
    })
}


function encodeHTML(str) {
    return str.trim().replace(/[<>\&]/gim, function(i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}
  