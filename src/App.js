import React, {useState} from 'react';
import ImageGrid from './components/ImageGrid';
import Title from './components/Title';
import UploadForm from './components/UploadForm';
import Modal from './components/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import updateDocument from './firebase/updateDocument';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Test from './components/Test'
import PageNotFound from './components/PageNotFound';
import Navbar from './components/Navbar'

function App() {

  function Home() {
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
    return(
      <div style={{maxWidth: "960px", margin: "0 auto", padding: "0 16px"}}>
        <div className='title' style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          paddingTop: '70px',
          marginBottom: '24px'
        }}>
          <Title />
          {!isEdit && 
            <button 
              className='add-post-btn' 
              onClick={() => setShowForm(!showForm)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              Add Post
            </button>
          }
        </div>
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
    )
  }
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/gallery"  element={<Test />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
