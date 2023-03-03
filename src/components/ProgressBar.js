import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
import {motion} from 'framer-motion';


const ProgressBar = ({file, setFile, formDetail}) =>{

    const {url, progress} = useStorage(file, formDetail);

    // when the url is generated, means the file finished uploading
    // we would want to stop showing the progress bar
    useEffect(()=>{
        if (url){
            setFile(null);
        }
    },[url, setFile])


    return(
        <div>
        <motion.div className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: progress + '%' }}
            > 
            </motion.div>
        <p>Loading... {progress}%</p>
        </div>
    )
}

export default ProgressBar;