import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ClientPhotoView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [matchedPhotoUrl, setMatchedPhotoUrl] = useState(null);

  useEffect(() => {
    // Check if matchedPhotoUrl is passed through location state
    if (location.state && location.state.matchedPhotoUrl) {
      console.log('Received matchedPhotoUrl from location state:', location.state.matchedPhotoUrl); // Log the URL
      setMatchedPhotoUrl(location.state.matchedPhotoUrl);
      // Store the URL in local storage to persist through refresh
      localStorage.setItem('matchedPhotoUrl', location.state.matchedPhotoUrl);
    } else {
      // Try to retrieve the photo URL from local storage
      const storedUrl = localStorage.getItem('matchedPhotoUrl');
      if (storedUrl) {
        console.log('Retrieved matchedPhotoUrl from local storage:', storedUrl); // Log the URL
        setMatchedPhotoUrl(storedUrl);
      } else {
        // If no URL found, navigate back to the previous page or home
        alert('No matched photo to display. Returning to the main page.');
        navigate('/'); // Change the path to your main page
      }
    }
  }, [location.state, navigate]);

  const downloadPhoto = () => {
    const link = document.createElement('a');
    link.href = matchedPhotoUrl;
    link.download = 'matched_photo.jpg'; // Set the file name for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>Matched Photo</h2>
      {matchedPhotoUrl ? (
        <div>
          <img src={matchedPhotoUrl} alt="Matched" style={{ maxWidth: '100%' }} />
          <button onClick={downloadPhoto}>Download Photo</button>
        </div>
      ) : (
        <p>No photo to display.</p>
      )}
    </div>
  );
};

export default ClientPhotoView;
