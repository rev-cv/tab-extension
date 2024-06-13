import { getDomain } from './utils';


var db = new Dexie("tab-ex-database");
db.version(1).stores({
    tabs: `++id, title, url, icon, date, domain, description`,
    tags: `++id, name, description`,
    sessions: `++id, name, date`,
});


export async function getAllGroups() {
    const groups = await db.sessions.toArray();
    let delGroup = [];

    for (let i = 0; i < groups.length; i++) {
        const sess = groups[i];
        const tabs = await db.tabs.where('date').equals(sess.date).toArray();
        if (tabs.length === 0){
            delGroup.push(sess.id)
            db.sessions.delete(sess.id)
        } else {
            sess.tabs = tabs;
        }
    }
    return groups.filter( group => !delGroup.includes(group.id) )
}


export async function deleteTab (tabID, update) {

    const tab = await db.tabs.get(tabID);
    await db.tabs.delete(tabID);
    const count = await db.tabs.where('date').equals(tab.date).count();

    if (count === 0) {
        const group = await db.sessions.where('date').equals(tab.date).first();
        await db.sessions.delete(group.id)
    }

    update()
}


export async function renameGroup (groupID, newName, update) {
    const group = await db.sessions.get(groupID);
    const name = newName === "" ? group.date : newName;
    await db.sessions.update(group.id, { name });

    update()

    return name
}


export async function editDescriptionForTab ( tabID, description ) {
    db.tabs.update(tabID, { description })
}


export async function exportInOneTab (event) {
    let text = "";

    const sessions = await db.sessions.toArray();

    for (let i = 0; i < sessions.length; i++) {
        const tabs = await db.tabs.where('date').equals(sessions[i].date).toArray();
        tabs.forEach( tab => text += `${tab.url} | ${tab.title}\n`);
        text += "\n";
    }

    return text.trim()
}


export async function exportInTabEx (event) {
    let text = "";

    const sessions = await db.sessions.toArray();

    for (let i = 0; i < sessions.length; i++) {
        const tabs = await db.tabs.where('date').equals(sessions[i].date).toArray();

        text += `## ${sessions[i].name}\n`;
        text += `date: ${sessions[i].date}\n\n`;
        
        tabs.forEach( tab => {
            text += `- [${tab.title}](${tab.url}) ${tab.description}\n`
        });

        text += "\n";
    }

    return text.trim()
}


export async function importData(text){

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
        await saveImportData(addedGroup);

        return true
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


async function findIcon (domain) {

    const tab = await db.tabs.filter( tab => 
        tab.icon != "" && tab.icon != undefined && tab.domain === domain
    ).first();

    return tab === undefined ? "" : tab.icon
}


async function saveImportData (groups) {

    let sessions = [];
    let tabs = [];
    let groupDate = [];

    groups.forEach( g => {
        sessions.push({name: g.name, date: g.date});
        tabs = [...tabs, ...g.tabs];
        groupDate.push(g.date);
    })

    await db.tabs.bulkPut(tabs);
    await db.sessions.bulkPut(sessions);

    let groupFromDB = [];

    for (let i = 0; i < groupDate.length; i++) {
        const g = await db.sessions.where('date').equals(groupDate[i]).first();
        g.tabs = await db.tabs.where('date').equals(groupDate[i]).toArray();
        groupFromDB.push(g);
    }

    return groupFromDB;
}










// async function createGroup () {
//     const sessID = await db.sessions.bulkPut([{
//         name: "test",
//         date: "2024-05-05T12:45"
//     }]);

//     return sessID
// }
// async function createTab () {
//     await db.tabs.bulkPut([{
//         title: "611 Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
//         url: "https://habr.com/ru/companies/otus/articles/809865/",
//         icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
//         date: "2024-05-05T12:45",
//         domain: "habr.com",
//         description: "",
//     }]);
// }
// createGroup ()
// createTab ()
// createTab ()
// createTab ()
// createTab ()