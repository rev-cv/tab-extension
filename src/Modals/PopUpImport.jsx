import { useState, useEffect } from 'react';
import { importData } from '../scripts/storage.js';
import './popup.css'

function PopUpImport (props) {
    const [showWidget, setShow] = useState(false);
    const [textImport, setImportText] = useState("");

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

    const strartImport = () => {
        importData(textImport).then( () => {
            props.update();
            deleteWidget()
        })
    }

    return (
        <div className={showWidget ? "curtain show" : "curtain"} onClick={deleteWidget}>
            <div 
                id="popup-import" 
                className={!showWidget ? "disabled" : ""} 
                onClick={e => e.stopPropagation()}
                >
                <div className="title">Import from OneTab or TabEx</div>
                <textarea 
                    rows="10" 
                    value={textImport} 
                    onChange={e => setImportText(e.target.value)} 
                />
                <button onClick={strartImport}>import</button>
            </div>
        </div>
    )
}

export default PopUpImport;

