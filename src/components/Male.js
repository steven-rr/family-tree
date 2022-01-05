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
                console.log(response.data)
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

    if(kidData)
    {
    
        return (
        <div className={MaleCSS.pageContainer}>
            {/* display name. */}
            {familyData.map( (item, key) => {
                if(item.id == id)
                {
                    console.log("kidsID: ", item.kidsID);
                    {/* for each partner, draw the kids and the partner.  */}
                    
                    return(
                        <div className= {MaleCSS.container} key={key}>
                            <div className=  {MaleCSS.iconContainer}>
                                <div className={MaleCSS.icon}></div>
                                <div> {item.name} </div>
                            </div>
                        </div>
                    ) 
                } 
            })}
            {/* put in kids, a bit shifted. */}
            
          <div className={MaleCSS.row}>
            {kidData.map((item,key)=>{
                console.log("item", item)
                return(
                    <Male
                        key={key}
                        id={item}
                    />
                )
            })}
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
                        console.log("kidsID: ", item.kidsID);
                        
                        return(
                            <div className= {MaleCSS.container} key={key}>
                                <div className=  {MaleCSS.iconContainer}>
                                    <div className={MaleCSS.icon}></div>
                                    <div> {item.name} </div>
                                </div>
                            </div>
                        ) 
                    } 
                })}
            </div>)
    }

}

export default Male
