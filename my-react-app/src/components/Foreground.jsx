import Card from "./Card";
import AddingDocs from "./AddingDocs";
import { useEffect, useState } from "react";

const Foreground = ({Allow , forDrag})=>{
  let savedFiles = localStorage.getItem('Link')  
  savedFiles = JSON.parse(savedFiles);
  console.log("My save data = ", savedFiles)
  
    return <>
   
      {
      Allow ?  <div className="for_main" style={{position:'absolute',display:'flex' , flexWrap:'wrap' , top:'0px' , left:'50px'}}>
       
       {  
     savedFiles ? savedFiles.map((element)=>{
        
         return <Card href={element.data} text={element.text} reference={forDrag}/>
      }) : <></>
         }        
      </div> : 
      <div style={{marginLeft:'800px'}}>
        <AddingDocs/>
      </div>
      }
    </>  
}

export default Foreground;