import React, {useState, useEffect, useMemo} from 'react'
import { DayPicker}  from 'react-day-picker';
import { format } from 'date-fns';
import {motion} from 'framer-motion';
import 'react-day-picker/dist/style.css';
import ProgressBar from './ProgressBar';
import { Tooltip , IconButton} from '@mui/material';
import { PostAdd, Delete} from '@mui/icons-material';
import Select from 'react-select';
import { parse } from 'date-fns';
import makeAnimated from 'react-select/animated';
import useStorage from "../hooks/useStorage";
import { CloudUpload } from '@mui/icons-material';
import { Popover } from '@mui/material';
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
    const [uploadComplete, setUploadComplete] = useState(false);
    const type = ['image/png','image/jpeg', 'image/HEIC']

    const isFormValid = useMemo(() => {
        return formDetail.title.trim() !== "" && 
               formDetail.date !== "" && 
               formDetail.tag.length > 0;
    }, [formDetail.title, formDetail.date, formDetail.tag]);

    // leaves the rest of the details intact only change one field
    const onFormUpdate = (category, value) =>{
        setFormDetail(prev => ({
            ...prev,
            [category]: value
        }));
        if (category === 'comment') {
            setInputFields(value);
        }
    }

    // deal with comments
    const [inputFields, setInputFields] = useState([{comment:""}])
    const handleFormChange = (index, e) => {
        const data = [...inputFields];
        data[index]['comment']= e.target.value;
        setInputFields(data);
        onFormUpdate('comment',data)
    }
    const addFields = () => {
        setInputFields(prev => [...prev, {comment:''}])
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
        setSelectedTag(option);
        setFormDetail(prev => ({...prev, tag}));
    }

    // deal with date picker
    const [selectedDay, setSelectedDay] = useState(selectedDetail ? parse(selectedDetail.date, 'PPP', new Date()) : new Date());
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleDateClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDateClose = () => {
        setAnchorEl(null);
    };

    const handleDayChange = (day) => {
        setSelectedDay(day);
        onFormUpdate('date', format(day, 'MM/dd/yyyy'));
        handleDateClose();
    };

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

    // Move useStorage to component level
    const { startUpload, error: uploadError } = useStorage(file, formDetail);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            setError('Please fill in all required fields (title, date, and tags)');
            return;
        }
        
        try {
            await startUpload();
            setFile(null);
            setUploadComplete(false);
            setShowForm(false);
        } catch (err) {
            setError('Failed to upload file: ' + err.message);
        }
    }

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
        handleUpdate(formDetail);
    }

    const handleCancel = () => {
        setShowForm(false);
        setFile(null);
        setInputFields([{comment:""}]);
        setFormDetail(formInitialDetails);
        setSelectedDay(null);
        setSelectedTag([]);
        setUploadComplete(false);
        setError(null);
        setIsEdit(false);
    };

    const formStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '16px'
        },
        form: {
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
        },
        button: {
            padding: '8px 16px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        disabledButton: {
            backgroundColor: '#ccc',
            cursor: 'not-allowed'
        },
        cancelButton: {
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid #000'
        },
        input: {
            width: '100%',
            padding: '12px',
            marginBottom: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
        },
        uploadArea: {
            border: '2px dashed #ddd',
            borderRadius: '4px',
            padding: '32px 16px',
            textAlign: 'center',
            marginBottom: '24px',
            cursor: 'pointer'
        },
        dateInput: {
            width: '100%',
            padding: '12px',
            marginBottom: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
        },
        calendar: {
            padding: '16px',
            width: '320px',
            height: '360px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            margin: '5px 0',
        }
    };

    return(
        <div style={formStyles.overlay}>
            <motion.form
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                style={formStyles.form}
            >
                <div style={formStyles.header}>
                    <h2 style={{ margin: 0 }}>Add New Post</h2>
                    <div>
                        {isEdit ? (
                            <>
                                <button 
                                    onClick={handleFileUpdate}
                                    style={formStyles.button}
                                >
                                    Submit Change(s)
                                </button>
                                <button 
                                    onClick={() => {setIsEdit(false); setSelectedImg(null)}}
                                    style={{...formStyles.button, ...formStyles.cancelButton, marginLeft: '8px'}}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={handleSubmit}
                                    disabled={!file || !uploadComplete || !isFormValid}
                                    style={{
                                        ...formStyles.button,
                                        ...((!file || !uploadComplete || !isFormValid) && formStyles.disabledButton),
                                        marginRight: '8px'
                                    }}
                                >
                                    Post
                                </button>
                                <button 
                                    onClick={handleCancel}
                                    style={{...formStyles.button, ...formStyles.cancelButton}}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <input 
                    type="text" 
                    placeholder='Title *' 
                    value={formDetail.title} 
                    onChange={(e)=> onFormUpdate('title', e.target.value)}
                    style={formStyles.input}
                    required
                />

                <Select 
                    options={Tags} 
                    components={animatedComponents} 
                    placeholder="Select one or multiple tags *" 
                    onChange={addTag} 
                    isMulti 
                    defaultValue={selectedDetail? filterTagsByValue(selectedDetail.tag): null}
                    styles={{
                        control: (base) => ({
                            ...base,
                            border: '1px solid #ddd',
                            boxShadow: 'none',
                            '&:hover': {
                                border: '1px solid #000'
                            },
                            marginBottom: '16px'
                        })
                    }}
                />

                <input
                    type="text"
                    placeholder="MM/DD/YYYY *"
                    value={formDetail.date}
                    onClick={handleDateClick}
                    readOnly
                    style={formStyles.dateInput}
                    required
                />

                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleDateClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    PaperProps={{
                        style: {
                            overflow: 'visible'
                        }
                    }}
                >
                    <div style={formStyles.calendar}>
                        <DayPicker
                            mode="single"
                            selected={selectedDay}
                            onSelect={handleDayChange}
                            modifiers={{ selected: selectedDay }}
                            modifiersStyles={{
                                selected: {
                                    backgroundColor: '#000',
                                    color: '#fff'
                                }
                            }}
                            styles={{
                                root: { width: '100%' },
                                months: { width: '100%' },
                                table: { width: '100%' },
                                day: { 
                                    margin: 0,
                                    width: '25px',
                                    height: '25px',
                                    fontSize: '0.875rem'
                                }
                            }}
                        />
                    </div>
                </Popover>
                {inputFields.map((input, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <input 
                            type="text" 
                            placeholder='Comment' 
                            value={input.comment} 
                            onChange={(e)=> handleFormChange(index, e)}
                            style={{ ...formStyles.input, marginBottom: 0 }}
                        />
                        {index === 0 ? 
                            <Tooltip title="Add more comments">
                                <IconButton onClick={addFields}>
                                    <PostAdd />
                                </IconButton>
                            </Tooltip>
                            :
                            <Tooltip title="Delete comment">
                                <IconButton onClick={() => removeFields(index)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        }
                    </div>
                ))}

                {!isEdit && (
                    <div style={formStyles.uploadArea}>
                        {!file ? (
                            <>
                                <input 
                                    hidden 
                                    id="file-upload" 
                                    type="file" 
                                    onChange={changeHandler}
                                />
                                <label htmlFor="file-upload">
                                    <CloudUpload style={{ fontSize: 40, color: '#666', marginBottom: '8px' }} />
                                    <p style={{ margin: '8px 0 0' }}>Upload your Photo (.png, .jpeg, .HEIC)</p>
                                </label>
                            </>
                        ) : (
                            <div>
                                {uploadComplete && <p>File: {file.name}</p>}
                                {!uploadComplete && <ProgressBar setUploadComplete={setUploadComplete} />}
                            </div>
                        )}
                    </div>
                )}

                <div className='output'>
                    {error && <div style={{ color: 'red', marginTop: '16px' }}>{error}</div>}
                </div>
            </motion.form>
        </div>
    )
}

export default UploadForm;