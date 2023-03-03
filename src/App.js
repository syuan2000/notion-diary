import React, {useState} from 'react';
import ImageGrid from './components/ImageGrid';
import Title from './components/Title';
import UploadForm from './components/UploadForm';
import Modal from './components/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [tagFilter, setTagFilter] = useState([]);

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
  
  return (
    <div className="App">
      <Title/>
      <label className='file' onClick={() => setShowForm(!showForm)}>
        {showForm ? '-' : '+'} 
      </label>
      {showForm && <UploadForm showForm ={showForm} />}
      {!showForm &&
      <div>
        <hr />
        <Select options={Tags} components={animatedComponents} placeholder="Select one or multiple tags" onChange={addTag} isMulti />
        <br />
        <ImageGrid setSelectedImg={setSelectedImg} setSelectedDetail={setSelectedDetail} tagFilter={tagFilter}/>
       </div>
       }
      {selectedImg && < Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} selectedDetail={selectedDetail}/>}
    </div>
  );
}

export default App;
