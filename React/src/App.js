import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUpload from './components/ImageUpload';
import './customStyles.css'

const App = () => {
  
  return (
    <div>
      <ToastContainer />
      <ImageUpload />
    </div>
  );

};

export default App;