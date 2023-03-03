import React, { useState, useEffect, useMemo } from 'react'
import useFirestore from '../hooks/useFirestore';
import {motion} from 'framer-motion';
import {Typography} from '@mui/material';
import moment from 'moment';
import Option from './Option';

const ImageGrid =({ setSelectedImg, setSelectedDetail, tagFilter}) => {

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
      <div className='img-grid'>
        {filteredList && filteredList.map(d => (
            <motion.div className='img-wrap' key={d.id}
            
            //animation part
            whileHover={{opacity:0.9}}
            layout
            >
                <motion.img src={d.url} alt="uploaded image" 
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 2}}
                    onMouseEnter={() => setHoverIndex(d.id)}
                    onMouseLeave={() => setHoverIndex(null)}
                />
                <Typography
                variant='boday2'
                component='span'
                sx={{
                    position:'absolute',
                    bottom:0,
                    left:0,
                    color:'white',
                    background:'rgba(0,0,0,.3)',
                    p:'4px',
                    borderTopRightRaduis:8,
                }}>
                    {d.createdAt && moment(d.createdAt.toDate()).fromNow()}
                </Typography>
                <div className={`text-overlay ${hoverIndex === d.id ? "show" : ""}`} >
                    <h2 >
                        {d.formDetail.title}
                    </h2>
                    <p>{d.formDetail.date}</p>
                </div>
                
                <Option setSelectedImg={setSelectedImg} setSelectedDetail={setSelectedDetail} selectedImg={d}/>
            </motion.div>
            
      ))}
      </div>
    )
  
}

export default ImageGrid;
