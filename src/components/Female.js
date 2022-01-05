import axios from 'axios'
import {React,useEffect, useState, useContext} from 'react'
import FemaleCSS from './Female.module.css'

const Female = ({id}) => {
    const [familyData, setFamilyData] = useState([])


    useEffect( async ()=> { 
        await axios 
            .get('family.json')
            .then ( (response) => {
                console.log(response.data)
                setFamilyData(response.data);
            })
    },[])

    return (
        <div>
            {/* display name. */}
            {familyData.map( item => {
                console.log(id)
                console.log(item.id)
                if(item.id == id)
                {
                    return(
                    <div className=  {FemaleCSS.iconContainer}>
                        <div className={FemaleCSS.icon}></div>
                        <div> {item.name} </div>
                    </div>
                    )
                } 
            })}
            
        </div>
    )
}

export default Female
