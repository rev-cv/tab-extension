import { useState, useEffect } from 'react';
import Tab from '../Tab/Tab.jsx';
import { renameGroup } from '../scripts/storage.js';
import { getDomain } from '../scripts/utils.js';
import './group.css';


function Group (props) {
    const isCurrent = props.isCurrent === undefined ? false : props.isCurrent;

    const [isModeSelect, setModeSelect] = useState(false);
    const [selectedTabs, setSelectTabs] = useState([]);
    const [isAllSelected, setSelectAllSelect] = useState(false);
    const [tabs, setTabs] = useState([]);
    const [presetFilter, setpresetFilter] = useState("none")


    function selectAll () {
        if (selectedTabs.length === props.group.tabs.length){
            setSelectTabs([])
            setSelectAllSelect(false)

        } else {
            setSelectTabs(props.group.tabs.map( elem => elem.id))
            setSelectAllSelect(true)
        }
    }

    useEffect(() => {
        // отслеживание момента выделения всех tabs
        setSelectAllSelect(
            selectedTabs.length === props.group.tabs.length
        )
    }, [selectedTabs]);


    function filtration (tablist) {
        let sortedTabs = [];

        const sortByDomain = () => {
            return tablist.sort( (a, b) => {

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
        }

        switch (presetFilter) {
            case "none":
                sortedTabs = tablist
                break;
            case "+alp":
                sortedTabs = tablist.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "-alp":
                sortedTabs = tablist.sort((a, b) => a.title.localeCompare(b.title)).reverse();
                break;
            case "+dom":
                sortedTabs = sortByDomain();
                break;
            case "-dom":
                sortedTabs = sortByDomain().reverse();
                break;
            default:
                break;
        }

        return sortedTabs
    }

    useEffect(() => {
        setTabs(filtration([...props.group.tabs], presetFilter));
    }, [presetFilter, props.group.tabs]);

    return (
        <div 
            id={`group-${props.group.id}`}
            className={isModeSelect ? "g is-select-mode" : "g"} 
            >

            {/* GROUP PANEL */}

            <div className="control-panel">
                <button 
                    className="btn-g-select"
                    onClick={e => {
                        setModeSelect(!isModeSelect);
                        setSelectTabs([])
                    }}
                    >
                    <svg className="icon"><use xlinkHref="#ico-select"/></svg>
                </button>

                { isCurrent ?
                    <>
                        <button 
                            className="btn-save"
                            title="save to storage"
                            ><svg className="icon"><use xlinkHref="#ico-save"/></svg>
                        </button>

                        <h2>{props.group.name}</h2>
                    </>
                    : 
                    <>
                        <input 
                            type="text" 
                            id={`H2FORM-${props.group.id}`}
                            className="edit-title"
                            defaultValue={props.group.name} 
                            onBlur={e => {
                                renameGroup(
                                    props.group.id, e.target.value.trim(), props.updateGroups
                                ).then( newName => e.target.value = newName)
                            }}
                        />

                        <div
                            className="about-date"
                            title={props.group.date}
                            >{props.group.date.slice(0,10)}
                        </div>
                    </>
                }

                <button 
                    className='btn-g-sort-alp'
                    title='sort alphabetically'
                    onClick={e => setpresetFilter(
                        presetFilter === "+alp" ? "-alp" :
                            presetFilter === "-alp" ? "none" : "+alp")}
                    ><svg className="icon"><use xlinkHref="#ico-sort-alp"/></svg>
                    {
                        presetFilter === "+alp" ? 
                            <div className='reverse'>
                                <svg className="icon"><use xlinkHref="#ico-triangle-bottom"/></svg>
                            </div> :
                        presetFilter === "-alp" ? 
                            <div className='reverse'>
                                <svg className="icon"><use xlinkHref="#ico-triangle-top"/></svg>
                            </div> : ""
                    }
                </button>

                <button 
                    className='btn-g-sort-www'
                    title='sort by domain'
                    onClick={e => setpresetFilter(
                        presetFilter === "+dom" ? "-dom" :
                            presetFilter === "-dom" ? "none" : "+dom")}
                    ><svg className="icon"><use xlinkHref="#ico-www"/></svg>
                    {
                        presetFilter === "+dom" ? 
                            <div className='reverse'>
                                <svg className="icon"><use xlinkHref="#ico-triangle-bottom"/></svg>
                            </div> :
                        presetFilter === "-dom" ? 
                            <div className='reverse'>
                                <svg className="icon"><use xlinkHref="#ico-triangle-top"/></svg>
                            </div> : ""
                    }
                </button>

                <div className="count">{props.group.tabs.length}</div>
            </div>

            {/* GROUP SUB PANEL */}

            <div className="sub-control-panel">
                <button 
                    className={`select-all-select${isAllSelected ? " active" : ""}`} 
                    onClick={selectAll}
                    >
                    <svg className="icon"><use xlinkHref="#ico-check-true"/></svg>
                    <svg className="icon"><use xlinkHref="#ico-check-false"/></svg>
                    <span>{selectedTabs.length}</span>
                </button>

                <button 
                    className='select-open-this'
                    onClick={e => isCurrent ? console.log() : console.log()}
                    >
                    <svg className="icon">
                        <use xlinkHref={`#ico-${isCurrent ? "save" : "this-win"}`}/>
                    </svg>
                    <span>{ isCurrent ? "save" : "open in this window"}</span>
                </button>

                <button className='select-save-in-group'>
                    <svg className="icon"><use xlinkHref="#ico-move-to"/></svg>
                    <span>${isCurrent ? "save in group" : "move to group"}</span>
                </button>

                <button className='select-open-new'>
                    <svg className="icon"><use xlinkHref="#ico-new-win"/></svg>
                    <span>open in new window</span>
                </button>
                
                <button className='select-delete'>
                    <svg className="icon"><use xlinkHref="#ico-del"/></svg>
                    <span>${ isCurrent ? "close" : "delete" }</span>
                </button>
            </div>

            {/* GROUP TABS */}

            {
                tabs.map( item => 
                    <Tab 
                        tab={item} 
                        key={item.id} 
                        updateGroups={props.updateGroups} 
                        isCurrent={isCurrent}
                        selectedTabs={selectedTabs}
                        setSelectTabs={setSelectTabs}
                    />
                )
            }
        </div>
    )
}

export default Group
