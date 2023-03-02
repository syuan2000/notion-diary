import React, {useState, useEffect} from 'react'
import { DayPicker}  from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import ProgressBar from './ProgressBar';
import { Tooltip , IconButton} from '@mui/material';
import { PostAdd, PhotoCamera, Delete} from '@mui/icons-material';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
const Tags = [
  { label: "Brunch", value: "Brunch" },
  { label: "Lunch/Dinner", value: "Lunch/Dinner" },
  { label: "Cafe", value: "Cafe" },
  { label: "Dessert", value: "Dessert"}
];

const UploadForm = () =>{

    const formInitialDetails={
        title:"",
        date:"",
        comment:[""]
    }

    const [selectedDay, setSelectedDay] = useState();
    const footer = selectedDay ? (
        <p>{format(selectedDay, 'PPP')}</p>
      ) : (
        <p>Please pick a day.</p>
      );

    const [showForm, setShowForm] = useState(false);
    const [formDetail, setFormDetail] = useState(formInitialDetails);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const type = ['image/png','image/jpeg']

    // leaves the rest of the details intact only change one field
    const onFormUpdate = (category, value) =>{
        setFormDetail({
            ...formDetail,
            [category]: value
        })
    }

    const changeHandler = (e) =>{
        let selected = e.target.files[0];
        onFormUpdate('date',selectedDay ? format(selectedDay, 'PPP'): "")
        if (selected && type.includes(selected.type)){
            setFile(selected);
            setError(null);
        }else{
            setFile(null);
            setError('Please select an image file(.png or .jpeg)');
        }
    }

    useEffect(()=>{
        if (!showForm){
            setInputFields([{comment:""}]);
            setFormDetail(formInitialDetails);
            setSelectedDay();
        }
    }, [showForm])

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

    return(
        <>
            <label className='file' onClick={() => setShowForm(!showForm)}>
                {showForm ? '-' : '+'} 
            </label>
            {showForm && 
            <form>
                <input className='inputText' type="text" placeholder='Title' value={formDetail.title} onChange={(e)=> onFormUpdate('title', e.target.value)} required="required"/>
                <br />
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
                                    <IconButton  onClick={removeFields}>
                                            <Delete />
                                    </IconButton> 
                                </Tooltip>
                            }
                        </div>
                    )
                })}
                <Select options={Tags} components={animatedComponents} placeholder="Select one or multiple tags"
                  isMulti />
                <DayPicker className='inputDate' mode="single"
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    footer={footer}  />
                <br />
                <Tooltip title="Upload image file" placement='right'>
                    <IconButton  aria-label="upload picture" component="label">
                        <input hidden type="file" onChange={changeHandler}></input>
                        <PhotoCamera />
                    </IconButton> 
                </Tooltip>
                <div className='output'>
                    {error && <div className='error'>{ error }</div>}
                    {file && 
                    <ProgressBar file={file} setFile={setFile} formDetail={formDetail} setShowForm={setShowForm} />
                }
                </div>
            </form>}
        </>
        
    )
}

export default UploadForm;