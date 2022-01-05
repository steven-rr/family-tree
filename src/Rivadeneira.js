import React from 'react'
import RivadeneiraCSS from './Rivadeneira.module.css'
import Male from './components/Male'

import Female from './components/Female'

const Rivadeneira = () => {
    return (
        <div>
            {/* initial  */}
            <div>
                Rivadeneira Family Tree
            </div>
            {/* <div className={RivadeneiraCSS.rowClass}> */}

            <div className={RivadeneiraCSS.center}>
                <Male
                    id={0}
                />
            </div>
            
            {/* </div> */}
            
        </div>
    )
}

export default Rivadeneira
