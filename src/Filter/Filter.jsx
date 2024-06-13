import { useState } from 'react'
import './filter.css'

function Filter () {
    
    const presets = [
        "title + description",
        "title",
        "description",
        "tag",
        "domain",
        "url",
    ]

    const [preset, setPreset] = useState(0)
    const [isModeFilter, setModeFilter] = useState(false)

    return (
        <div className="filter-panel">
            <button id="back-filtration">
                <svg className="icon"><use xlinkHref="#ico-back"/></svg>
            </button>
            <input type="text" id="text-input" placeholder="filter, filter, filter" />
            <button id="open-all-tags">
                <svg className="icon"><use xlinkHref="#ico-tags"/></svg>
            </button>

            <div className="presets">
                <span>Search in</span>
                {/* <button dataPreset="td" className="active">title + description</button>
                <button dataPreset="title">title</button>
                <button dataPreset="descr">description</button>
                <button dataPreset="tag">tag</button>
                <button dataPreset="domain">domain</button>
                <button dataPreset="url">url</button> */}

                {
                    presets.map( (item, index) =>
                        <button 
                            className= { index === preset ? "active" : ""}
                            key={`preset-${index}`}
                            onClick={e => setPreset(index)}
                            >{item}
                        </button>
                    )
                }

            </div>
        </div>
    )
}

export default Filter
