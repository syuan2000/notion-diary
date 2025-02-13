import React, { useState, useEffect, useMemo } from 'react'
import useFirestore from '../hooks/useFirestore';
import {motion} from 'framer-motion';
import {Typography} from '@mui/material';
import moment from 'moment';
import Option from './Option';
import styled from 'styled-components';

const GridContainer = styled.div`
  margin: 80px auto 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Default 3 columns
  gap: 24px;
  padding: 0 24px;
  max-width: 1600px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 16px;
    margin: 70px auto 20px;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  
  &::before {
    content: "";
    display: block;
    padding-top: 75%; // 4:3 aspect ratio
  }
`;

const StyledImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.3s ease;

  h3 {
    font-size: 16px;
    margin: 0 0 8px 0;
    font-weight: 500;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  span {
    font-size: 14px;
    opacity: 0.8;
    
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const ImageGrid =({ setSelectedImg, setSelectedDetail, tagFilter, setIsEdit}) => {

    const {doc} = useFirestore('images');
    const [hoverIndex, setHoverIndex] = useState(null);
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        setImageList(doc);
    }, [doc]);

    // Function to get filtered list
    const getFilteredList = () => {
        if (!imageList) return [];
        // Avoid filter when selectedCategory is null
        if (tagFilter.length === 0) {
          return imageList;
        }
        return imageList.filter((list) => {
          return tagFilter.every((t) => list.formDetail.tag.includes(t));
        });
      };

    // Avoid duplicate function calls with useMemo
    var filteredList = useMemo(getFilteredList, [tagFilter, imageList]);

    return (
      <GridContainer>
        {filteredList && filteredList.map(d => (
            <ImageWrapper
                key={d.id}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
            >
                <StyledImage 
                    src={d.url} 
                    alt={d.formDetail.title}
                    onMouseEnter={() => setHoverIndex(d.id)}
                    onMouseLeave={() => setHoverIndex(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
                <TextOverlay show={hoverIndex === d.id}>
                    <h3>{d.formDetail.title}</h3>
                    <span>{d.formDetail.date}</span>
                </TextOverlay>
                
                <Option 
                    setSelectedImg={setSelectedImg} 
                    setSelectedDetail={setSelectedDetail} 
                    selectedImg={d} 
                    setIsEdit={setIsEdit} 
                />
            </ImageWrapper>
        ))}
      </GridContainer>
    )
  
}

export default ImageGrid;
