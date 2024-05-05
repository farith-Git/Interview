import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import './customStyles.css'
import { storage } from './firebase'


const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoad, setIsLoad] = useState('');
  const [prevImg, setPrevImg] = useState('');

    const handleChange = (e) => {
        setImageUrl('');
        setPrevImg('')
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type;
            if (!fileType.startsWith('image/')) {
                toast.error('Invalid file type. Please select an image file.');
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setPrevImg(reader.result);
            };
            reader.readAsDataURL(selectedFile);

            setFile(selectedFile);
        }
    };

  const handleUpload = () => {

    toast.dismiss();

    if (!file){
        toast.error('File not uploaded');
        return;
    }

    setImageUrl('');
    setIsLoad(true)
    setProgress(3);

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.error(error);
        toast.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPrevImg('')
            setImageUrl(downloadURL);
            setIsLoad(false)
            setFile('')
            toast.success('Image has been uploaded successfully');
        });
      }
    );
  };

  return (
    <div>

        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="file-upload">
                        <div className="image-upload-wrap">
                            <input className="file-upload-input" type='file' onChange={handleChange} accept="image/*" />
                            <div className="drag-text">
                                { prevImg ?
                                    <h3 style={{paddingBottom:'10px'}}>Drag and drop a file or select add Image</h3> :
                                    <h3>Drag and drop a file or select add Image</h3>
                                }
                            </div>

                            {prevImg && (
                                <div className="mb-4">
                                    <img src={prevImg} className="img-fluid" alt="Uploaded" width="150"/>
                                </div>
                            )}

                        </div>
                        <div className="file-upload-content">
                            <img className="file-upload-image" src="#" alt="your image" />
                            <div className="image-title-wrap">
                                <button type="button" onClick={handleUpload} className="btn btn-danger remove-image">Remove <span className="image-title">Uploaded Image</span></button>
                            </div>
                        </div>

                         <div className="mt-3">
                            
                            { isLoad ?
                                <div className="progress">
                                  <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width:progress+'%'}}></div>
                                </div> :

                                <button className="file-upload-btn mt-3" type="button" onClick={handleUpload}>Add Image</button>
                            }

                        </div>

                    </div>
                </div>


                <div className="col-md-6 offset-md-3">
                    {imageUrl && (
                        <div className="mt-3">
                            <a href={imageUrl} target="_blank">
                                <img src={imageUrl} className="img-fluid" alt="Uploaded"/>
                            </a>
                        </div>
                    )}
                </div>

            </div>
        </div>

    </div>
  );
};

export default ImageUpload;
