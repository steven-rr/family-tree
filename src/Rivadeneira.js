import RivadeneiraCSS from './Rivadeneira.module.css'
import Male from './components/Male'
import {React,useEffect, useState, useContext} from 'react'

import Female from './components/Female'

const Rivadeneira = () => {
    useEffect(() => {
        var x = window.innerWidth;
        window.scrollTo(x/2, 0)
      }, [])

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
