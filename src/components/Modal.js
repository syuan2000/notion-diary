import React, {  } from 'react';
import {motion} from 'framer-motion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';


const Modal = ({selectedImg, setSelectedImg, selectedDetail}) => {

    const handleClick =(e) =>{

        if (!e.target.classList.contains('img')){
            setSelectedImg(null);
        }
    }
    return (
      <Container>
        <motion.div className='backdrop' onClick={handleClick}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
        >
        
          <motion.div 
            initial={{ y: "-130vh" }}
            animate={{ y: '0vh' }} >
              <Row>
                <Col xs={2}>
                </Col>
                <Col>
                <div className='wrap'><img src={selectedImg.url} alt="enlarged pic" /></div>
                
                <div style={{textAlign:'center'}} className='rowDisplay'>
                  <h2 >/ {selectedDetail.title} /</h2>
                  <div style={{display: "flex", justifyContent: "center"}}>
                  <RestaurantMenuIcon /><span style={{fontSize:'12px'}}> {selectedDetail.date}</span>

                  </div>
                  
                </div>
              </Col>
            
              <Col>
                <ul className='comment'>
                  {selectedDetail.comment.map((input, index)=>(
                    <li key={index} style={{'margin-bottom':'20px', 'fontSize':'20px'}}>{input.comment}</li>
                  ))}
                </ul>
              </Col>
          </Row>
        </motion.div> 
      </motion.div>
      </Container>

    )

}

export default Modal;
