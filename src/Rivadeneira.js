import React from 'react'
import RivadeneiraCSS from './Rivadeneira.module.css'
const Rivadeneira = () => {
    return (
        <div>
            <div className={RivadeneiraCSS.rowClass}>
                <div className={RivadeneiraCSS.button}>
                    Teotista Caceres
                </div>
                <div className={RivadeneiraCSS.button}> 
                    Victor Rivadeneira Dominguez 
                </div>
                <div className={RivadeneiraCSS.button}>
                    Mercedes Osorio
                </div>
            </div>
        </div>
    )
}

export default Rivadeneira
