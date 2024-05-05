import React, { useState } from 'react';
//import { storage } from './firebase'; // Import the storage object

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCdz4FA4u3JE07D3gvjGsBj92pS9pHfY1E",
  authDomain: "interview-1b020.firebaseapp.com",
  projectId: "interview-1b020",
  storageBucket: "interview-1b020.appspot.com",
  messagingSenderId: "646293491486",
  appId: "1:646293491486:web:ec66b40a2c878bddd1830f",
  measurementId: "G-GJFX04JYCS"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) return; // Do not proceed if no file is selected

        const storageRef = storage.ref(); // Get a reference to the root of Firebase Storage
        const fileRef = storageRef.child('images/' + file.name); // Create a reference to the file path in Storage

        const uploadTask = fileRef.put(file); // Upload the file to Firebase Storage

        uploadTask.on('state_changed',
            (snapshot) => {
                // Track the upload progress
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                // Handle errors during the upload
                console.error(error);
            },
            () => {
                // Handle successful completion of the upload
                // For example, you can get the download URL of the uploaded file and use it
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // You can do something with the download URL, such as displaying the image
                });
            }
        );
    };

    return (
        <div>
            {/* File input for selecting an image */}
            <input type="file" onChange={handleChange} />

            {/* Button to trigger the upload */}
            <button onClick={handleUpload}>Upload</button>

            {/* Progress bar to display the upload progress */}
            <progress value={progress} max="100" />
        </div>
    );
};

export default ImageUpload;
