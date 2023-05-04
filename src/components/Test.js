import React, {useState, useEffect} from 'react';
import Button from './Button';
import useFirestore from '../hooks/useFirestore';

const Test =() =>{
    const {doc} = useFirestore('images');

    useEffect(() => {
        setImageList(doc);
    }, [doc]);
    const [imageList, setImageList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () =>{
        if (activeIndex!==imageList.length-1){
            setActiveIndex(prev=>prev+1)
        }else{
            setActiveIndex(0)
        }
    }
    const prevSlide = () =>{
        if (activeIndex!==0){
            setActiveIndex(prev=>prev-1)
        }else{
            setActiveIndex(imageList.length-1)
        }
    }

    const moveDot = (index) =>{
        setActiveIndex(index);
    }

    return(
        <div>
            <div className="imageWrap">

            {imageList && imageList.map((l,index)=>{
                return(
                <div key={index} className={index===activeIndex? "sliderImage active": "sliderImage"}>
                    <img src={l.url} alt="" style={{width:"100%"}}/>
                    </div>
                )
            })}
            <Button slide={nextSlide} direction="next"/>
            <Button slide={prevSlide} direction="prev"/> 
            <div className="sliderDot">
                {Array.from({length:imageList.length}).map((item, index)=>(
                    <div onClick={()=>moveDot(index)} className={index===activeIndex? "dot active" : "dot"} key={index}></div>
                ))}
            </div>
            </div>
            

        </div>
    )

}

export default Test;