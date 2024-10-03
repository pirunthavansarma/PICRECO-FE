import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';
import QrScanner from 'qr-scanner';

const FaceRecognition = () => {
  const webcamRef = useRef(null);
  const videoRef = useRef(null); // For QR scanner video feed
  const [imageSrc, setImageSrc] = useState(null);
  const [objectId, setObjectId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [matchedUrls, setMatchedUrls] = useState([]); // Save matched URLs
  const [error, setError] = useState(''); // Error state for invalid ObjectId
  const [showQRScanner, setShowQRScanner] = useState(false); // New state for QR scanner visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize QR scanner when the videoRef is ready and QR scanning is activated
    if (showQRScanner && videoRef.current) {
      const qrScanner = new QrScanner(videoRef.current, (result) => {
        setObjectId(result); // Automatically set the ObjectId
        setShowQRScanner(false); // Hide the video feed after scanning
        qrScanner.stop(); // Stop the scanner once a QR code is found
      });

      qrScanner.start();
      return () => {
        qrScanner.stop(); // Clean up on unmount or when QR scanning is stopped
      };
    }
  }, [showQRScanner]);

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
    setError(''); // Clear any previous error
  };

  const startQRScanner = () => {
    setShowQRScanner(true); // Show the QR scanner video feed
  };

  // Validation: Check if the ObjectId is a valid MongoDB ObjectId
  const isValidObjectId = (id) => {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(id);
  };

  const searchForSimilarFaces = async () => {
    if (!localStorage.getItem('capturedImage') || !objectId) {
      alert('Please capture an image and enter the ObjectId.');
      return;
    }

    if (!isValidObjectId(objectId)) {
      setError('Invalid ObjectId. Please enter a valid 24-character ObjectId.');
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
          url: 'https://faceanalyzer-ai.p.rapidapi.com/compare-faces',
          headers: {
            'x-rapidapi-key': 'c0dad4acbcmshab04cbb39606fd6p1ebe1ejsn05362290914a',
            'x-rapidapi-host': 'faceanalyzer-ai.p.rapidapi.com',
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
          <button onClick={startQRScanner}>Scan QR Code</button> {/* Button to start QR scanning */}
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if ObjectId is invalid */}
          <button onClick={searchForSimilarFaces} disabled={uploading}>
            {uploading ? 'Searching...' : 'Search for Matching Faces'}
          </button>
        </div>
      )}

      {showQRScanner && (
        <video ref={videoRef} style={{ display: 'block', width: '400px', height: '300px' }} autoPlay playsInline></video>
      )}

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
