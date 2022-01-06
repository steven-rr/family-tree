import axios from 'axios'
import {React,useEffect, useState, useContext} from 'react'
import Female from './Female'
import MaleCSS from './Male.module.css'




// display a male, and partners attached to that male.
const Male = ({id}) => {
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
            <div className= {MaleCSS.row}>
                {/* display name. */}
                {familyData.map( (item, key) => {
                    if(item.id == id)
                    {                        
                        return(
                            <div key={key}>
                                <div className=  {MaleCSS.iconContainer}>
                                    <div className={MaleCSS.icon}></div>
                                    <div className={MaleCSS.text}> {item.name} </div>
                                </div>
                            </div>
                        ) 
                    } 
                })}
                {/* display partners */}
                {familyData.map( (item, key) => {
                    
                    for (var i =0; i < partnerData.length; i++) 
                    {
                        if(item.id == partnerData[i])
                        {   
                            if(item.gender == "male")
                            {
                                return  (
                                <div>
                                    <Male 
                                            id={partnerData[i]}
                                            key = {key}
                                    />
                                </div>)
                            }
                            else
                            {
                                // add links for male partners. should refine.
                                return  (
                                    <div>
                                        <Female 
                                            id={partnerData[i]}
                                            key = {key}
                                        />
                                        <div className={MaleCSS.links}></div>
                                    </div>
                                )
                                
                            }
                        }
                    }
                    
                })}
            </div>
            {/* put in kids*/}
            <div className={MaleCSS.row}>
                {(kidData.map((item,key)=>{ 
                    // handle array of kids.
                    if(item.length > 1)
                    {   
                        return( 
                                <div>
                                    <div className={MaleCSS.childLinks}></div>
                                    <div className={MaleCSS.childrenContainer}>
                                    {
                                        item.map((item2, key2) => {
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
                                        }})
                                    }
                                    </div>
                                </div>
                        )
                    }
                    // else, handle one kid at a time. 
                    else
                    {      
                        if(familyData[item[0]].gender == "male")
                        {
                            return (
                                <Male
                                    key={key}
                                    id={item[0]}
                                />
                            )
                        }    
                        else
                        {
                            return(
                                <Female 
                                    key={key}
                                    id = {item[0]}
                                />
                            )
                        }      
                        
                    }
                }))}
            </div>
        </div>
    )}
    else
    {
        return (
            <div className= {MaleCSS.row}>
                {/* display name. */}
                {familyData.map( (item, key) => {
                    if(item.id == id)
                    {                        
                        return(
                            <div key={key}>
                                <div className=  {MaleCSS.iconContainer}>
                                    <div className={MaleCSS.icon}></div>
                                    <div className={MaleCSS.text}> {item.name} </div>
                                </div>
                            </div>
                        ) 
                    } 
                })}
                {/* display partners */}
                {familyData.map( (item, key) => {
                    
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

export default Male
