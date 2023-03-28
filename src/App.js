import React, {useState} from 'react';
import ImageGrid from './components/ImageGrid';
import Title from './components/Title';
import UploadForm from './components/UploadForm';
import Modal from './components/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import updateDocument from './firebase/updateDocument';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [tagFilter, setTagFilter] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const animatedComponents = makeAnimated();
  const Tags = [
    { label: "Brunch", value: "Brunch" },
    { label: "Lunch/Dinner", value: "Lunch/Dinner" },
    { label: "Cafe", value: "Cafe" },
    { label: "Dessert", value: "Dessert"}
  ];


  const addTag =(option) =>{
    let tag = option.map(t=>t.value)
    setTagFilter(tag);
  }

  const handleUpdate = async(formDetail) =>{
    try{
      await updateDocument('images', selectedImg.id, formDetail);
      setSelectedImg(prevState => ({
        ...prevState,
        ...formDetail
      }));
      setSelectedDetail(prevState => ({
        ...prevState,
        ...formDetail
      }));
      setShowForm(false);
      setSelectedImg(null);
      setSelectedDetail(null);
      setIsEdit(false);

    } catch(error){
      alert(error);
      console.log(error)
    }
  }
  
  return (
    <div className="App">
      <Title/>
      {!isEdit && <label className='file' onClick={() => setShowForm(!showForm)}>
        {showForm ? '-' : '+'} 
      </label>}
      {(showForm || isEdit) && <UploadForm showForm ={showForm} setShowForm={setShowForm} selectedDetail={selectedDetail} setSelectedImg={setSelectedImg} isEdit={isEdit} setIsEdit={setIsEdit} handleUpdate={handleUpdate} Tags={Tags}/>}
      {!showForm && !isEdit && 
      <div>
        <Select options={Tags} components={animatedComponents} placeholder="Select one or multiple tags" onChange={addTag} isMulti />
        <br />
        <ImageGrid setSelectedImg={setSelectedImg} setSelectedDetail={setSelectedDetail} tagFilter={tagFilter} setIsEdit={setIsEdit}/>
       </div>
       }
      {selectedImg && !isEdit && < Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} selectedDetail={selectedDetail} />}
    </div>
  );
}

export default App;
