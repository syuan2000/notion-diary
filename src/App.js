import React, {useState} from 'react';
import ImageGrid from './components/ImageGrid';
import Title from './components/Title';
import UploadForm from './components/UploadForm';
import Modal from './components/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  return (
    <div className="App">
      <Title/>
      <UploadForm />
      <ImageGrid setSelectedImg={setSelectedImg} setSelectedDetail={setSelectedDetail} />
      {selectedImg && < Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} selectedDetail={selectedDetail}/>}
    </div>
  );
}

export default App;
