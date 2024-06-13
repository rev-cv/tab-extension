import { useState, useEffect } from 'react';
import { exportInTabEx, exportInOneTab } from '../scripts/storage.js';
import './popup.css'

function PopUpExport (props) {
    const [showWidget, setShow] = useState(false);
    const [textExport, setExportText] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 10);
    }, []);

    const deleteWidget = () => {
        setShow(false)
        setTimeout(() => {
            props.close()
        }, 300);
    }

    const export1 = () => {
        exportInOneTab().then( text => setExportText(text) )
    }

    const export2 = () => {
        exportInTabEx().then( text => setExportText(text) )
    }

    return (
        <div className={showWidget ? "curtain show" : "curtain"} onClick={deleteWidget}>
            <div 
                id="popup-export" 
                className={!showWidget ? "disabled" : ""} 
                onClick={e => e.stopPropagation()}
                >
                <div className="title">Import from OneTab or TabEx</div>
                <textarea rows="10" value={textExport} onChange={e => {}}></textarea>
                <div className="btns">
                    <button onClick={export1}>OneTab format</button>
                    <button onClick={export2}>TabEx format</button>
                </div>
            </div>
        </div>
    )
}

export default PopUpExport;