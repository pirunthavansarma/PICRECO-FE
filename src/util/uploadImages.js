
export const uploadImages = async (images) => {
  const formData = new FormData();

  for (const image of images) {
    formData.append('myimage', image);
  }

  try {
    const response = await fetch("http://localhost:5001/api/upload/uploadimage", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Images uploaded successfully:", data);
      return data.imageUrl; // Assuming the API returns an array of image URLs
    } else {
      console.error("Failed to upload the images.");
      return [];
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};


// export const uploadImages = async (images, eventID) => {
//   const formData = new FormData();

//   for (const image of images) {
//     formData.append('photos', image);
//   }

//   try {
//     const response = await fetch(`http://localhost:5001/api/`, {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       const data = await response.json();
//       return data.imageUrls; // Cloudinary URLs returned from the backend
//     } else {
//       console.error('Failed to upload the images.');
//       return [];
//     }
//   } catch (error) {
//     console.error('Error uploading images:', error);
//     return [];
//   }
// };
