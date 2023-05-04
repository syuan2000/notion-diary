import React, {useState, useEffect} from 'react'
import { DayPicker}  from 'react-day-picker';
import { format } from 'date-fns';
import {motion} from 'framer-motion';
import 'react-day-picker/dist/style.css';
import ProgressBar from './ProgressBar';
import { Tooltip , IconButton} from '@mui/material';
import { PostAdd, PhotoCamera, Delete} from '@mui/icons-material';
import Select from 'react-select';
import { parse } from 'date-fns';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const UploadForm = ({showForm, setShowForm, selectedDetail, setSelectedImg, isEdit, setIsEdit, handleUpdate, Tags}) =>{

    function filterTagsByValue(values) {
        const updatedTags = [];
        values.forEach(v => {
          updatedTags.push(...Tags.filter(tag => tag.value === v));
        });
        return updatedTags;
      }

    // so we don't need to create state for each input
    const formInitialDetails={
        title:"",
        date:"",
        tag:[],
        comment: [{ comment: "" }]
    }

    const [formDetail, setFormDetail] = useState(formInitialDetails);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const type = ['image/png','image/jpeg']

    
    // leaves the rest of the details intact only change one field
    const onFormUpdate = (category, value) =>{
        console.log(formDetail)
        setFormDetail({
            ...formDetail,
            [category]: value
        });
        if (category === 'comment') {
            setInputFields(value);
        }
    }

    // deal with comments
    const [inputFields, setInputFields] = useState([{comment:""}])
    const handleFormChange = (index, e) => {
        let data = [...inputFields];
        data[index]['comment']= e.target.value;
        setInputFields(data);
        onFormUpdate('comment',inputFields)
     }
    const addFields = () => {
        let newfield = {comment:''};
        setInputFields([...inputFields, newfield])
    }
    const removeFields= (index)=>{
        let data = [...inputFields];
        data.splice(index,1)
        setInputFields(data)
        onFormUpdate('comment',data)
    }

    // deal with tags
    const [selectedTag, setSelectedTag] = useState([]);
    const addTag = (option) =>{
        const tag = option.map(t => t.value);
        console.log(tag)
        setSelectedTag(option);
        setFormDetail({...formDetail, tag});
    }

    // deal with date picker
    const [selectedDay, setSelectedDay] = useState(selectedDetail ? parse(selectedDetail.date, 'PPP', new Date()) : new Date());
    const handleDayChange = (day) => {
        setSelectedDay(day);
        onFormUpdate('date', format(day, 'PPP'));
      };
      const month = selectedDay ? new Date(selectedDay.getFullYear(), selectedDay.getMonth()) : undefined;
      const footer = selectedDay ? <p>{format(selectedDay, 'PPP')}</p> : <p>Please pick a day.</p>;

    const changeHandler = (e) =>{
        let selected = e.target.files[0];        

        if (selected && type.includes(selected.type)){
            setFile(selected);
            setError(null);

        }else{
            setFile(null);
            setError('Please select an image file(.png or .jpeg)');
        }
    }

    //reset form
    useEffect(()=>{
        if (!showForm || (showForm && !isEdit)){
            setInputFields([{comment:""}]);
            setFormDetail(formInitialDetails);
            setSelectedDay();
            setSelectedTag([]);
        }
    }, [showForm])

    useEffect(()=>{
        if (isEdit){
            setFormDetail(selectedDetail);
            setSelectedDay(parse(selectedDetail.date, 'PPP', new Date()));
            setSelectedTag(selectedDetail.tag);
            setInputFields(selectedDetail.comment);
        }
    }, [isEdit])
    

    const handleFileUpdate=(e)=>{
        e.preventDefault();
        console.log(selectedDetail)
        handleUpdate(formDetail);
    }

    return(
        <>
            <motion.form
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            >
                <input className='inputText' type="text" placeholder='Title' value={formDetail.title} onChange={(e)=> onFormUpdate('title', e.target.value)} required="required"/>
                <br />
                <Select options={Tags} components={animatedComponents} placeholder="Select one or multiple tags" onChange={addTag} isMulti defaultValue={selectedDetail? filterTagsByValue(selectedDetail.tag): null}/>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            
                            <input className='inputText' style={{ width: '45%'}} type="text" placeholder='Comment' value={input.comment} onChange={(e)=> handleFormChange(index, e)} ></input>
                            {index===0 && 
                                <Tooltip title="Add more comments" placement='right' style={{'marginLeft': '10px'}}>
                                    <IconButton  onClick={addFields}>
                                            <PostAdd />
                                    </IconButton> 
                                </Tooltip>
                            }
                            {index>0 && <Tooltip title="Delete comments" placement='right' style={{'marginLeft': '10px'}}>
                                    <IconButton  onClick={() => removeFields(index)}>
                                            <Delete />
                                    </IconButton> 
                                </Tooltip>
                            }
                        </div>
                    )
                })}
                
                <DayPicker className='inputDate' mode="single"
                    selected={selectedDay}
                    onSelect={handleDayChange}
                    footer={footer}  
                    month={month}/>
                <br />
                {isEdit? 
                (<>
                    <button onClick={handleFileUpdate}>Submit Change(s)</button>
                    <button onClick={()=> {setIsEdit(false); setSelectedImg(null)}}>Cancel</button>
                </>)
                :<Tooltip title="Upload image file" placement='right'>
                    <IconButton  aria-label="upload picture" component="label">
                        <input hidden type="file" onChange={changeHandler}></input>
                        <PhotoCamera /> 
                    </IconButton> 
                </Tooltip>
                }
                
                <div className='output'>
                    {error && <div className='error'>{ error }</div>}
                    {file && 
                    <ProgressBar file={file} setFile={setFile} formDetail={formDetail} setShowForm={setShowForm}/>
                }
                </div>
            </motion.form>
        </>
        
    )
}

export default UploadForm;