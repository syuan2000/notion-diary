import React from 'react';
import {motion} from 'framer-motion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import styled from 'styled-components';

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  max-width: 1000px;
  width: 95%;
  margin: 0 auto;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);

  @media (max-width: 768px) {
    margin: 20px auto;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 450px;
  overflow: hidden;
  padding: 24px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    height: 300px;
    padding: 16px;
  }
`;

const DetailSection = styled.div`
  padding: 30px;
  background-color: #fbfbfa;
  height: 100%;
  
  h2 {
    font-family: 'Inter', sans-serif;
    font-size: 28px;
    font-weight: 600;
    color: #37352f;
    margin-bottom: 20px;
  }
`;

const DateDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #787774;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 500;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    padding: 12px 0;
    border-bottom: 1px solid rgba(55, 53, 47, 0.09);
    font-size: 16px;
    color: #37352f;
    line-height: 1.5;
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const Modal = ({selectedImg, setSelectedImg, selectedDetail}) => {
    const handleClick = (e) => {
        if (!e.target.classList.contains('img')) {
            setSelectedImg(null);
        }
    }

    return (
        <ModalBackdrop
            onClick={handleClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
        >
            <ModalContent
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Container fluid>
                    <Row>
                        <Col md={8}>
                            <ImageWrapper>
                                <img src={selectedImg.url} alt="enlarged pic" />
                            </ImageWrapper>
                        </Col>
                        <Col md={4}>
                            <DetailSection>
                                <h2>{selectedDetail.title}</h2>
                                <DateDisplay>
                                    <RestaurantMenuIcon sx={{ fontSize: 18 }} />
                                    <span>{selectedDetail.date}</span>
                                </DateDisplay>
                                <CommentList>
                                    {selectedDetail.comment.map((input, index) => (
                                        <li key={index}>{input.comment}</li>
                                    ))}
                                </CommentList>
                            </DetailSection>
                        </Col>
                    </Row>
                </Container>
            </ModalContent>
        </ModalBackdrop>
    )
}

export default Modal;
