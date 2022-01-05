import axios from 'axios'
import {React,useEffect, useState, useContext} from 'react'
import FemaleCSS from './Female.module.css'

const Female = ({id}) => {
    const [familyData, setFamilyData] = useState([])


    useEffect( async ()=> { 
        await axios 
            .get('family.json')
            .then ( (response) => {
                setFamilyData(response.data);
            })
    },[])

    return (
        <div>
            {/* display name. */}
            {familyData.map( (item,key) => {

                if(item.id == id)
                {
                    return(
                    <div className=  {FemaleCSS.iconContainer} key = {key}>
                        <div className={FemaleCSS.icon}></div>
                        <div className={FemaleCSS.text}> {item.name} </div>
                    </div>
                    )
                } 
            })}
            
        </div>
    )
}

export default Female
