import { useState, useEffect } from 'react'

// SCRIPTS
import {getAllGroups} from './scripts/storage.js'

// WIDGETS
import SvgSprite from './Sprite/SVGSprite.jsx'
import Menu from './Menu/Menu.jsx'
import Filter from './Filter/Filter.jsx'
import Group from './Group/Group.jsx'

import './css-global/frame.css'

const s = {
    id: "t-202405051245-0001",
    title: "Готовимся к собеседованию по Rust: 4 самых частых вопросов. Часть 1",
    url: "https://habr.com/ru/companies/otus/articles/809865/",
    icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
    date: "2024-05-05T12:45",
    domain: "habr.com",
    description: "",
}

const test = {
    id: "current",
    name: "Current",
    date: "2024-06-12 12:45:35",
    tabs: [s],
}


function App() {
    const [currentTabs, setCurrentTabs] = useState([])
    const [groups, setGroups] = useState([])
    const [points, setPoints] = useState([])

    
    async function updateGroups () {
        try {
            const result = await getAllGroups();
            setGroups(result);
        } catch (error) {
            console.error('Ошибка при получении групп:', error);
        }
    }
  

    useEffect(() => {
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
            <Filter />
            <div className="groups">
            {
                <Group 
                    key={"current"}
                    group={{
                        id: "current",
                        name: "Current",
                        date: "",
                        tabs: currentTabs,
                    }}
                    isCurrent={true}
                    updateGroups={updateGroups} 
                />
            }
          
            {
                groups.map( group =>
                    <Group 
                        key={group.id}
                        group={group}
                        name={group.name}
                        updateGroups={updateGroups} 
                    />
                )
            }
            </div>
        </main>
    </>
    )
}

export default App
