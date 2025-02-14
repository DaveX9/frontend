document.addEventListener("DOMContentLoaded", () => {
    // Sample Video Data with YouTube IDs
    const videos = [
      {
        title: "ต.ตรวจบ้าน x การตลาดวันละตอน EP.1",
        youtubeId: "pmCYMxTst7I",
        tags: ["รีวิวบ้าน", "SCASSET"],
      },
      {
        title: "ต.ตรวจบ้าน x การตลาดวันละตอน EP.2 ",
        youtubeId: "oAPAWQvzN6Y",
        tags: ["GrandBangkokBoulevardPinklaoBoroma", "รีวิวบ้าน"],
      },
      {
        title: "ต.ตรวจบ้าน x การตลาดวันละตอน EP.3 ",
        youtubeId: "DRHx_UoICvI",
        tags: ["Investing", "ตตรวจบ้าน"],
      },
      {
        title: "ต.ตรวจบ้าน x การตลาดวันละตอน EP.4",
        youtubeId: "XRcXJtT4O5o",
        tags: ["GrandBangkokBoulevardPinklaoBoroma", "SCASSET","การตลาดวันละหลัง"],
      },
    ];
  
    const videoList = document.getElementById("video-list");
    const tags = document.querySelectorAll(".tag");
  
    // Add event listeners to tags
    tags.forEach((tag) => {
      tag.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedTag = e.target.dataset.tag;
  
        // Filter videos by selected tag
        const filteredVideos = videos.filter((video) =>
          video.tags.includes(selectedTag)
        );
  
        // Clear existing videos
        videoList.innerHTML = "";
  
        // Add filtered videos
        if (filteredVideos.length > 0) {
          filteredVideos.forEach((video) => {
            const videoCard = `
              <div class="video-card">
                <iframe 
                  src="https://www.youtube.com/embed/${video.youtubeId}" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
                </iframe>
                <h3>${video.title}</h3>
              </div>
            `;
            videoList.innerHTML += videoCard;
          });
        } else {
          videoList.innerHTML = "<p>No videos available for this tag.</p>";
        }
      });
    });
  });