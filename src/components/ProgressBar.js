import React, { useEffect, useState } from "react";
import {motion} from 'framer-motion';

const ProgressBar = ({setUploadComplete}) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval;
        
        if (progress < 100) {
            interval = setInterval(() => {
                setProgress(prevProgress => {
                    return prevProgress + 10;
                });
            }, 500);
        }

        // Cleanup function
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            setUploadComplete(true);
        }
    }, [progress, setUploadComplete]);


    return (
        <div>
            <motion.div className="progress-bar"
                initial={{ width: 0 }}
                animate={{ width: progress + '%' }}
            > 
            </motion.div>
            <p>Loading... {progress}%</p>
        </div>
    );
};

export default ProgressBar;