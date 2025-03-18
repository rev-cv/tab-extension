import { useState, useEffect } from 'react';
import { 
    db__getAllGroups, 
    db__getFilteredGroups 
} from './scripts/storage.js';

import { 
    ex__observer, 
    ex__getCurrentTabs,
    ex__filterCurrentTabs,
} from './scripts/chrome.js';


// WIDGETS
import SvgSprite from './Sprite/SVGSprite.jsx';
import Menu from './Menu/Menu.jsx';
import Filter from './Filter/Filter.jsx';
import Group from './Group/Group.jsx';

import './css-global/frame.css';


function App() {

    const [currentTabs, setCurrentTabs] = useState([]);
    const [groups, setGroups] = useState([]);

    
    const [requestForFilter, setRequest] = useState("");
    const [presetForFilter, setPreset] = useState(0);

    
    function updateGroups (isForceUpdate = false) {
        if (requestForFilter === "" || isForceUpdate) {
            db__getAllGroups().then( g => setGroups(g))
            ex__getCurrentTabs().then( t => setCurrentTabs(t))
        } else {
            filterGroups(presetForFilter, requestForFilter)
        }
    }


    function filterGroups (mode, string) {
        if (string.trim() === ""){
            setRequest("")
            setPreset(0)
            updateGroups(true)
            return
        }

        const requests = string.toLowerCase().split(",").map(item => item.trim());

        ex__filterCurrentTabs(mode, requests).then( result => setCurrentTabs(result) )
        db__getFilteredGroups(mode, requests).then( result => setGroups(result) )
        setRequest(string)
        setPreset(mode)
    }
  

    useEffect(() => {
        ex__observer(updateGroups)
        updateGroups();
    }, []);


    return (
    <>
        <SvgSprite />
        <Menu 
            points={groups} 
            currentTabs={currentTabs} 
            update={updateGroups} 
        />
        <main>
            <Filter 
                filterGroups={filterGroups} 
                requestForFilter={requestForFilter}
                presetForFilter={presetForFilter}
            />
            <div className="groups">
                {<Group 
                    key={"current"}
                    group={{
                        id: "current",
                        name: "Current",
                        date: "",
                        tabs: currentTabs,
                    }}
                    isCurrent={true}
                    updateGroups={updateGroups} 
                    filterGroups={filterGroups}
                />}
            
                {groups.map( group =>
                    <Group 
                        key={group.id}
                        group={group}
                        name={group.name}
                        updateGroups={updateGroups} 
                        filterGroups={filterGroups}
                    />
                )}
            </div>
        </main>
    </>
    )
}

export default App
