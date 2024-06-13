import { useState, useRef, useEffect } from 'react';
import './filter.css'

function Filter (props) {

    const searchPanel = useRef();
    
    const presets = [
        "title + description",
        "title",
        "description",
        "tag",
        "domain",
        "url",
    ]

    const [preset, setPreset] = useState(0);
    const [request, setRequest] = useState("");


    useEffect(() => {
        setPreset(props.presetForFilter);
        setRequest(props.requestForFilter);
    }, [props.requestForFilter, props.presetForFilter]);
    

    return (
        <div className="filter-panel">
            <button 
                id="back-filtration" 
                className={props.requestForFilter != 0 ? "active" : ""}
                onClick={e => props.filterGroups(preset, "")}
                >
                <svg className="icon"><use xlinkHref="#ico-back"/></svg>
            </button>
            <input 
                type="text" 
                ref={searchPanel}
                placeholder="filter, filter, filter" 
                value={request}
                onChange={e => setRequest(e.target.value)}
                onKeyDown={e => e.key === "Enter" && props.filterGroups(preset, e.target.value)}
            />
            <button id="open-all-tags">
                <svg className="icon"><use xlinkHref="#ico-tags"/></svg>
            </button>

            <div className="presets">
                <span>Search in</span>
                {
                    presets.map( (item, index) =>
                        <button 
                            className= { index === preset ? "active" : ""}
                            key={`preset-${index}`}
                            onClick={e => {
                                setPreset(index);
                                searchPanel.current.focus();
                                searchPanel.current.selectionStart = searchPanel.current.value.length;
                                searchPanel.current.selectionEnd = searchPanel.current.value.length;
                            }}
                            >{item}
                        </button>
                    )
                }

            </div>
        </div>
    )
}

export default Filter
