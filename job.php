<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Include PHPMailer

$successMessage = ""; // Initialize success message

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $position = htmlspecialchars($_POST["position"]);
    $address = htmlspecialchars($_POST["address"]); // Capture address

    // File upload directory
    $uploadDir = "uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Handle file upload (Resume)
    $resumeLink = "No file uploaded";
    if (isset($_FILES["resume"]) && $_FILES["resume"]["error"] == 0) {
        $fileName = basename($_FILES["resume"]["name"]);
        $uploadFilePath = $uploadDir . time() . "_" . $fileName;
        move_uploaded_file($_FILES["resume"]["tmp_name"], $uploadFilePath);
        $resumeLink = $uploadFilePath;
    }

    // Handle file upload (Cover Letter)
    $coverLetterFile = "No file uploaded";
    if (isset($_FILES["cover_letter_file"]) && $_FILES["cover_letter_file"]["error"] == 0) {
        $fileName = basename($_FILES["cover_letter_file"]["name"]);
        $uploadFilePath = $uploadDir . time() . "_" . $fileName;
        move_uploaded_file($_FILES["cover_letter_file"]["tmp_name"], $uploadFilePath);
        $coverLetterFile = $uploadFilePath;
    }

    // Send Email using PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'sahadevthapawork@gmail.com'; // Replace with your email
        $mail->Password = 'yyry vtil xiko nhaz'; // Replace with your app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email content
        $mail->setFrom('sahadevthapawork@gmail.com', 'Job Application System');
        $mail->addAddress('sahadevthapawork@gmail.com'); // Change to recipient email

        // Attach resume if available
        if ($resumeLink !== "No file uploaded") {
            $mail->addAttachment($resumeLink);
        }
        // Attach cover letter file if available
        if ($coverLetterFile !== "No file uploaded") {
            $mail->addAttachment($coverLetterFile);
        }

        $mail->Subject = "New Job Application - $position";
        $mail->Body = "Application received:\n\n" .
                        "Name: $name\n" .
                        "Email: $email\n" .
                        "Phone: $phone\n" .
                        "Position: $position\n" .
                        "Address: $address\n\n" .
                        "Resume: $resumeLink\n" .
                        "Cover Letter File: $coverLetterFile";

        $mail->send();
        $successMessage = "<p class='success-message'>Application submitted successfully! We have received your application.</p>";
    } catch (Exception $e) {
        $successMessage = "<p class='error-message'>Failed to send application email. Error: {$mail->ErrorInfo}</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
        integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="/HOMESPECTOR/CSS/joinwithus.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css">
    <title>Header Design</title>
</head>
<style>
    .form-container {
        position: relative;
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 50%;
        margin: auto;
        margin-top: 30px;
        margin-bottom: 30px;
        max-width: 600px;
        position: relative;
        z-index: 2;
        background: white;
        border-radius: 10px;
    }
    h2 {
        color:#0e0d0d;
        text-align: center;
        font-weight: bold;
    }
    input, select {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        margin-bottom: 15px;
        border-radius: 15px;
        border: 1px solid #ccc;
    }
    input::placeholder {
        color: #aaa;
    }
    .submit-btn {
        background:#006ac0;
        color: white;
        border: none;
        padding: 12px;
        cursor: pointer;
        border-radius: 15px;
        width: 32%;
        display: block;
        margin: 0 auto;
        text-align: center;
    }

    .submit-btn:hover {
        background:#ff5c05;
    }
    .success-message {
        color: green;
        font-weight: bold;
        margin-top: 30px;
        text-align: center;
    }
    .error-message {
        color: red;
        font-size: 16px;
        margin-top: 30px;
    }

     /* Responsive Design */
    @media (max-width: 768px) {
        .form-container {
            width: 90%;
            padding: 15px;
        }
        input, select {
            font-size: 16px;
            padding: 12px;
        }
        .submit-btn {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            }
        }
    /* For very small devices (phones below 480px) */
    @media (max-width: 480px) {
        .form-container {
            width: 95%;
            padding: 10px;
            }
        h2 {
            font-size: 20px;
            }
        input, select {
            font-size: 14px;
            padding: 10px;
        }
        .submit-btn {
            width: 100%;
            padding: 12px;
            font-size: 14px;
        }
    }
</style>
<body>
    <div class="content-box">
        <div class="content-box">
            <div class="header">
                <header class="top-bar">
                    <div class="container">
                        <!-- Social Icons -->
                        <div class="social-icons">
                            <a href="https://www.facebook.com/t.homeinspector/?locale=th_TH">
                                <img src="/HOMESPECTOR/icon/ICON/Fb.png" alt="Facebook">
                            </a>
                            <a href="https://www.instagram.com/t.homeinspector/">
                                <img src="/HOMESPECTOR/icon/ICON/IG.png" alt="Instagram">
                            </a>
                            <a href="https://page.line.me/t.home?openQrModal=true">
                                <img src="/HOMESPECTOR/icon/ICON/line.png" alt="Line">
                            </a>
                            <a href="tel:082-045-6165">
                                <img src="/HOMESPECTOR/icon/ICON/phone.png" alt="Phone">
                            </a>
                        </div>
                        <!-- Logo -->
                        <div class="logo">
                            <a href="/HOMESPECTOR/Homepage/index.html">
                                <img src="/HOMESPECTOR/img/s1.png" alt="T. Home Inspector Logo">
                            </a>
                        </div>

                        <div class="actions">
                            <!-- Language Switcher -->
                            <div class="language-switcher">
                                <a href="?lang=th" class="lang-link">
                                    <img src="/HOMESPECTOR/icon/ICON/thai.png" alt="Thai" title="ภาษาไทย">
                                </a>
                                <a href="?lang=en" class="lang-link">
                                    <img src="/HOMESPECTOR/icon/ICON/eng.png" alt="English" title="English">
                                </a>
                            </div>

                            <!-- Search Icon -->
                            <i id="search-icon" class="fas fa-search"></i>
                            <div id="search-bar" class="search-bar">
                                <input type="text" placeholder="Search..." />
                                <button onclick="searchFunction()">Search</button>
                            </div>
                            <!-- Hamburger Icon -->
                            <i id="hamburger-icon" class="fas fa-bars hamburger-icon" onclick="toggleMenu()"></i>
                        </div>
                </header>
                <nav class="nav-links" id="nav-links">
                    <ul>
                        <li><a href="/HOMESPECTOR/Homepage/index.html" data-translate="nav.home">หน้าหลัก</a>
                        </li>
                        <li><a href="/HOMESPECTOR/Homepage/service.html" data-translate="nav.services">บริการ</a></li>
                        <li><a href="/HOMESPECTOR/Homepage/promotion.html" data-translate="nav.promotion">สิทธิพิเศษ</a>
                        </li>
                        <li><a href="/HOMESPECTOR/Homepage/projects_media.html" data-translate="nav.projects">ผลงาน</a>
                        </li>

                        <!-- Dropdown Menu -->
                        <li class="dropdown">
                            <a href="#" class="menu-item" data-translate="nav.aboutUs">
                                เกี่ยวกับเรา <span class="dropdown-icon"><i class="fa-solid fa-caret-down"></i></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="/HOMESPECTOR/Homepage/ourstory.html"
                                        data-translate="nav.ourStory">ประวัติของเรา</a>
                                </li>
                                <li><a href="/HOMESPECTOR/Homepage/ourteam.html"
                                        data-translate="nav.ourTeam">ทีมงานของเรา</a></li>
                            </ul>
                        </li>

                        <li><a href="/HOMESPECTOR/Homepage/articles.html" data-translate="nav.articles">บทความ</a></li>
                        <li><a href="/HOMESPECTOR/Homepage/Review-home.html"
                                data-translate="nav.reviewHome">รีวิวบ้าน</a></li>
                        <li><a href="/HOMESPECTOR/Homepage/review_interior.html"
                                data-translate="nav.reviewInterior">รีวิวตกแต่งบ้าน</a></li>
                        <li><a href="/HOMESPECTOR/Homepage/joinwithus.html" data-translate="nav.joinUs">รวมงานกับเรา</a>
                        </li>
                        <li><a href="/HOMESPECTOR/Homepage/contactus.html" data-translate="nav.contact">ติดต่อเรา</a>
                        </li>
                    </ul>
                </nav>
                <!-- Fullscreen Navigation -->
                <div id="fullscreen-menu" class="fullscreen-menu">
                    <!-- Close Icon -->
                    <i id="close-icon" class="fas fa-times"></i>
                    <header class="top-bar">
                        <div class="container">
                            <!-- Social Icons -->
                            <div class="social-icons">
                                <a href="https://www.facebook.com/t.homeinspector/?locale=th_TH">
                                    <img src="/HOMESPECTOR/icon/ICON/Fb.png" alt="Facebook">
                                </a>
                                <a href="https://www.instagram.com/t.homeinspector/">
                                    <img src="/HOMESPECTOR/icon/ICON/IG.png" alt="Instagram">
                                </a>
                                <a href="https://page.line.me/t.home?openQrModal=true">
                                    <img src="/HOMESPECTOR/icon/ICON/line.png" alt="Line">
                                </a>
                                <a href="tel:082-045-6165">
                                    <img src="/HOMESPECTOR/icon/ICON/phone.png" alt="Phone">
                                </a>
                            </div>

                            <!-- Logo -->
                            <div class="logo">
                                <a href="/HOMESPECTOR/Homepage/index.html">
                                    <img src="/HOMESPECTOR/img/s1.png" alt="T. Home Inspector Logo">
                                </a>
                            </div>

                            <!-- Actions -->
                            <div class="actions">
                                <!-- Language Switcher -->
                                <div class="language-switcher">
                                    <a href="?lang=th" class="lang-link">
                                        <img src="/HOMESPECTOR/icon/ICON/thai.png" alt="Thai" title="ภาษาไทย">
                                    </a>
                                    <a href="?lang=en" class="lang-link">
                                        <img src="/HOMESPECTOR/icon/ICON/eng.png" alt="English" title="English">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </header>
                    <!-- Navigation Content -->
                    <div class="menu-content">
                        <!-- Topics Section -->
                        <div class="menu-section">
                            <h3>Navigation</h3>
                            <ul>
                                <li><a href="/HOMESPECTOR/Homepage/index.html" data-translate="nav.home">หน้าหลัก</a>
                                </li>
                                <li><a href="/HOMESPECTOR/Homepage/service.html"
                                        data-translate="nav.services">บริการ</a></li>
                                <li><a href="/HOMESPECTOR/Homepage/promotion.html"
                                        data-translate="nav.promotion">สิทธิพิเศษ</a></li>
                                <li><a href="/HOMESPECTOR/Homepage/projects_media.html"
                                        data-translate="nav.projects">ผลงาน</a></li>

                                <!-- Dropdown Menu -->
                                <li class="dropdown1">
                                    <a href="#" class="menu-item1" data-translate="nav.aboutUs">
                                        เกี่ยวกับเรา <span class="dropdown-icon1"><i
                                                class="fa-solid fa-caret-down"></i></span>
                                    </a>
                                    <ul class="dropdown-menu1">
                                        <li><a href="/HOMESPECTOR/Homepage/ourstory.html"
                                                data-translate="nav.ourStory">ประวัติของเรา</a>
                                        </li>
                                        <li><a href="/HOMESPECTOR/Homepage/ourteam.html"
                                                data-translate="nav.ourTeam">ทีมงานของเรา</a></li>
                                    </ul>
                                </li>

                                <li><a href="/HOMESPECTOR/Homepage/articles.html"
                                        data-translate="nav.articles">บทความ</a></li>
                                <li><a href="/HOMESPECTOR/Homepage/Review-home.html"
                                        data-translate="nav.reviewHome">รีวิวบ้าน</a></li>
                                <li><a href="/HOMESPECTOR/Homepage/review_interior.html"
                                        data-translate="nav.reviewInterior">รีวิวตกแต่งบ้าน</a></li>
                                <li><a href="/HOMESPECTOR/Homepage/joinwithus.html"
                                        data-translate="nav.joinUs">รวมงานกับเรา</a></li>
                                <li><a href="/HOMESPECTOR/Homepage/contactus.html"
                                        data-translate="nav.contact">ติดต่อเรา</a></li>
                            </ul>
                        </div>

                        <!-- Series & Podcast Section -->
                        <div class="menu-section">
                            <h3>Content/Articles</h3>
                            <ul>
                                <li><a href="#">รายการทั้งหมด</a></li>
                                <li><a href="#">มนุษย์ต่างวัย Talk</a></li>
                                <li><a href="#">บพุทธ์ที่โครฟ</a></li>
                                <li><a href="#">Life Long Investing</a></li>
                                <li><a href="#">มนุษย์ต่างวัย Podcast</a></li>
                                <li><a href="#">ชีวิตชีวา 2</a></li>
                                <li><a href="#">The O Idol</a></li>
                                <li><a href="#">มนุษย์ต่างวัย Talk</a></li>
                            </ul>
                        </div>

                        <!-- Other Sections -->
                        <div class="menu-section">
                            <h3><a href="/HOMESPECTOR/Homepage/Contactus.html" class="menu-link">Contact</a></h3>
                            <h3><a href="/HOMESPECTOR/Homepage/projects_media.html" class="menu-link">Projects</a></h3>
                            <h3><a href="/HOMESPECTOR/Homepage/joinwithus.html" class="menu-link">joinwithus</a></h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contact-container1">
                <a href="tel:02-454-2043" class="contact-item1" data-aos="fade-up-left">
                    <div class="icon">
                        <i class="fa-solid fa-phone"></i>
                    </div>
                    <span>โทร 02-454-2043</span>
                </a>
                <a href="https://line.me/R/ti/p/@t.home" target="_blank" class="contact-item1" data-aos="fade-up-right">
                    <div class="icon">
                        <i class="fa-brands fa-line" style="color: #00a347;"></i>
                    </div>
                    <span>@t.home</span>
                </a>
            </div>
            <div class="form-container">
                <h2>Job Application Form</h2>
                <form action="" method="post" enctype="multipart/form-data">
                    <input type="text" id="name" name="name" placeholder="Full Name" required>
                    <input type="email" id="email" name="email" placeholder="Email" required>
                    <input type="tel" id="phone" name="phone" placeholder="+66 XXX-XXX-XXXX" required maxlength="10">
                    <input type="text" id="position" name="position" placeholder="Position" required>
                    <input type="text" id="address" name="address" placeholder="Current Address" required>

                    <!-- Resume Upload -->
                    <label>Upload Your Resume</label>
                    <div class="file-upload">
                        <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required>
                    </div>

                    <!-- Cover Letter Upload -->
                    <label>Upload Cover Letter</label>
                    <div class="file-upload">
                        <input type="file" id="cover_letter_file" name="cover_letter_file" accept=".pdf,.doc,.docx">
                    </div>
                    
                    <input type="submit" value="Apply" class="submit-btn">
                </form>

                <!-- Success message displayed below the form -->
                <?php echo $successMessage; ?>
            </div>

            <section class="footer">
                <footer class="footer">
                    <div class="footer-container">
                        <div class="footer-left">
                            <h2 class="footer-title">
                                <img src="/HOMESPECTOR/img/footer_logo.png" alt="logo" class="footer-logo">
                            </h2>
                            <div class="social-icons">
                                <a href="https://www.facebook.com/t.homeinspector/?locale=th_TH">
                                    <img src="/HOMESPECTOR/icon/ICON/Fb.png" alt="Facebook">
                                </a>
                                <a href="https://www.instagram.com/t.homeinspector/">
                                    <img src="/HOMESPECTOR/icon/ICON/IG.png" alt="Instagram">
                                </a>
                                <a href="https://page.line.me/t.home?openQrModal=true">
                                    <img src="/HOMESPECTOR/icon/ICON/line.png" alt="Line">
                                </a>
                                <a href="tel:082-045-6165">
                                    <img src="/HOMESPECTOR/icon/ICON/phone.png" alt="Phone">
                                </a>
                                <a href="https://www.tiktok.com/@thomeinspector">
                                    <img src="/HOMESPECTOR/icon/ICON/Tiktok.png" alt="TikTok">
                                </a>
                                <a href="https://www.youtube.com/channel/UC1BPUCVPBW4-ml7MrxQWjug">
                                    <img src="/HOMESPECTOR/icon/ICON/YB.png" alt="YouTube">
                                </a>
                            </div>
                        </div>
                        <div class="footer-center">
                            <h3 class="toggle-menu" onclick="toggleFooterMenu('nav-menu')">
                                Navigation <span class="toggle-icon">+</span>
                            </h3>
                            <ul id="nav-menu" class="footer-menu">
                                <li><a href="index.html">หน้าหลัก</a></li>
                                <li><a href="service.html">บริการ</a></li>
                                <li><a href="promotion.html">สิทธิพิเศษ</a></li>
                                <li><a href="projects_media.html">ผลงาน</a></li>
                                <li><a href="articles.html">บทความ</a></li>
                                <li><a href="contactus.html">ติดต่อเรา</a></li>
                            </ul>
                        </div>

                        <!-- บทความ -->
                        <div class="footer-center">
                            <h3 class="toggle-menu" onclick="toggleFooterMenu('article-menu')">
                                บทความ <span class="toggle-icon">+</span>
                            </h3>
                            <ul id="article-menu" class="footer-menu">
                                <li><a href="#">ไฟฟ้า</a></li>
                                <li><a href="#">อุปกรณ์</a></li>
                                <li><a href="#">Page</a></li>
                                <li><a href="#">Page</a></li>
                            </ul>
                        </div>
                        <div class="footer-right">
                            <h3>We Accept</h3>
                            <div class="payment-logos">
                                <img src="/HOMESPECTOR/img/visacard.png" alt="Visa">
                                <img src="/HOMESPECTOR/img/Mastercard.webp" alt="MasterCard">

                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>© 2024 T.HOME INSPECTOR. All rights reserved.</p>
                    </div>
                </footer>
            </section>

        </div>
    </div>


    <script src="/HOMESPECTOR/JS/Toggle_Navbar.js"></script>
    <script src="/HOOMESPECTOR/JS/dropdown.js"></script>
    <script src="/HOMESPECTOR/JS/carousel.js"></script>
    <script src="/HOMESPECTOR/JS/carousel2.js"></script>
    <script src="/HOMESPECTOR/JS/carousel5.js"></script>
    <script src="/HOMESPECTOR/JS/search_ham.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>

</body>

</html>