import React, {useState, useEffect} from 'react'
import { DayPicker}  from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import ProgressBar from './ProgressBar';

const UploadForm = () =>{

    const formInitialDetails={
        title:"",
        date:"",
        comment:""
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
            setFormDetail(formInitialDetails);
        }
    }, [showForm])

    return(
        <>
            <label className='file' onClick={() => setShowForm(!showForm)}>
                {showForm ? '-' : '+'} 
            </label>
            {showForm && 
            <form>
                <input className='inputText' type="text" placeholder='Title' value={formDetail.title} onChange={(e)=> onFormUpdate('title', e.target.value)} required="required"/>
                <br />

                <input className='inputText' type="text" placeholder='Comment' value={formDetail.comment} onChange={(e)=> onFormUpdate('comment', e.target.value)} required="required"/>
                <DayPicker className='inputDate' mode="single"
                    selected={selectedDay}
                    onSelect={setSelectedDay}
                    footer={footer}  />
                <br />
                <p>Upload Image File</p>
                <label className='file'>
                    <input type="file" onChange={changeHandler}></input>
                    <span>+</span>
                </label>    
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