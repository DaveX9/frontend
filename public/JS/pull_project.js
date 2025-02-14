// // Fetch albums and their photos, and show the latest 6 images
// async function fetchLatestPhotosAndRenderProjects() {
//     try {
//       const response = await fetch("http://localhost:3000/albums");
//       if (!response.ok) {
//         throw new Error(`Error fetching albums: ${response.status}`);
//       }

//       const albums = await response.json();
//       const projectsGrid = document.getElementById("project-cards");
//       projectsGrid.innerHTML = ""; // Clear existing cards

//       let allPhotos = [];

//       // Fetch photos from each album
//       for (const album of albums) {
//         const photosResponse = await fetch(`http://localhost:3000/albums/${album.id}/photos`);
//         if (!photosResponse.ok) {
//           throw new Error(`Error fetching photos for album ${album.id}: ${photosResponse.status}`);
//         }

//         const photos = await photosResponse.json();
//         if (photos.data && photos.data.length > 0) {
//           photos.data.forEach(photo => {
//             allPhotos.push({
//               source: photo.images[0].source, // Highest resolution image
//               albumName: album.name,
//               description: album.description || "No description available",
//               uploadTime: new Date(photo.uploadTime || Date.now()), // Ensure we have a Date object
//             });
//           });
//         }
//       }

//       // Sort all photos by upload time (latest first)
//       allPhotos.sort((a, b) => b.uploadTime - a.uploadTime);

//       // Take the latest 6 photos
//       const latestPhotos = allPhotos.slice(0, 9);

//       // Render project cards
//       latestPhotos.forEach((photo, index) => {
//         const projectCard = document.createElement("div");
//         projectCard.className = "project-card";

//         const link = document.createElement("a");
//         link.href = `/project-details/${photo.albumName.replace(/\s+/g, '-').toLowerCase()}.html`; // Dynamic link generation

//         const img = document.createElement("img");
//         img.src = photo.source;
//         img.alt = photo.albumName;
//         link.appendChild(img);

//         const projectInfo = document.createElement("div");
//         projectInfo.className = "project-info";

//         const projectTitle = document.createElement("h3");
//         projectTitle.textContent = `REVIEW ${photo.albumName.toUpperCase()}`;
//         projectInfo.appendChild(projectTitle);

//         const projectDescription = document.createElement("p");
//         projectDescription.textContent = photo.description;
//         projectInfo.appendChild(projectDescription);

//         link.appendChild(projectInfo);
//         projectCard.appendChild(link);
//         projectsGrid.appendChild(projectCard);
//       });
//     } catch (error) {
//       console.error("Error rendering project cards:", error.message);
//     }
//   }

//   // Load the latest photos on page load
//   window.onload = fetchLatestPhotosAndRenderProjects;

async function fetchAlbumsAndRenderProjects() {
  try {
    const response = await fetch("http://localhost:3000/albums");
    if (!response.ok) {
      throw new Error(`Error fetching albums: ${response.status}`);
    }

    const albums = await response.json();
    const projectsGrid = document.getElementById("project-cards");
    projectsGrid.innerHTML = ""; // Clear existing cards

    // Take the first 6 albums
    const firstSixAlbums = albums.slice(0, 6);

    // Render project cards
    firstSixAlbums.forEach((album) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";

      const img = document.createElement("img");
      img.src = album.coverPhotoUrl || "https://via.placeholder.com/250x150?text=No+Image";
      img.alt = album.name;
      img.className = "project-image";

      // Add click event to show the image in a modal
      img.addEventListener("click", () => {
        showModal(img.src, album.name);
      });

      const projectInfo = document.createElement("div");
      projectInfo.className = "project-info";

      const projectTitle = document.createElement("h3");
      projectTitle.textContent = `REVIEW ${album.name.toUpperCase()}`;
      projectTitle.style.fontWeight = "bold";
      projectInfo.appendChild(projectTitle);

      const projectDescription = document.createElement("p");
      projectDescription.textContent = album.description || "";
      projectInfo.appendChild(projectDescription);

      projectCard.appendChild(img);
      projectCard.appendChild(projectInfo);
      projectsGrid.appendChild(projectCard);
    });
  } catch (error) {
    console.error("Error rendering project cards:", error.message);
  }
}

// Function to show the image in a modal
function showModal(imageSrc, altText) {
  // Create modal elements
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.style.position = "relative";

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = altText;
  img.style.maxWidth = "40%";
  img.style.maxHeight = "40%";
  img.style.margin = "auto";
  img.style.display = "block";

  const closeButton = document.createElement("span");
  closeButton.className = "modal-close";
  closeButton.textContent = "✖";

  // Close modal on button click
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  // Append elements to modal
  modalContent.appendChild(closeButton);
  modalContent.appendChild(img);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// Load the albums on page load
window.onload = fetchAlbumsAndRenderProjects;

// Add CSS dynamically
const style = document.createElement("style");
style.textContent = `
  .project-card {
    margin: 10px;
    display: inline-block;
    text-align: center;
  }

  .project-info {
    margin-top: 10px;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    position: relative;
    text-align: center;
  }

  .modal-content img {
    max-width: 40%;
    max-height: 40%;
    border-radius: 5px;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    color: white;
    cursor: pointer;
    z-index: 1001;
    transition: color 0.3s ease;
  }

  .modal-close:hover {
    color: #e40000;
  }

  @media (max-width: 768px) {
    .modal-content img {
      max-width: 90%;
      max-height: 90%;
    }
  }
`;

document.head.appendChild(style);

