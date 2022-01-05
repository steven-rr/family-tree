import axios from 'axios'
import {React,useEffect, useState, useContext} from 'react'
import FemaleCSS from './Female.module.css'
import Male from './Male'

const Female = ({id}) => {
    const [familyData, setFamilyData] = useState([])
    const [kidData, setKidData] = useState([])
    const [partnerData, setParnerData] = useState([])

    useEffect( async ()=> { 
        await axios 
            .get('family.json')
            .then ( (response) => {
                setFamilyData(response.data);
                if(response.data[id].kidsID)
                {
                    setKidData(response.data[id].kidsID)
                }
                if(response.data[id].partnerID)
                {
                    setParnerData(response.data[id].partnerID)
                }

            })
    },[])

    if(kidData.length != 0 )
    {
        return (
        <div>
            <div className= {FemaleCSS.row}>
                {/* display name. */}
                {familyData.map( (item, key) => {
                    if(item.id == id)
                    {                        
                        return(
                            <div key={key}>
                                <div className=  {FemaleCSS.iconContainer}>
                                    <div className={FemaleCSS.icon}></div>
                                    <div className={FemaleCSS.text}> {item.name} </div>
                                </div>
                            </div>
                        ) 
                    } 
                })}
                {/* display partners */}
                {familyData.map( (item, key) => {
                    console.log("female, partner data ", partnerData)
                    for (var i =0; i < partnerData.length; i++) 
                    {
                        if(item.id == partnerData[i])
                        {   
                            if(item.gender == "male")
                            {
                                return  (
                                <Male 
                                        id={partnerData[i]}
                                        key = {key}
                                />)
                            }
                            else
                            {
                                return  (
                                <Female 
                                    id={partnerData[i]}
                                    key = {key}
                                />)
                            }
                        }
                    }
                    
                })}
            </div>
            {/* put in kids*/}
            <div className={FemaleCSS.row}>
                {(kidData.map((item,key)=>{ 
                    // handle array of kids.
                    if(item.length > 1)
                    {   
                        return( item.map((item2, key2) => {
                        if(familyData[item2].gender == "male") 
                        {
                            return (<Male
                                key={key2}
                                id={item2}
                            />)
                        }
                        else
                        {
                            return (<Female
                                key={key2}
                                id={item2}
                            />)
                        }}
                    )) }
                    // else, handle one kid at a time. 
                    else
                    {                    
                        return (
                            <Male
                                key={key}
                                id={item[0]}
                            />
                        )
                    }
                }))}
            </div>
        </div>)
        
    }
    else
    {
        return (
            <div className= {FemaleCSS.row}>
                {/* display name. */}
                {familyData.map( (item, key) => {
                    if(item.id == id)
                    {                        
                        return(
                            <div key={key}>
                                <div className=  {FemaleCSS.iconContainer}>
                                    <div className={FemaleCSS.icon}></div>
                                    <div className={FemaleCSS.text}> {item.name} </div>
                                </div>
                            </div>
                        ) 
                    } 
                })}
                {/* display partners */}
                {familyData.map( (item, key) => {
                    console.log("female, partner data ", partnerData)
                    for (var i =0; i < partnerData.length; i++) 
                    {
                        if(item.id == partnerData[i])
                        {   
                            if(item.gender == "male")
                            {
                                return  (
                                <Male 
                                        id={partnerData[i]}
                                        key = {key}
                                />)
                            }
                            else
                            {
                                return  (
                                <Female 
                                    id={partnerData[i]}
                                    key = {key}
                                />)
                            }
                        }
                    }
                    
                })}
            </div>)

    }
    
}

export default Female
