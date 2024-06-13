import { useRef, useEffect } from 'react';
import { db__editDescriptionForTab } from '../scripts/storage.js';

function DescriptionForm (props) {

    const form = useRef();

    useEffect(() => {
        form.current.focus();
        form.current.selectionStart = form.current.value.length;
        form.current.selectionEnd = form.current.value.length;
    }, []);

    const warning = "Descriptions of open tabs are stored temporarily until the page is reloaded!"

    function editDescr () {
        const text = form.current.value.trim();

        if (!props.isCurrent) {
            db__editDescriptionForTab(props.tabID, text)
        } 
        
        props.setTextDescr(text)
        props.close()
    }

    return (
        <div className="edit-description">
            <textarea 
                ref={form}
                rows={7}
                defaultValue={props.text}
            />

            {
                props.isCurrent ? <span>{warning}</span> : ""
            }

            <button className="btn-save" onClick={editDescr}>ok</button>
            <button onClick={props.close}>cancel</button>
        </div>
    )
}

function DescriptionText (props) {

}

export default DescriptionForm
