import React from 'react'
import {ArrowLeft, ArrowRight} from '@mui/icons-material';

export default function Button({slide, direction}){
    return(
        
        <button className={direction ==="next"? "sliderBtn next" : "sliderBtn prev"} onClick={slide}>
            {direction === "next"? <ArrowRight /> : <ArrowLeft />}
        </button>
    )
}