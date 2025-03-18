import { useState, useEffect } from 'react';
import { db__deleteTab } from '../scripts/storage.js';
import { ex__openTab, ex__closeTab } from '../scripts/chrome.js';
import DescriptionForm from './DescriptionForm.jsx';
import FormattedText from './FormattedText.jsx';
import './tab.css';

function Tab (props) {
    const tab = props.tab;
    const [isSelect, setSelect] = useState(false);
    const [isOpenDescr, setOpenDescr] = useState(false);
    const [textDescr, setTextDescr] = useState(props.tab.description);

    useEffect(() => {
        setSelect(
            props.selectedTabs.includes(props.tab.id)
        )
    }, [props.selectedTabs]);


    function selectThisTab () {
        if (props.selectedTabs.includes(props.tab.id)) {
            props.setSelectTabs(
                props.selectedTabs.filter( elem => elem != props.tab.id)
            )
            setSelect(false)
        } else {
            props.setSelectTabs([...props.selectedTabs, props.tab.id])
            setSelect(true)
        }
    }

    return (
        <div id={`tab-${props.tab.id}`} className={isSelect ? "tab selected" : "tab"}>
            <div className="sw">
                <button 
                    className='btn-delete'
                    onClick={e => {
                        props.isCurrent ? 
                            ex__closeTab(props.tab.id) :
                            db__deleteTab(props.tab.id, props.updateGroups)
                    }}
                    >
                    <svg className="icon"><use xlinkHref="#ico-del"/></svg>
                </button>
                <button className='btn-select' onClick={selectThisTab}>
                    <svg className="icon"><use xlinkHref="#ico-check-true"/></svg>
                    <svg className="icon"><use xlinkHref="#ico-check-false"/></svg>
                </button>
            </div>

            <button className='btn-ico-domain' onClick={e => props.filterGroups(4, props.tab.domain)}>
                {
                    props.tab.icon != "" && props.tab.icon != undefined ?
                        <img src={props.tab.icon} />
                        : props.tab.domain === "extensions" ?
                            <svg className="icon"><use xlinkHref="#ico-extension"/></svg>
                            : <svg className="icon"><use xlinkHref="#ico-no-image"/></svg>
                }
            </button>

            <button 
                className='btn-title' 
                title={props.tab.title} 
                onMouseDown={e => ex__openTab(e, props.isCurrent, props.tab)}
                >{props.tab.title}
            </button>

            <button 
                className='btn-descr' 
                title='description' 
                onClick={e => setOpenDescr(!isOpenDescr)}
                ><svg className="icon"><use xlinkHref="#ico-description"/></svg>
            </button>

            <button 
                className='btn-dup' 
                title='duplicates' 
                onClick={e => props.filterGroups(5, props.tab.url)}
                >
                <svg className="icon"><use xlinkHref="#ico-dup"/></svg>
            </button>

            {
                !isOpenDescr ? 
                
                <div 
                    className={0 >= textDescr.length ? `description hide` : `description`}
                    ><FormattedText description={textDescr} filterGroups={props.filterGroups} />
                </div>
                :
                <DescriptionForm 
                    tabID={props.tab.id}
                    text={textDescr}
                    close = {e => setOpenDescr(false)}
                    isCurrent={props.isCurrent}
                    setTextDescr={setTextDescr}
                />
            }
        </div>
    )
}

export default Tab
