import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react'; // Import the correct QR code component
import './FolderPage.css'; 

const FolderPage = () => {
  const [folderContents, setFolderContents] = useState([]);
  const [showQR, setShowQR] = useState(false); // To control QR code visibility

  useEffect(() => {
    // Retrieve the eventId from session storage
    const eventId = sessionStorage.getItem('eventId');
    
    // Fetch contents of the folder based on eventId
    const fetchFolderContents = async () => {
      if (eventId) {
        try {
          const response = await axios.get(`http://localhost:5001/api/photos/events`, {
            params: { id: eventId }, // Fetch images by event ID
          });
          setFolderContents(response.data.images); // Set the fetched images
        } catch (error) {
          console.error('Error fetching folder contents:', error);
        }
      }
    };

    fetchFolderContents();
  }, []);

  // Retrieve the eventId from sessionStorage
  const eventId = sessionStorage.getItem('eventId');

  return (
    <div className="folder-page-container">
      <h1>Event Photos</h1>
      {folderContents.length === 0 ? (
        <p>No images found for this event.</p>
      ) : (
        <div className="images-grid">
          {folderContents.map((image, index) => (
            <img key={index} src={image} alt={`Event Image ${index + 1}`} className="folder-image" />
          ))}
        </div>
      )}

      {/* Share Button to show QR code */}
      <div className="share-section">
        <button className="share-button" onClick={() => setShowQR(!showQR)}>
          {showQR ? 'Hide QR Code' : 'Share Event'}
        </button>

        {/* Conditionally show the QR code and download option */}
        {showQR && (
          <div className="qr-section">
            <QRCodeSVG value={eventId} size={256} /> {/* Use QRCodeSVG for the QR code */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderPage;
