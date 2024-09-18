import React, { useState } from 'react';
import { motion, progress } from 'framer-motion';
import axios from 'axios';
function AddingDocs() {

  const [filevar, setFilevar] = useState(0);
  const [fileUpload, setFileUpload] = useState(false);
  const [file, setFile] = useState('');
  const [progess , setprogress] = useState(0);
  const [succeed , setsucceed] = useState(false);
  const [detailsValue , setdetailsValue] = useState("")
  let [fileArray , setfileArray] = useState(()=>{
       const savedFiles = localStorage.getItem('Link');
      return savedFiles ? JSON.parse(savedFiles) : []
  });
  const handleFileUploadToggle = () => {
    setFileUpload(!fileUpload);
  };

  const detailfunc = (e)=>{
      setdetailsValue(e.target.value)
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const fd = new FormData();
  fd.append('file' , file)

  const uploadfiles = ()=>{
   axios.post('http://httpbin.org/post' , fd , {
    onUploadProgress: (ProgressEvent) => {
      console.log("progress",ProgressEvent.progress*100)
      setprogress(ProgressEvent.progress*100)
      if(ProgressEvent.progress == 1){ 
        setsucceed(true)
        setTimeout(()=>{
               setsucceed(false)
        },3000)
      }
    },
    headers:{
      "Custom-Header" : "value",
    } 
   })
   .then(res=>{  
 
   const savedFiles = localStorage.getItem('Link');
   let filesArray = savedFiles ? JSON.parse(savedFiles) : [];
  console.log(res.data.files.file)
    let myobj = {
      data : res.data.files.file,
      text : detailsValue, 
    }
   filesArray.push(myobj)
   setfileArray(filesArray);
   localStorage.setItem('Link', JSON.stringify(filesArray))
     console.log("new file array",filesArray)

   }).catch( err => {
    console.log(err)
   })
  }

  const btnstyle = {
       backgroundColor : '#AFE1AF',
       color:'white',
       padding:'20px',
       border:'2px solid white',
       fontSize:'16px',
       marginTop:'10px'
  }

  return (
    <>
      <motion.div
        style={{
          position: 'absolute',
          color: 'black',
          width: '600px',
          height: '500px',
          backgroundColor: 'white',
          marginLeft:"-100px"
        }}
        animate={{ translateY: filevar ? 0 : -350 }}
        transition={{ duration: 0.5 }}
      >
       
        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div style={{height:'10px' , marginTop:'0px' , width:`${progess}%` , backgroundColor:'green'}}></div>
          <h2 style={{ textAlign: 'center' }}>UPLOAD FILES</h2>
          <div>
            <textarea
              placeholder="Enter file details"
              cols="30"
              rows="7"
              style={{
                resize: 'none',
                border: 'none',
                backgroundColor: 'lightblue',
                fontSize: '30px',
              }}
              type="text"
              value={detailsValue}
              onChange={detailfunc}
            />
            <div style={{ width: '60px', height: '60px', marginLeft: '250px' }}>
              <svg
                onClick={handleFileUploadToggle}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                style={{
                  fontSize: '5px',
                  marginTop: '5px',
                  marginLeft: '20px',
                  cursor: 'pointer',
                }}
              >
                <path d="M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/>
              </svg>

              {fileUpload && (
                <input
                  type="file"
                  style={{ display: 'block' }}
                  onChange={handleFileChange}
                />
              )}
               {file && <button style={btnstyle} onClick={uploadfiles}><b>Upload</b></button>}
            </div>
          </div>
        </div>

      </motion.div>
    </>
  );
}

export default AddingDocs;
