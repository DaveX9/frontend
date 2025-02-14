    // Fetch and display albums
            async function fetchAlbums() {
            try {
                const response = await fetch("http://localhost:3000/albums");
                if (!response.ok) {
                throw new Error(`Error fetching albums: ${response.status}`);
                }

                const albums = await response.json();

                const albumsContainer = document.getElementById("albums");
                albumsContainer.innerHTML = ""; // Clear previous content

                albums.forEach((album) => {
                const albumDiv = document.createElement("div");
                albumDiv.style.cursor = "pointer";
                albumDiv.style.margin = "10px";
                albumDiv.style.border = "1px solid #ccc";
                albumDiv.style.padding = "10px";
                albumDiv.style.display = "inline-block";

                const albumTitle = document.createElement("h3");
                albumTitle.textContent = album.name;

                if (album.coverPhotoUrl) {
                    const img = document.createElement("img");
                    img.src = album.coverPhotoUrl;
                    img.style.width = "400px";
                    img.style.height = "300px";
                    img.style.objectFit = "cover";
                    albumDiv.appendChild(img);
                } else {
                    const placeholder = document.createElement("div");
                    placeholder.style.width = "400px";
                    placeholder.style.height = "300px";
                    placeholder.style.background = "#ddd";
                    placeholder.textContent = "No Cover Photo";
                    albumDiv.appendChild(placeholder);
                }

                albumDiv.appendChild(albumTitle);
                albumDiv.addEventListener("click", () => fetchAlbumPhotos(album.id, album.name));
                albumsContainer.appendChild(albumDiv);
                });
            } catch (error) {
                console.error("Error fetching albums:", error.message);
            }
            }


            // Fetch and display photos in an album
            async function fetchAlbumPhotos(albumId, albumName) {
            try {
                const response = await fetch(`http://localhost:3000/albums/${albumId}/photos`);
                if (!response.ok) {
                throw new Error(`Error fetching photos: ${response.status}`);
                }

                const photos = await response.json();
                const photosContainer = document.getElementById("photos");
                photosContainer.innerHTML = `<h2>Photos in Album: ${albumName}</h2>`; // Album title

                photos.data.forEach((photo) => {
                const img = document.createElement("img");
                img.src = photo.images[0].source; // Highest resolution
                img.style.width = "300px";
                img.style.height = "300px";
                img.style.objectFit = "cover";
                img.style.margin = "10px";

                photosContainer.appendChild(img);
                });
            } catch (error) {
                console.error(error.message);
            }
            }

            // Fetch albums on page load
            window.onload = fetchAlbums;