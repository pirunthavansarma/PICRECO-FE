

// import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Webcam from 'react-webcam';
// import axios from 'axios';

// const FaceRecognition = () => {
//   const webcamRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [objectId, setObjectId] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const navigate = useNavigate(); // Use navigate for routing

//   // API configuration details
//   const API_KEY = '955cd39064mshfd00c6245175eb6p1aa93ejsn48c9d60fa093'; 
//   const API_HOST = 'faceanalyzer-ai.p.rapidapi.com';
//   const API_URL = 'https://faceanalyzer-ai.p.rapidapi.com/compare-faces';

//   // Function to capture the image from the webcam
//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImageSrc(imageSrc);
//     localStorage.setItem('capturedImage', imageSrc);
//   };

//   const clearCapture = () => {
//     setImageSrc(null);
//     localStorage.removeItem('capturedImage');
//   };

//   const handleObjectIdChange = (event) => {
//     setObjectId(event.target.value);
//   };

//   const searchForSimilarFaces = async () => {
//     if (!localStorage.getItem('capturedImage') || !objectId) {
//       alert('Please capture an image and enter the ObjectId.');
//       return;
//     }

//     setUploading(true);

//     const imageSrc = localStorage.getItem('capturedImage');
//     const blob = await fetch(imageSrc).then(res => res.blob());

//     try {
//       const photoUrls = await fetchImageUrlsFromObjectId(objectId);

//       for (let i = 0; i < photoUrls.length; i++) {
//         const photoUrl = photoUrls[i];
//         const data = new FormData();
//         data.append('source_image_url', photoUrl);
//         data.append('target_image', blob, 'photo.jpg');

//         const options = {
//           method: 'POST',
//           url: API_URL,
//           headers: {
//             'x-rapidapi-key': API_KEY,
//             'x-rapidapi-host': API_HOST,
//           },
//           data: data,
//         };

//         const response = await axios.request(options);
//         console.log('Comparison Result:', response.data);

//         // Check if there are any matched faces
//         if (response.data.body.matchedFaces.length > 0) {
//           const matchedFaceUrl = response.data.body.matchedFaces[0].url; // Assuming the API returns a URL in the matchedFaces array
//           navigate('/client-photo-view', { state: { matchedPhotoUrl: matchedFaceUrl } }); // Navigate to ClientPhotoView page with the matched photo URL
//           return;
//         }

//         // Introduce a small delay between requests to prevent hitting the rate limit
//         await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
//       }

//       // If no matches were found after checking all URLs
//       alert('No matching photo found.');
//     } catch (error) {
//       if (error.response && error.response.status === 429) {
//         alert('Too many requests. Please try again later.');
//       } else {
//         console.error('Error during face comparison:', error);
//         alert('An error occurred during face comparison.');
//       }
//     } finally {
//       setUploading(false);
//     }
//   };

//   const fetchImageUrlsFromObjectId = async (objectId) => {
//     try {
//       const response = await axios.get(`http://localhost:5001/api/photos/events`, {
//         params: { id: objectId },
//       });
//       return response.data.images || [];
//     } catch (error) {
//       console.error('Error fetching image URLs:', error);
//       return [];
//     }
//   };

//   return (
//     <div>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//       />
//       {!imageSrc && (
//         <button onClick={capture}>Capture Photo</button>
//       )}

//       {imageSrc && (
//         <div>
//           <h3>Captured Image:</h3>
//           <img src={imageSrc} alt="Captured" />
//           <button onClick={clearCapture}>Remove Image</button>
//         </div>
//       )}

//       {imageSrc && (
//         <div>
//           <input
//             type="text"
//             placeholder="Enter ObjectId"
//             value={objectId}
//             onChange={handleObjectIdChange}
//           />
//           <button onClick={searchForSimilarFaces} disabled={uploading}>
//             {uploading ? 'Searching...' : 'Search for Matching Faces'}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FaceRecognition;

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';

const FaceRecognition = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [objectId, setObjectId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [matchedUrls, setMatchedUrls] = useState([]); // Save matched URLs
  const navigate = useNavigate(); 

  // const API_KEY = 'b4519734a7msh8bd9249ceed8ca3p14fdbfjsnd0926cc9f5a5'; 
  // const API_URL = 'https://faceanalyzer-ai.p.rapidapi.com/compare-faces';
  // const API_HOST = 'faceanalyzer-ai.p.rapidapi.com';

  const API_KEY = 'c0dad4acbcmshab04cbb39606fd6p1ebe1ejsn05362290914a';
  const API_URL = 'https://faceanalyzer-ai.p.rapidapi.com/compare-faces';
  const API_HOST = 'faceanalyzer-ai.p.rapidapi.com';
  

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    localStorage.setItem('capturedImage', imageSrc);
  };

  const clearCapture = () => {
    setImageSrc(null);
    localStorage.removeItem('capturedImage');
  };

  const handleObjectIdChange = (event) => {
    setObjectId(event.target.value);
  };

  const searchForSimilarFaces = async () => {
    if (!localStorage.getItem('capturedImage') || !objectId) {
      alert('Please capture an image and enter the ObjectId.');
      return;
    }

    setUploading(true);
    const imageSrc = localStorage.getItem('capturedImage');
    const blob = await fetch(imageSrc).then(res => res.blob());

    try {
      const photoUrls = await fetchImageUrlsFromObjectId(objectId);
      const matchedFacesUrls = [];

      for (let i = 0; i < photoUrls.length; i++) {
        const photoUrl = photoUrls[i];
        const data = new FormData();
        data.append('source_image_url', photoUrl);
        data.append('target_image', blob, 'photo.jpg');

        const options = {
          method: 'POST',
          url: API_URL,
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
          },
          data: data,
        };

        try {
          const response = await axios.request(options);
          console.log('Comparison Result:', response.data);

          if (response.data.body && response.data.body.matchedFaces.length > 0) {
            matchedFacesUrls.push(photoUrl); // If a match is found, add it to the list
          }

          await new Promise(resolve => setTimeout(resolve, 1000)); 
        } catch (error) {
          console.error('Error:', error.message);
        }
      }

      if (matchedFacesUrls.length > 0) {
        setMatchedUrls(matchedFacesUrls); // Save matched URLs to state
      } else {
        alert('No matching photo found.');
      }
    } catch (error) {
      console.error('Error during face comparison:', error);
      alert('An error occurred during face comparison.');
    } finally {
      setUploading(false);
    }
  };

  const fetchImageUrlsFromObjectId = async (objectId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/photos/events`, {
        params: { id: objectId },
      });
      return response.data.images || [];
    } catch (error) {
      console.error('Error fetching image URLs:', error);
      return [];
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      {!imageSrc && (
        <button onClick={capture}>Capture Photo</button>
      )}

      {imageSrc && (
        <div>
          <h3>Captured Image:</h3>
          <img src={imageSrc} alt="Captured" />
          <button onClick={clearCapture}>Remove Image</button>
        </div>
      )}

      {imageSrc && (
        <div>
          <input
            type="text"
            placeholder="Enter ObjectId"
            value={objectId}
            onChange={handleObjectIdChange}
          />
          <button onClick={searchForSimilarFaces} disabled={uploading}>
            {uploading ? 'Searching...' : 'Search for Matching Faces'}
          </button>
        </div>
      )}

      {/* Display matched URLs */}
      {matchedUrls.length > 0 && (
        <div>
          <h3>Matched Photos:</h3>
          {matchedUrls.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Matched ${index}`} style={{ width: '200px', height: '200px' }} />
              <p>{url}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
