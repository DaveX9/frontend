document.addEventListener("DOMContentLoaded", () => {
    // Sample Articles with Multiple Links
    const articles = [
        {
            title: "ต.ตรวจบ้าน - ตรวจสอบก่อนโอน",
            content: "<p>บทความเกี่ยวกับการตรวจบ้านก่อนโอนกรรมสิทธิ์...</p>",
            links: {
                "ตตรวจบ้าน": "/HOMESPECTOR/Homepage/articles_view.html",
                "homeinspector": "/HOMESPECTOR/Homepage/articles_view2.html",
            },
            tags: ["ตตรวจบ้าน", "homeinspector"],
        },
        {
            title: "การต่อเติมบ้านต้องรู้อะไรบ้าง?",
            content: "<p>คำแนะนำเกี่ยวกับการต่อเติมบ้านให้ถูกต้องตามกฎหมาย...</p>",
            links: {
                "ต่อเติมบ้าน": "/HOMESPECTOR/Homepage/articles_view3.html",
            },
            tags: ["ต่อเติมบ้าน"],
        },
        {
            title: "ตรวจคอนโดก่อนรับมอบต้องเช็คอะไร?",
            content: "<p>ข้อควรรู้ก่อนตรวจรับคอนโดใหม่...</p>",
            links: {
                "ตรวจคอนโด": "/HOMESPECTOR/Homepage/articles_view4.html",
            },
            tags: ["ตรวจคอนโด"],
        },
        {
            title: "Home Inspector มีความสำคัญอย่างไร?",
            content: "<p>บทความอธิบายเกี่ยวกับบทบาทของ Home Inspector...</p>",
            links: {
                "homeinspector": "/HOMESPECTOR/Homepage/articles_view5.html",
            },
            tags: ["homeinspector"],
        },
        
    ];

    const articleList = document.getElementById("article-list");
    const tagButtons = document.querySelectorAll(".tag-btn");

    // Add event listeners to tags
    tagButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const selectedTag = e.target.textContent.trim(); // Get text of the clicked button

            // Filter articles based on the selected tag
            const filteredArticles = articles.filter((article) =>
                article.tags.includes(selectedTag)
            );

            // Clear existing articles
            articleList.innerHTML = "";

            // Add filtered articles with multiple links
            if (filteredArticles.length > 0) {
                filteredArticles.forEach((article) => {
                    let linksHTML = "";
                    article.tags.forEach((tag) => {
                        if (article.links[tag]) {
                            linksHTML += `<a href="${article.links[tag]}" class="read-more" target="_blank">${tag}</a> `;
                        }
                    });

                    const articleCard = `
                <div class="article-card">
                    <h2>${article.title}</h2>
                    <div class="article-content">${article.content}</div>
                    ${linksHTML}
                </div>
            `;
                    articleList.innerHTML += articleCard;
                });
            } else {
                articleList.innerHTML = "<p>ไม่มีบทความสำหรับแท็กนี้</p>";
            }

            // Smooth scroll to article section
            articleList.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
});