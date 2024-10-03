
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './MyEvents.css'; 

// const MyEvent = () => {
//   const [events, setEvents] = useState([]);
//   const userEmail = sessionStorage.getItem('email'); // Get the email from session storage

//   useEffect(() => {
//     // Fetch events for the logged-in user
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/photos/events', {
//           params: { email: userEmail },
//         });
//         setEvents(response.data);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, [userEmail]);

//   return (
//     <div className="my-events-container">
//       <h1>My Events</h1>
//       {events.length === 0 ? (
//         <p>No events found.</p>
//       ) : (
//         <div className="events-grid">
//           {events.map((event) => (
//             <div key={event._id} className="event-card">
//               <h2>{event.eventName}</h2>
//               <p>Photographer: {event.name}</p>
//               <p>Folder: {event.folderName}</p>
//               <p><strong>Event ID:</strong> {event._id}</p> {/* Display the ObjectId */}
//               <div className="event-images">
//                 {event.images.map((image, index) => (
//                   <img key={index} src={image} alt={`Event ${event.eventName} Image ${index + 1}`} />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyEvent;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To handle navigation
import axios from 'axios';
import './MyEvents.css'; 

const MyEvent = () => {
  const [events, setEvents] = useState([]);
  const userEmail = sessionStorage.getItem('email'); // Get the email from session storage
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch events for the logged-in user
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/photos/events', {
          params: { email: userEmail }, // Fetch events by email
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [userEmail]);

  // Handle folder click: save event ID to session storage and navigate to FolderPage
  const handleFolderClick = (eventId) => {
    sessionStorage.setItem('eventId', eventId); // Save the event ID to session storage
    navigate(`/folder/${eventId}`); // Navigate to FolderPage with event ID as route param
  };

  return (
    <div className="my-events-container">
      <h1>My Events</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h2>{event.eventName}</h2>
              <p>Photographer: {event.name}</p>
              <div className="folder-icon" onClick={() => handleFolderClick(event._id)}>
                <img src="/path/to/folder-icon.png" alt="Folder Icon" className="folder-image" />
                <p>{event.folderName}</p>
              </div>
              <p><strong>Event ID:</strong> {event._id}</p> {/* Display the ObjectId */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvent;



