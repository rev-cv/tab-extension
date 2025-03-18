
export function getDomain (url) {
    // получение доменного имени

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

export function getCurrentDate () {
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