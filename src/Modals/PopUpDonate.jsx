import { useState, useEffect } from 'react';
import './popup.css'

function PopUpDonate (props) {
    const [showWidget, setShow] = useState(false);

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

    return (
        <div className={showWidget ? "curtain show" : "curtain"} onClick={deleteWidget}>
            <div 
                id="popup-donate" 
                className={!showWidget ? "disabled" : ""}
                onClick={e => e.stopPropagation()}
                >
                <div className="title">A cup of tea for the programmer =)</div>

                <div id="my-requisites">
                    <div className="card">
                        <div className="qr"><img src="/dogecoin.png" alt="" /></div>
                        <svg className="icon"><use xlinkHref="#ico-dogecoin"/></svg>
                        <div className="title">DogeCoin</div>
                        <div className="requisite">D6WrHVHPwiP8pYDPdh8Sewpj4SwwdqoZzk</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpDonate;