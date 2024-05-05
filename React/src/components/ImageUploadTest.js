import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [isLoad, setIsLoad] = useState(false);

    const handleChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleUpload = async () => {
        setIsLoad(true)
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'e14bti4l'); // Replace 'your_upload_preset' with your Cloudinary upload preset

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dhyn7mqrw/image/upload', // Replace 'your_cloud_name' with your Cloudinary cloud name
                {
                    method: 'POST',
                    body: formData
                }
            );

            const data = await response.json();
            if(response && response.status == 200) {
                setUrl(data.secure_url);
            }

            setIsLoad(false)
            
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
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
                                <h3>Drag and drop a file or select add Image</h3>
                            </div>
                        </div>
                        <div className="file-upload-content">
                            <img className="file-upload-image" src="#" alt="your image" />
                            <div className="image-title-wrap">
                                <button type="button" onClick={handleChange} className="btn btn-danger remove-image">Remove <span className="image-title">Uploaded Image</span></button>
                            </div>
                        </div>
                        { !isLoad ?
                            <button className="file-upload-btn mt-3" type="button" onClick={handleUpload}>Add Image</button> :
                            <button className="file-upload-btn mt-3" type="button" disabled> Processing ...</button>
                        }
                        
                    </div>
                </div>

                <div className="col-md-6 offset-md-3">
                    {url && (
                        <div className="mt-3">
                            <img src={url} className="img-fluid" alt="Uploaded" />
                        </div>
                    )}
                </div>

            </div>
        </div>
           
        </div>
    );
};

export default ImageUpload;