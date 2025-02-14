document.addEventListener("DOMContentLoaded", () => {
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const reviewContainer = document.querySelector(".review-cards"); // Main container
  const reviewCards = document.querySelectorAll(".review-cards .card");

  // Convert NodeList to Array and sort by data-date in descending order
  const sortedCards = Array.from(reviewCards).sort((a, b) => {
    const dateA = new Date(a.getAttribute("data-date"));
    const dateB = new Date(b.getAttribute("data-date"));
    return dateB - dateA; // Sort descending
  });

  // Clear existing cards and append sorted ones
  reviewContainer.innerHTML = "";
  sortedCards.forEach((card) => {
    const dateString = card.getAttribute("data-date");
    if (dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = thaiMonths[date.getMonth()];
      const year = date.getFullYear() + 543; // Thai Buddhist calendar
      const uploadDateElement = card.querySelector(".upload-date");
      uploadDateElement.textContent = `${day} ${month} ${year}`;
    }
    reviewContainer.appendChild(card);
  });
});
