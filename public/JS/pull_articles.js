// Ensure the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Fetch articles.html
    fetch('articles.html')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to load articles.html');
            }
            return response.text(); // Parse as text
        })
        .then((html) => {
            // Create a temporary DOM parser to access elements in articles.html
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Select all article cards
            const articleCards = doc.querySelectorAll('.review-cards .card');

            // Convert NodeList to Array and sort by `data-date`
            const sortedCards = Array.from(articleCards).sort((a, b) => {
                const dateA = new Date(a.getAttribute('data-date'));
                const dateB = new Date(b.getAttribute('data-date'));
                return dateB - dateA; // Sort by latest date
            });

            // Populate the latest articles section
            const articlesGrid = document.querySelector('.articles-grid');
            articlesGrid.innerHTML = ''; // Clear existing content

            // Append top 6 articles
            sortedCards.slice(0, 6).forEach((card) => {
                const clone = card.cloneNode(true); // Clone the article card

                // Convert upload date to Thai format
                const uploadDateElement = clone.querySelector('.upload-date');
                if (uploadDateElement) {
                    const originalDate = uploadDateElement.textContent.trim().split(" | ")[0]; // Extract date part
                    const formattedThaiDate = formatThaiDate(originalDate);
                    const category = clone.getAttribute('data-category');
                    uploadDateElement.textContent = `${formattedThaiDate} | ${category}`; // Update with Thai date format
                }

                articlesGrid.appendChild(clone); // Append to the grid
            });
        })
        .catch((error) => {
            console.error('Error fetching articles:', error);
        });
});

// Function to convert YYYY-MM-DD to Thai date format
function formatThaiDate(dateString) {
    const monthsThai = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return dateString; // Return original if invalid date

    const day = dateObj.getDate();
    const month = monthsThai[dateObj.getMonth()];
    const year = dateObj.getFullYear() + 543; // Convert to Buddhist year (พ.ศ.)

    return `${day} ${month} ${year}`;
}
