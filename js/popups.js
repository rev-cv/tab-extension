
const curtain = document.querySelector("#curtain");
curtain.addEventListener("mousedown", closePopUp)
const importPopUp = curtain.querySelector("#popup-import");
const donatePopUp = curtain.querySelector("#popup-donate");
const exportPopUp = curtain.querySelector("#popup-export");


[importPopUp, donatePopUp, exportPopUp].forEach( node => {
    node.onclick = event => event.stopPropagation();
})


document.querySelector("#btn-import").onclick = e => openPopUp("inport");
document.querySelector("#btn-donate").onclick = e => openPopUp("donate");
document.querySelector("#btn-export").onclick = e => openPopUp("export");
document.querySelector("#popup-import > button").onclick = importData;
document.querySelector("#btn-generate-onetab").onclick = exportInOneTab;
document.querySelector("#btn-generate-tabex").onclick = exportInTabEx;


function closePopUp (event) {

    if (event.target.id === "curtain" || event === undefined) {
        curtain.style.opacity = 0;
        setTimeout(() => {
            curtain.style.display = "none";
        }, 300);

        [importPopUp, donatePopUp, exportPopUp].forEach( node => {
            node.classList.add("disabled")
        })
    }
}


function openPopUp (window) {

    curtain.style.display = "flex";
    setTimeout(() => {
        curtain.style.opacity = 1;

        switch (window) {
            case "inport": {
                importPopUp.classList.remove("disabled"); break;
            }
            case "donate":{
                donatePopUp.classList.remove("disabled"); break;
            }
            case "export":{
                exportPopUp.classList.remove("disabled"); break;
            }
            default: break;
        }
    }, 10);
}


async function importData(){

    const text = document.querySelector("#popup-import > textarea").value.trim();

    if (text != "") {
        const strings = text.split("\n").map( str => str.trim());
        const countText = strings.length <= 7 ? strings.length - 1 : 7;

        const what = determineSource(strings.slice(0,countText))

        console.log("import from " + what)

        let addedGroup = [];

        if (what === "onetab") {
            addedGroup = await importFromOneTab(strings);
        } else if (what === "tabex") {
            addedGroup = await importFromTabEx(strings);
        }

        // группы добавляются в БД
        const groups = await saveImportData(addedGroup);

        groups.forEach( group => {
            setGroup(group, true)
        })

        closePopUp()
    }
}


function determineSource (strings) {

    /*
        определить источник полученного импорта TabEx или OneTab

        onetab - каждая страна начинается с буквы или пустая
        tabex - каждая строка начинается с "##", "date:", "- " или пустая

        return "tabex" | "onetab" | false
    */

    const isOneTab = strings.map( 
        str => /^\w/.exec(str) != null || str.trim() === ""
        ).every(Boolean);
    if (isOneTab) return "onetab"

    const isTabEx = strings.map(
        str => 
            str.startsWith("##") 
            || 
            str.startsWith("- ") 
            || 
            str.startsWith("date:") 
            || 
            str.trim() === ""
        ).every(Boolean);
    if (isTabEx) return "tabex"

    return false
}


async function importFromOneTab (strings) {

    let date = new Date();

    function getDate () {
        date = new Date(date.getTime() + 5000);
        const y = date.getFullYear();
        const m = String(date.getMonth()).padStart(2,0);
        const d = String(date.getDay()).padStart(2,0);
        const H = String(date.getHours()).padStart(2,0);
        const M = String(date.getMinutes()).padStart(2,0);
        const S = String(date.getSeconds()).padStart(2,0);
        return `${y}-${m}-${d} ${H}:${M}:${S}`
    }

    let currentDate = getDate();

    let groups = [{
        name: `import ${currentDate}`,
        date: currentDate,
        tabs: [],
    },];

    let currentGroup = 0;

    for (let index = 0; index < strings.length; index++) {
        const str = strings[index].trim();
        

        if (str != ""){
            
            let result = /(?<url>.*?) \| (?<title>.*)/g.exec(str);

            if (result === null) {
                console.log(str + "\nчто-то с этой строкой не то…")
                result = { groups : { url: str, title: str, } }
            }

            const domain = getDomain(result.groups.url)[1];

            groups[currentGroup].tabs.push({
                title: result.groups.title,
                url: result.groups.url,
                date: currentDate,
                domain: domain,
                description: "",
                icon: await findIcon(domain),
            })

        } else {
            // new group
            // если предыдущая группа пустая -> новая группа не нужна

            if (groups[currentGroup].tabs.length > 0) {
                currentGroup += 1;
                currentDate = getDate();
                groups.push({
                    name: `import ${currentDate}`,
                    date: currentDate,
                    tabs: [],
                })
            }
        }
    }

    return groups;
}


async function importFromTabEx (strings) {

    let groups = [];
    let currentGroup = -1;

    for (let index = 0; index < strings.length; index++) {
        const str = strings[index].trim();

        if (str === "") continue

        if (str.startsWith("## ")) {
            groups.push({
                name: str.replace("##", "").trim(),
                date: "",
                tabs: [],
            })
            currentGroup += 1;
        } else if (str.startsWith("date: ")){
            const d = str.replace("date: ", "").trim();
            groups[currentGroup].date = d;
            if (groups[currentGroup].name === "")
                groups[currentGroup].name = d
        } else if (str.startsWith("- ")) {

            const result = /- \[(?<title>.+)\]\((?<url>.+)\)(?<description>.*)/g.exec(str);

            if (result === null) {
                console.log(str + "\nчто-то с этой строкой не то…")
            }

            const domain = getDomain(result.groups.url)[1];

            groups[currentGroup].tabs.push({
                title: result.groups.title.trim(),
                url: result.groups.url.trim(),
                date: groups[currentGroup].date,
                domain: domain,
                description: result.groups.description.trim(),
                icon: await findIcon(domain)
            })

        }
    }

    return groups;

}


