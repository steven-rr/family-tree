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


    const loopThroughKids = async(item, key) => {
        if(item.length > 1)
        {
            for(var i =0; i< item.length; i ++)
            {
                console.log("1: ",i, item[i], item)
                return await (
                    <Male
                        key={key}
                        id={item[i]}
                    />
                )
            }
        }
        else
        {                    
            console.log("2: ", item)
            return await(
                <Male
                    key={key}
                    id={item[0]}
                />
            )
        }
    }
    const labelKids = async () =>  {
        return Promise.all(kidData.map((item,key)=>{
            loopThroughKids(item, key)
        }))}
    const loopThruPartners = async(item, key) => {
        for(const element of partnerData) 
        {
            if(item.id == element)
            {   
                if(item.gender == "male")
                {
                    return await (
                    <Male 
                        id={item.id}
                        key = {key}
                    />)
                }
                else
                {
                    return await(
                    <Female 
                        id={item.id}
                        key = {key}
                    />)
                }
            }
        }
    } 

    const labelPartners = async () => {
        return Promise.all(familyData.map( (item, key) => {
            loopThruPartners(item, key)
        }))} 

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
            <div className={MaleCSS.row}>
                {(kidData.map((item,key)=>{ 
                    // handle array of kids.
                    if(item.length > 1)
                    {   
                        return( item.map((item2, key2) => (
                        <Male
                            key={key2}
                            id={item2}
                        />
                    ))) }
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
