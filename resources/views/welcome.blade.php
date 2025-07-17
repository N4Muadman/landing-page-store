<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đồ Gia Dụng Plus - Đồ Gia Dụng Tốt</title>
    <meta name="description" content="Đồ Gia Dụng Plus - Đồ Gia Dụng Tốt. Chuyên cung cấp thiết bị nhà bếp, nội thất, dụng cụ gia đình chất lượng tốt nhất. Giao hàng toàn quốc.">
    <meta name="keywords" content="đồ gia dụng plus, đồ gia dụng tốt, thiết bị nhà bếp, nội thất, dụng cụ nhà bếp">
    <meta name="author" content="Đồ Gia Dụng Plus">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Đồ Gia Dụng Plus - Đồ Gia Dụng Tốt">
    <meta property="og:description" content="Đồ Gia Dụng Plus - Đồ Gia Dụng Tốt. Chuyên cung cấp thiết bị nhà bếp, nội thất, dụng cụ gia đình chất lượng tốt nhất.">
    <meta property="og:image" content="https://giadungplus.top/logo.jpg?text=Đồ+Gia+Dụng+Plus">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="Đồ Gia Dụng Plus - Đồ Gia Dụng Tốt">
    <meta property="twitter:description" content="Đồ Gia Dụng Plus - Đồ Gia Dụng Tốt. Chuyên cung cấp thiết bị nhà bếp, nội thất, dụng cụ gia đình chất lượng tốt nhất.">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://giadungplus.top/">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="https://giadungplus.top/favicon.ico?text=🏠">

    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Đồ Gia Dụng Plus",
        "description": "Đồ Gia Dụng Plus - Đồ Gia Dụng Tốt. Chuyên cung cấp thiết bị nhà bếp, nội thất, dụng cụ gia đình chất lượng tốt nhất",
        "url": "https://giadungplus.top",
        "logo": "https://giadungplus.top/logo.jpg",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+84977-532-646",
            "contactType": "Customer Service"
        }
    }
    </script>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Hero Section */
        .hero {
            min-height: 90vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            color: white;
            position: relative;
            overflow: hidden;
        }

        /* Enhanced animated particles */
        .hero::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
            animation: floatingParticles 20s infinite linear;
        }

        .hero::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots2" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.08)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots2)"/></svg>');
            animation: floatingParticles 15s infinite linear reverse;
        }

        @keyframes floatingParticles {
            0% {
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-30px) translateX(20px) rotate(90deg);
                opacity: 0.6;
            }
            50% {
                transform: translateY(-60px) translateX(-10px) rotate(180deg);
                opacity: 0.4;
            }
            75% {
                transform: translateY(-30px) translateX(-30px) rotate(270deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(0px) translateX(0px) rotate(360deg);
                opacity: 0.3;
            }
        }

        /* Floating geometric shapes */
        .floating-shapes {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }

        .shape {
            position: absolute;
            opacity: 0.1;
            animation: float 8s infinite ease-in-out;
        }

        .shape:nth-child(1) {
            top: 10%;
            left: 20%;
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 50%;
            animation-delay: 0s;
        }

        .shape:nth-child(2) {
            top: 20%;
            right: 20%;
            width: 40px;
            height: 40px;
            background: white;
            transform: rotate(45deg);
            animation-delay: 2s;
        }

        .shape:nth-child(3) {
            bottom: 30%;
            left: 10%;
            width: 50px;
            height: 50px;
            background: white;
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            animation-delay: 4s;
        }

        .shape:nth-child(4) {
            bottom: 20%;
            right: 30%;
            width: 35px;
            height: 35px;
            background: white;
            border-radius: 50%;
            animation-delay: 6s;
        }

        .shape:nth-child(5) {
            top: 50%;
            left: 5%;
            width: 45px;
            height: 45px;
            background: white;
            transform: rotate(45deg);
            animation-delay: 1s;
        }

        .shape:nth-child(6) {
            top: 60%;
            right: 10%;
            width: 55px;
            height: 55px;
            background: white;
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            animation-delay: 3s;
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0.1;
            }
            25% {
                transform: translateY(-40px) translateX(30px) rotate(90deg);
                opacity: 0.3;
            }
            50% {
                transform: translateY(-80px) translateX(-20px) rotate(180deg);
                opacity: 0.2;
            }
            75% {
                transform: translateY(-40px) translateX(-40px) rotate(270deg);
                opacity: 0.4;
            }
        }

        .hero-content {
            position: relative;
            z-index: 2;
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }

        .hero h1 {
            font-size: 4rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            animation: slideInUp 1s ease-out;
        }

        .hero .slogan {
            font-size: 2.5rem;
            font-weight: 600;
            margin-bottom: 2rem;
            color: #FFD700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            animation: slideInUp 1s ease-out 0.2s both;
        }

        .hero p {
            font-size: 1.4rem;
            margin-bottom: 3rem;
            opacity: 0.95;
            animation: slideInUp 1s ease-out 0.4s both;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            animation: slideInUp 1s ease-out 0.6s both;
        }

        .cta-button {
            padding: 18px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .cta-primary {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            box-shadow: 0 10px 30px rgba(255,107,107,0.4);
        }

        .cta-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(255,107,107,0.6);
        }

        .cta-secondary {
            background: rgba(255,255,255,0.2);
            color: white;
            border: 2px solid rgba(255,255,255,0.3);
            backdrop-filter: blur(10px);
        }

        .cta-secondary:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-3px);
        }

        /* Features Section */
        .features {
            padding: 100px 0;
            background: #f8fafc;
        }

        .section-title {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #2c3e50;
            font-weight: 700;
        }

        .section-subtitle {
            text-align: center;
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 4rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
        }

        .feature-card {
            background: white;
            padding: 3rem 2rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            border: 1px solid #e2e8f0;
            position: relative;
            overflow: hidden;
        }

        .feature-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        .feature-card:hover::before {
            transform: scaleX(1);
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }

        .feature-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            display: block;
        }

        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #2c3e50;
            font-weight: 600;
        }

        .feature-card p {
            color: #666;
            line-height: 1.8;
            font-size: 1rem;
        }

        /* Good things list */
        .good-things {
            padding: 100px 0;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
        }

        .good-things-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .good-item {
            background: rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            transition: all 0.3s ease;
        }

        .good-item:hover {
            transform: translateY(-5px);
            background: rgba(255,255,255,0.15);
        }

        .good-item h4 {
            font-size: 1.3rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }

        .good-item p {
            font-size: 0.95rem;
            opacity: 0.9;
            line-height: 1.6;
        }

        /* About Section */
        .about {
            padding: 100px 0;
            background: white;
        }

        .about-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .about-text h2 {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            color: #2c3e50;
            font-weight: 700;
        }

        .about-text p {
            font-size: 1.1rem;
            color: #666;
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }

        .about-image {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .about-card {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .about-card h4 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
        }

        .about-card p {
            font-size: 0.9rem;
            opacity: 0.9;
        }

        /* CTA Section */
        .cta-section {
            padding: 100px 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }

        .cta-section h2 {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }

        .cta-section p {
            font-size: 1.2rem;
            margin-bottom: 3rem;
            opacity: 0.9;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .contact-info {
            display: flex;
            justify-content: center;
            gap: 3rem;
            flex-wrap: wrap;
            margin-top: 3rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: rgba(255,255,255,0.1);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }

        .contact-item span {
            font-size: 1.5rem;
        }

        .contact-item div {
            text-align: left;
        }

        .contact-item strong {
            display: block;
            font-size: 1.1rem;
        }

        .contact-item small {
            opacity: 0.8;
        }

        /* Footer */
        footer {
            background: #2c3e50;
            color: white;
            padding: 2rem 0;
            text-align: center;
        }

        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .footer-links {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
        }

        .footer-links a {
            color: #bdc3c7;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: #ecf0f1;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }

            .hero .slogan {
                font-size: 1.8rem;
            }

            .hero p {
                font-size: 1.1rem;
            }

            .cta-buttons {
                flex-direction: column;
                align-items: center;
            }

            .about-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .about-image {
                order: -1;
            }

            .contact-info {
                flex-direction: column;
                gap: 1rem;
            }

            .footer-content {
                flex-direction: column;
                text-align: center;
            }

            .section-title {
                font-size: 2rem;
            }

            .cta-section h2 {
                font-size: 2rem;
            }
        }

        /* Animations */
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }

        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Scroll indicator */
        .scroll-indicator {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 2rem;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
            }
            40% {
                transform: translateX(-50%) translateY(-10px);
            }
            60% {
                transform: translateX(-50%) translateY(-5px);
            }
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="hero">
        <div class="floating-shapes">
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
        </div>
        <div class="container">
            <div class="hero-content">
                <h1>🏠 Đồ Gia Dụng Plus</h1>
                <div class="slogan">Đồ Gia Dụng Tốt</div>
                <p>Chào mừng bạn đến với Đồ Gia Dụng Plus - nơi cung cấp những sản phẩm đồ gia dụng tốt nhất, chất lượng cao, giá cả hợp lý. Nơi bạn tìm thấy mọi thứ cần thiết để làm đẹp không gian sống của mình.</p>
                <div class="cta-buttons">
                    <a href="#features" class="cta-button cta-primary">Khám Phá Ngay</a>
                    <a href="#contact" class="cta-button cta-secondary">Liên Hệ Ngay</a>
                </div>
            </div>
        </div>
        <div class="scroll-indicator">⬇</div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
        <div class="container">
            <h2 class="section-title">Tại Sao Chọn Đồ Gia Dụng Plus?</h2>
            <p class="section-subtitle">Chúng tôi cam kết mang đến cho bạn những sản phẩm và dịch vụ tốt nhất</p>
            <div class="features-grid">
                <div class="feature-card fade-in">
                    <span class="feature-icon">🏆</span>
                    <h3>Chất Lượng Đảm Bảo</h3>
                    <p>Tất cả sản phẩm đều được tuyển chọn từ các thương hiệu uy tín, có chứng nhận chất lượng và bảo hành chính hãng.</p>
                </div>
                <div class="feature-card fade-in">
                    <span class="feature-icon">💰</span>
                    <h3>Giá Cả Hợp Lý</h3>
                    <p>Cam kết giá tốt nhất thị trường với nhiều chương trình khuyến mãi hấp dẫn và ưu đãi đặc biệt.</p>
                </div>
                <div class="feature-card fade-in">
                    <span class="feature-icon">🚚</span>
                    <h3>Giao Hàng Nhanh Chóng</h3>
                    <p>Giao hàng tận nơi trong 24h tại nội thành, 2-3 ngày toàn quốc. Đóng gói cẩn thận, an toàn.</p>
                </div>
                <div class="feature-card fade-in">
                    <span class="feature-icon">🛡️</span>
                    <h3>Hỗ Trợ Tận Tâm</h3>
                    <p>Đội ngũ tư vấn chuyên nghiệp, hỗ trợ 24/7. Chế độ bảo hành tốt và chính sách đổi trả linh hoạt.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Good Things Section -->
    <section class="good-things">
        <div class="container">
            <h2 class="section-title">Những Điều Tốt Tại Đồ Gia Dụng Plus</h2>
            <p class="section-subtitle">Khám phá những ưu điểm vượt trội của chúng tôi</p>
            <div class="good-things-grid">
                <div class="good-item fade-in">
                    <h4>✨ Chất Lượng Tốt</h4>
                    <p>Sản phẩm được kiểm tra chất lượng nghiêm ngặt, đảm bảo độ bền và hiệu quả sử dụng cao.</p>
                </div>
                <div class="good-item fade-in">
                    <h4>🎯 Giá Cả Tốt</h4>
                    <p>Cam kết giá cả cạnh tranh, nhiều chương trình khuyến mãi và ưu đãi hấp dẫn.</p>
                </div>
                <div class="good-item fade-in">
                    <h4>🚀 Dịch Vụ Tốt</h4>
                    <p>Đội ngũ nhân viên chuyên nghiệp, tư vấn tận tâm, hỗ trợ khách hàng 24/7.</p>
                </div>
                <div class="good-item fade-in">
                    <h4>📦 Giao Hàng Tốt</h4>
                    <p>Giao hàng nhanh chóng, đóng gói cẩn thận, bảo đảm sản phẩm nguyên vẹn.</p>
                </div>
                <div class="good-item fade-in">
                    <h4>🔄 Bảo Hành Tốt</h4>
                    <p>Chính sách bảo hành rõ ràng, thời gian bảo hành dài, hỗ trợ sửa chữa nhanh chóng.</p>
                </div>
                <div class="good-item fade-in">
                    <h4>💝 Trải Nghiệm Tốt</h4>
                    <p>Giao diện website thân thiện, quy trình mua hàng đơn giản, thanh toán an toàn.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2>Về Đồ Gia Dụng Plus</h2>
                    <p>Với hơn 5 năm kinh nghiệm trong lĩnh vực bán lẻ đồ gia dụng, Đồ Gia Dụng Plus tự hào là địa chỉ tin cậy của hàng ngàn gia đình Việt Nam.</p>
                    <p>Chúng tôi hiểu rằng mỗi sản phẩm đồ gia dụng không chỉ là vật dụng đơn thuần mà còn là một phần quan trọng trong cuộc sống hàng ngày, giúp tạo nên không gian sống thoải mái và tiện nghi.</p>
                    <p>Sứ mệnh của chúng tôi là mang đến cho khách hàng những sản phẩm đồ gia dụng tốt nhất với giá cả hợp lý nhất, cùng với dịch vụ chăm sóc khách hàng tận tâm.</p>
                </div>
                <div class="about-image">
                    <div class="about-card">
                        <h4>1000+</h4>
                        <p>Sản phẩm đa dạng</p>
                    </div>
                    <div class="about-card">
                        <h4>5000+</h4>
                        <p>Khách hàng hài lòng</p>
                    </div>
                    <div class="about-card">
                        <h4>24/7</h4>
                        <p>Hỗ trợ khách hàng</p>
                    </div>
                    <div class="about-card">
                        <h4>99%</h4>
                        <p>Đánh giá tích cực</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section id="contact" class="cta-section">
        <div class="container">
            <h2>Sẵn Sàng Mua Sắm?</h2>
            <p>Hãy liên hệ với Đồ Gia Dụng Plus ngay hôm nay để được tư vấn và hỗ trợ tốt nhất. Chúng tôi luôn sẵn sàng phục vụ bạn!</p>
            <div class="cta-buttons">
                <a href="tel:0977532646" class="cta-button cta-primary">Gọi Ngay</a>
                <a href="http://m.me/130848756788995" target="_blank" class="cta-button cta-secondary">Nhắn tin</a>
            </div>
            <div class="contact-info">
                <div class="contact-item">
                    <span>📍</span>
                    <div>
                        <strong>Địa chỉ</strong>
                        <small>466 Trần Hưng Đạo, Quỳnh Mai, Nghệ An</small>
                    </div>
                </div>
                <div class="contact-item">
                    <span>📞</span>
                    <div>
                        <strong>Hotline</strong>
                        <small>0977.532.646</small>
                    </div>
                </div>
                <div class="contact-item">
                    <span>🕒</span>
                    <div>
                        <strong>Giờ làm việc</strong>
                        <small>24/24 giờ</small>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <p>&copy; 2024 Đồ Gia Dụng Plus. Tất cả quyền được bảo lưu.</p>
                <div class="footer-links">
                    <a href="#">Chính sách bảo mật</a>
                    <a href="#">Điều khoản sử dụng</a>
                    <a href="#">Chính sách bảo hành</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Hide scroll indicator on scroll
        window.addEventListener('scroll', function() {
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Enhanced floating animation for shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                const currentTransform = shape.style.transform || '';
                shape.style.transform = `${currentTransform} translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 500);
        });
    </script>
</body>
</html>
