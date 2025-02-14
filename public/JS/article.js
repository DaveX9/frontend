document.addEventListener("DOMContentLoaded", () => {
    const reviewCardsContainer = document.querySelector(".review-cards");
    const cards = Array.from(reviewCardsContainer.querySelectorAll(".card"));

    function formatThaiDate(dateString) {
        if (!dateString) return ""; // Ensure date is valid

        const thaiMonths = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];

        const [year, month, day] = dateString.split("-").map(Number);
        if (!year || !month || !day) return dateString; // Handle invalid dates

        const thaiYear = year + 543; // Convert to Thai Buddhist Year (พ.ศ.)
        const thaiMonth = thaiMonths[month - 1]; // Get Thai month name
        return `${day} ${thaiMonth} ${thaiYear}`; // Format: 1 ธันวาคม 2568
    }

    // **Step 1: Sort Articles by Date (Descending Order)**
    cards.sort((a, b) => {
        const dateA = new Date(a.getAttribute("data-date"));
        const dateB = new Date(b.getAttribute("data-date"));
        return dateB - dateA; // Sort from newest to oldest
    });

    // **Step 2: Apply Thai Date Format & Reorder Cards**
    reviewCardsContainer.innerHTML = ""; // Clear the existing order
    cards.forEach(card => {
        const dataDate = card.getAttribute("data-date");
        const uploadDateSpan = card.querySelector(".upload-date");

        if (dataDate) {
            const thaiFormattedDate = formatThaiDate(dataDate); // Convert date
            const category = card.getAttribute("data-category") || ""; // Get category
            uploadDateSpan.textContent = `${thaiFormattedDate} | ${category}`; // Update UI
        }

        reviewCardsContainer.appendChild(card); // Append card in sorted order
    });
});
