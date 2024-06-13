import { useState } from 'react';
import PopUpImport from '../Modals/PopUpImport.jsx';
import PopUpDonate from '../Modals/PopUpDonate.jsx';
import PopUpExport from '../Modals/PopUpExport.jsx';
import './menu.css';

function Menu (props) {
    const [isOpenModalImport, setModalImport] = useState(false);
    const [isOpenModalExport, setModalExport] = useState(false);
    const [isOpenModalDonate, setModalDonate] = useState(false);

    const toogleModal = (key) => {

        switch (key) {
            case "import":
                setModalImport(!isOpenModalImport)
                break;
            case "export":
                setModalExport(!isOpenModalExport)
                break;
            case "donate":
                setModalDonate(!isOpenModalDonate)
                break;
            case "close":
                setModalImport(false)
                setModalExport(false)
                setModalDonate(false)
                break;
            default:
                break;
        }
    }

    const moveToGroup = (groupID) => {

    }

    return (<>
        <menu>
            <div className="logo">
                <img src="/tabex-logo.webp" alt="" draggable="false" />
            </div>

            <div className="group-links">
                {/* GROUP LINKS */}

                <button id={`point-for-current`} key={`point-for-current`}>
                    <svg className="icon"><use xlinkHref="#ico-point-current"/></svg>
                    <div className='title'>Current</div>
                    <div className='count'>{props.currentTabs.length}</div>
                </button>

                {
                    props.points.map( elem => 
                        <button 
                            id={`point-for-${elem.id}`} 
                            key={`point-for-${elem.id}`}
                            onClick={e => moveToGroup(elem.id)}
                            >
                            <svg className="icon"><use xlinkHref="#ico-point-group"/></svg>
                            <div className='title'>{elem.name}</div>
                            <div className='count'>{elem.tabs.length}</div>
                        </button>
                    )
                }
            </div>

            <div className="menu-bottom">
                <button
                    id="btn-import"
                    title="import"
                    onClick={e => toogleModal("import")}
                    ><svg className="icon"><use xlinkHref="#ico-import"/></svg>
                </button>
                <button
                    id="btn-donate"
                    title="donate"
                    onClick={e => toogleModal("donate")}
                    ><svg className="icon"><use xlinkHref="#ico-donate"/></svg>
                </button>
                <button
                    id="btn-export"
                    title="export"
                    onClick={e => toogleModal("export")}
                    ><svg className="icon"><use xlinkHref="#ico-export"/></svg>
                </button>
            </div>
        </menu>

        { isOpenModalImport && <PopUpImport close={() => toogleModal("close")} update={props.update} /> }
        { isOpenModalExport && <PopUpExport close={() => toogleModal("close")} /> }
        { isOpenModalDonate && <PopUpDonate close={() => toogleModal("close")} /> }
    </>)
}

export default Menu
