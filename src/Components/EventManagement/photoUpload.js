
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const PhotoUpload = () => {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [previewImages, setPreviewImages] = useState([]); // For previewing selected images
//   const [name, setName] = useState('');
//   const [eventName, setEventName] = useState('');
//   const [folderName, setFolderName] = useState('');
//   const [description, setDescription] = useState('');

//   // Handle image file selection and create previews
//   const handleImageChange = (event) => {
//     if (event.target.files) {
//       const files = Array.from(event.target.files);
//       setSelectedImages(files);

//       // Generate image previews
//       const previews = files.map(file => URL.createObjectURL(file));
//       setPreviewImages(previews);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (selectedImages.length === 0) {
//       toast.error("No images selected");
//       return;
//     }

//     if (!name || !eventName || !folderName) {
//       toast.error("Name, Event Name, and Folder Name are required");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('eventName', eventName);
//       formData.append('folderName', folderName);
//       formData.append('description', description);

//       selectedImages.forEach((image) => {
//         formData.append('images', image);
//       });

//       const response = await axios.post('http://localhost:5001/api/photos/upload-images', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         toast.success("Images uploaded successfully");
//         setPreviewImages([]); // Clear previews after successful upload
//       } else {
//         toast.error("Failed to upload images");
//       }
//     } catch (error) {
//       toast.error("An error occurred while uploading images");
//     }
//   };

//   return (
//     <div className="photo-upload-container">
//       <h1>Create New Event & Upload Photos</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Photographer Name"
//           required
//         />
//         <input
//           type="text"
//           value={eventName}
//           onChange={(e) => setEventName(e.target.value)}
//           placeholder="Event Name"
//           required
//         />
//         <input
//           type="text"
//           value={folderName}
//           onChange={(e) => setFolderName(e.target.value)}
//           placeholder="Unique Folder Name"
//           required
//         />
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//         />
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//         <div className="image-previews">
//           {previewImages.map((src, index) => (
//             <img key={index} src={src} alt={`Preview ${index + 1}`} style={{ width: '100px', margin: '10px' }} />
//           ))}
//         </div>
//         <button type="submit">Upload Images</button>
//       </form>
//     </div>
//   );
// };

// export default PhotoUpload;
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './PhotoUpload.css'; // Ensure your CSS file path is correct

const PhotoUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]); // For previewing selected images
  const [name, setName] = useState('');
  const [eventName, setEventName] = useState('');
  const [folderName, setFolderName] = useState('');
  const [description, setDescription] = useState('');

  const userEmail = sessionStorage.getItem('email'); // Get email from session storage

  // Handle image file selection and create previews
  const handleImageChange = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedImages(files);

      // Generate image previews
      const previews = files.map(file => URL.createObjectURL(file));
      setPreviewImages(previews);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedImages.length === 0) {
      toast.error("No images selected");
      return;
    }

    if (!name || !eventName || !folderName) {
      toast.error("Name, Event Name, and Folder Name are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('eventName', eventName);
      formData.append('folderName', folderName);
      formData.append('description', description);
      formData.append('email', userEmail); // Include email in the request

      selectedImages.forEach((image) => {
        formData.append('images', image);
      });

      const response = await axios.post('http://localhost:5001/api/photos/upload-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success("Images uploaded successfully");
        setPreviewImages([]); // Clear previews after successful upload
      } else {
        toast.error("Failed to upload images");
      }
    } catch (error) {
      toast.error("An error occurred while uploading images");
    }
  };

  return (
    <div className="photo-upload-container">
      <h1>Create New Event & Upload Photos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Photographer Name"
          required
        />
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          required
        />
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Unique Folder Name"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="image-previews">
          {previewImages.map((src, index) => (
            <img key={index} src={src} alt={`Preview ${index + 1}`} style={{ width: '100px', margin: '10px' }} />
          ))}
        </div>
        <button type="submit">Upload Images</button>
      </form>
    </div>
  );
};

export default PhotoUpload;


