import React, {  } from 'react';
import {motion} from 'framer-motion';

const Modal = ({selectedImg, setSelectedImg, selectedDetail}) => {

    const handleClick =(e) =>{

        if (!e.target.classList.contains('img')){
            setSelectedImg(null);
        }
    }
    return (
      
      <motion.div className='backdrop' onClick={handleClick}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
      >
        <motion.div 
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }} >
          <div className='wrap'><img src={selectedImg} alt="enlarged pic" /></div>
          
          <div style={{textAlign:'center'}} className='rowDisplay'>
            <h3 >{selectedDetail.title}</h3>
            <p style={{fontSize:'12px'}}>{selectedDetail.date}</p>
            <p>{selectedDetail.comment}</p>
          </div>
        </motion.div> 
          
      </motion.div>

    )

}

export default Modal;
