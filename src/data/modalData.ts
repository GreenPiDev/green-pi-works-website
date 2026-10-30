export interface ModalData { title: string; category: string; tech: string; desc: string; features: string[]; steps: string[]; brandAbout: string; highlights: string[] }

export const PROJECT_MODAL_DATA: Record<"tr" | "en", ModalData[]> = {
      tr: [
        {
          title: "Kurumsal Web Sitesi",
          category: "Web Tasarım",
          tech: "PHP / HTML5 / CSS / JS",
          desc: "Markanızı dijitalde en iyi temsil edecek kurumsal web sitesi hizmetimiz; özel tasarım, hızlı yüklenme ve mobil uyumluluk üzerine inşa edilir. WordPress ya da tamamen özel altyapı seçenekleriyle sunulur.",
          features: ["Kurumsal kimliğe özel UI/UX tasarım", "Mobil uyumlu arayüz tasarımı", "SEO altyapısı ve sayfa hızı optimizasyonu", "İletişim formları ve CTA entegrasyonu"],
          steps: ["İhtiyaç Analizi", "Arayüz & Prototip", "Tasarım & Kodlama", "Test & Yayın"],
          brandAbout: "Green Pi Works, işletmenizin dijital yüzünü tasarlar. Kurumsal kimliğinizi, hedef kitlenizi ve rekabet ortamınızı analiz ederek tamamen size özel bir web sitesi üretiriz.",
          highlights: ["Kurum kimliğine özel tasarım", "Hızlı ve SEO uyumlu yapı", "Mobil uyumlu arayüz tasarımı", "Güvenli SSL altyapısı"]
        },
        {
          title: "CRM Yönetim Paneli",
          category: "CRM Çözümleri",
          tech: "Node.js / React / PostgreSQL",
          desc: "Müşteri ilişkilerinizi tek platformdan yönetin. Satış hunisi, görev takibi, otomatik bildirimler ve raporlama modülleriyle iş süreçlerinizi hızlandırın.",
          features: ["Satış hunisi ve fırsat takibi", "Otomatik e-posta & SMS bildirimleri", "Görev ve ekip yönetimi", "Detaylı raporlama dashboard’u", "API entegrasyonları (ERP, muhasebe)", "Role bazlı yetkilendirme"],
          steps: ["Süreç Analizi", "Modül Tasarımı", "Geliştirme & Test", "Eğitim & Canlı"],
          brandAbout: "Müşteri ilişkilerinizi, satış fırsatlarınızı ve ekip görevlerini tek ekrandan takip edin. React tabanlı gerçek zamanlı dashboard.",
          highlights: ["Satış hunisi takibi", "Ekip görev yönetimi", "Otomatik bildirimler", "Detaylı raporlama"]
        },
        {
          title: "Özel Web Uygulaması",
          category: "Yazılım Geliştirme",
          tech: "Next.js / REST API / Docker",
          desc: "Standart çözümlerin yetmediği noktalarda, işinize özel web uygulamaları geliştiriyoruz. Modern mimari, ölçeklenebilir altyapı ve tam kaynak kodu teslimi.",
          features: ["Mikro-servis veya monolitik mimari", "REST / GraphQL API tasarımı", "Docker & CI/CD boru hattı", "Otomatik test & kod incelemesi", "Tam kaynak kodu ve dokümantasyon", "Uzun vadeli teknik destek"],
          steps: ["Teknik Analiz", "Mimari Tasarım", "Sprint Geliştirme", "Deploy & Destek"],
          brandAbout: "Standart çözümlerin yetersiz kaldığı projelerde sıfırdan özel web uygulamaları geliştiriyoruz. Tam kaynak kodu teslimi ve uzun vadeli destek.",
          highlights: ["Mikro-servis mimarisi", "REST / GraphQL API", "Docker deploy", "Tam kaynak kodu"]
        },
        {
          title: "B2B Bayi & Sipariş Altyapısı",
          category: "B2B Dijital Hizmetler",
          tech: "PHP / WooCommerce / REST",
          desc: "Bayi ağınızı dijitale taşıyın. Sipariş yönetimi, özel fiyatlandırma, bayi portalı ve stok takibiyle bütün satış kanallarınızı tek çatı altında birleştirin.",
          features: ["Bayi giriş portalı ve özel fiyatlar", "Toplu sipariş ve onay akışı", "Stok & depo entegrasyonu", "Fatura & ön muhasebe modülü", "Mobil uyumlu sipariş arayüzü", "ERP / muhasebe API bağlantısı"],
          steps: ["İş Akışı Analizi", "Portal Tasarımı", "Entegrasyon", "Eğitim & Canlı"],
          brandAbout: "Bayi ağınızı dijitale taşıyın. Özel fiyatlandırma, toplu sipariş ve stok takibi ile tüm kanallarınız tek platformda.",
          highlights: ["Bayi portalı", "Özel fiyat listeleri", "Toplu sipariş akışı", "ERP entegrasyonu"]
        },
        // TODO: geçici olarak kapatıldı
        /*
        {
          title: "Sunucu, Güvenlik & Performans",
          category: "Teknik Altyapı",
          tech: "Linux / Nginx / SSL / CDN",
          desc: "Sitenizin 7/24 hızlı ve güvenli çalışmasını sağlıyoruz. Sunucu kurulumu, güvenlik sertleştirmesi, yedekleme ve performans optimizasyonu hizmetleri.",
          features: ["VPS / cloud sunucu kurulumu", "Nginx / Apache konfigürasyon", "SSL, firewall ve DDoS koruması", "CDN entegrasyonu ve hız optimizasyonu", "Otomatik yedekleme planı", "7/24 izleme & uyarı sistemi"],
          steps: ["Altyapı Analizi", "Kurulum & Konfig", "Güvenlik Testi", "Sürekli İzleme"],
          brandAbout: "Sunucu kurulumu, SSL yapılandırması, firewall ve CDN ile sisteminizi 7/24 güvenli ve hızlı tutuyoruz.",
          highlights: ["VPS / cloud kurulum", "SSL & firewall", "CDN optimizasyonu", "7/24 izleme"]
        },
        */
        {
          title: "Kurumsal Kimlik & Marka",
          category: "Grafik Tasarım",
          tech: "Figma / Adobe CC / SVG",
          desc: "Markanızın görsel kimliğini sıfırdan oluşturuyoruz veya yeniliyoruz. Logo, renk paleti, tipografi ve tüm kurumsal materyaller tutarlı bir sistem çerçevesinde tasarlanır.",
          features: ["Logo & kurumsal kimlik tasarımı", "Renk paleti & tipografi sistemi", "Kartvizit, antetli kağıt, zarf seti", "Sosyal medya şablonları", "Marka kitabı (brand guideline)", "Baskıya hazır dosya teslimatı"],
          steps: ["Araştırma & Analiz", "Konsept Taslakları", "Revizyon", "Teslimat"],
          brandAbout: "Logo, renk paleti, tipografi ve marka kitabıyla markanızın görsel kimliğini tutarlı ve profesyonel şekilde oluşturuyoruz.",
          highlights: ["Logo tasarımı", "Renk & tipografi sistemi", "Marka kitabı", "Baskıya hazır dosyalar"]
        },
        {
          title: "İnteraktif Katalog Tasarımı",
          category: "Katalog Tasarımı",
          tech: "InDesign / PDF / Web",
          desc: "Ürünlerinizi ve hizmetlerinizi profesyonel bir katalogla sunun. Baskıya hazır PDF veya interaktif dijital katalog formatında teslim edilir.",
          features: ["Profesyonel sayfa düzeni tasarımı", "Baskıya hazır CMYK dosyalar", "Dijital / interaktif PDF versiyonu", "Ürün grubuna göre kategorizasyon", "Fotoğraf düzenleme ve rötuş", "Hızlı revizyon süreci"],
          steps: ["Kapsam Belirleme", "Tasarım & Yerleşim", "Revizyonlar", "Baskı Teslimatı"],
          brandAbout: "Ürün ve hizmetlerinizi baskıya hazır PDF ya da interaktif dijital katalog formatında sunuyoruz.",
          highlights: ["Profesyonel sayfa yapısı", "CMYK baskı dosyaları", "Dijital PDF", "Hızlı revizyon"]
        },
        {
          title: "Sosyal Medya Görünürlüğü",
          category: "Sosyal Medya Yönetimi",
          tech: "Meta Ads / Analytics / Canva",
          desc: "Sosyal medya hesaplarınızın içerik üretimi, zamanlaması ve reklam yönetimini üstleniyoruz. Marka sesi ve hedef kitleyle uyumlu stratejik yayın planı.",
          features: ["Aylık içerik takvimi planlaması", "Grafik & video içerik üretimi", "Instagram / LinkedIn / Facebook yönetimi", "Reklam kampanyası kurulumu & optimizasyon", "Performans raporu (aylık)", "Topluluk yönetimi & yorum takibi"],
          steps: ["Strateji & Analiz", "İçerik Planlama", "Yayın & Reklam", "Raporlama"],
          brandAbout: "Sosyal medya hesaplarınızın içerik üretimi, zamanlama ve reklam yönetimini stratejiyle üstleniyoruz.",
          highlights: ["Aylık içerik takvimi", "Grafik & video üretim", "Meta Ads yönetimi", "Performans raporu"]
        },
        // TODO: geçici olarak kapatıldı
        /*
        {
          title: "Kesintisiz Sistem Desteği",
          category: "Bakım ve Destek",
          tech: "7/24 Monitoring / cPanel / Git",
          desc: "Siteniz yayına alındıktan sonra da yanınızdayız. Düzenli güncelleme, yedekleme, güvenlik taraması ve öncelikli teknik destek ile sisteminiz her zaman sağlıklı çalışır.",
          features: ["WordPress & eklenti güncellemeleri", "Haftalık otomatik yedekleme", "Güvenlik & kötü yazılım taraması", "7/24 uptime izleme", "1 iş günü içinde destek yanıtı", "Aylık performans raporu"],
          steps: ["Mevcut Durum Analizi", "Bakım Planı", "Sürekli İzleme", "Öncelikli Destek"],
          brandAbout: "Siteniz yayına alındıktan sonra da yanınızdayız. Güncelleme, yedekleme, güvenlik ve öncelikli teknik destek hizmetleri.",
          highlights: ["WordPress güncellemeleri", "Haftalık yedekleme", "Güvenlik taraması", "1 iş günü destek"]
        }
        */
      ],
      en: [
        {
          title: "Corporate Web Architecture",
          category: "Web Design",
          tech: "PHP / HTML5 / CSS / JS",
          desc: "Our corporate website engineering creates a commanding digital presence with bespoke design, ultra-fast load times, and flawless mobile responsiveness. Delivered via custom architecture or tailored CMS platforms.",
          features: ["Bespoke UI/UX brand experience", "Fully responsive adaptive layouts", "Advanced SEO architecture & Core Web Vitals optimization", "High-converting lead forms & CTA integration"],
          steps: ["Discovery & Requirements", "Wireframing & Prototyping", "UI Design & Engineering", "QA Testing & Launch"],
          brandAbout: "Green Pi Works architects your company's premier digital gateway. We analyze your brand identity, market position, and target audience to engineer a fully customized corporate platform.",
          highlights: ["Bespoke corporate design", "Ultra-fast SEO-ready engine", "Mobile-first experience", "Hardened SSL security"]
        },
        {
          title: "Enterprise CRM Panel",
          category: "CRM Solutions",
          tech: "Node.js / React / PostgreSQL",
          desc: "Unify and streamline your customer relationships from a central intelligence platform. Boost operational velocity with sales pipelines, automated task workflows, live notifications, and executive reporting.",
          features: ["Visual sales pipeline & deal tracking", "Automated multichannel notifications", "Task delegation & team performance", "Real-time interactive analytics dashboard", "ERP & accounting API integrations", "Role-based granular access control"],
          steps: ["Workflow Analysis", "Module Architecture", "Development & Testing", "Staff Training & Rollout"],
          brandAbout: "Monitor and manage customer lifecycles, deal pipelines, and team tasks from a single real-time React dashboard.",
          highlights: ["Sales funnel tracking", "Team workflow management", "Automated notifications", "Executive reporting"]
        },
        {
          title: "Custom Web Application",
          category: "Software Development",
          tech: "Next.js / REST API / Docker",
          desc: "When off-the-shelf software falls short, we engineer bespoke web applications tailored precisely to your operational workflows. Modern architecture, scalable cloud infrastructure, and 100% full source code delivery.",
          features: ["Microservices or modular monolithic architecture", "REST & GraphQL API design", "Dockerized containerization & CI/CD pipeline", "Automated testing suites & strict code review", "Full proprietary source code ownership & documentation", "Dedicated enterprise SLA & support"],
          steps: ["Technical Scoping", "Architecture Blueprint", "Sprint Development", "Deployment & SLA"],
          brandAbout: "Custom web software built from the ground up for complex business requirements. Full IP source code handover with long-term engineering support.",
          highlights: ["Microservice architecture", "REST / GraphQL API", "Docker containerization", "100% full source code ownership"]
        },
        {
          title: "B2B Order & Dealer Portal",
          category: "B2B Digital Services",
          tech: "PHP / WooCommerce / REST",
          desc: "Digitize and automate your dealer network. Centralize wholesale ordering, tiered custom pricing, catalog quotas, and inventory synchronization under a secure enterprise portal.",
          features: ["Secure dealer login & dynamic contract pricing", "Bulk ordering & multi-level approval workflows", "Real-time warehouse & ERP inventory sync", "Automated e-invoicing & ledger integration", "Mobile-optimized wholesale order interface", "Custom RESTful enterprise API connector"],
          steps: ["Business Process Scoping", "Portal UX & Workflow Design", "Integration & Testing", "Onboarding & Go-Live"],
          brandAbout: "Empower your distribution and wholesale network online. Custom pricing tiers, bulk ordering, and live inventory sync unified on one platform.",
          highlights: ["Dealer portal access", "Custom price lists", "Bulk order workflows", "Direct ERP integration"]
        },
        // TODO: geçici olarak kapatıldı
        /*
        {
          title: "Server, Security & Uptime",
          category: "Infrastructure",
          tech: "Linux / Nginx / SSL / CDN",
          desc: "We ensure your digital ecosystem maintains 99.9% uptime with lightning-fast speeds and hardened defense layers. Cloud provisioning, proactive firewall hardening, daily backups, and global CDN caching.",
          features: ["High-performance cloud & VPS server provisioning", "Nginx & Apache reverse-proxy fine-tuning", "Automated SSL, WAF firewall & DDoS mitigation", "Global CDN routing & asset speed optimization", "Encrypted automated off-site backup schedules", "24/7 proactive health monitoring & incident alerts"],
          steps: ["Infrastructure Audit", "Hardening & Provisioning", "Security Stress Testing", "24/7 Active Monitoring"],
          brandAbout: "Server provisioning, SSL configuration, firewall defense, and global CDN to keep your digital systems 24/7 fast and protected.",
          highlights: ["VPS / Cloud provisioning", "SSL & firewall defense", "CDN speed acceleration", "24/7 automated monitoring"]
        },
        */
        {
          title: "Brand Identity & Design",
          category: "Graphic Design",
          tech: "Figma / Adobe CC / SVG",
          desc: "We craft or revitalize your brand's complete visual identity. From vector logos and color palettes to typography guidelines and stationery collateral, we create a unified and authoritative aesthetic.",
          features: ["Master vector logo & brand identity design", "Harmonious color systems & corporate typography", "Executive business cards, letterheads & stationery kits", "Social media branded template systems", "Comprehensive Brand Guidelines Book", "Print-ready vector & digital master files"],
          steps: ["Market & Brand Research", "Concept Generation", "Design Iterations", "Asset Delivery"],
          brandAbout: "Vector logos, harmonious palettes, typography systems, and comprehensive brand books engineered for professional consistency.",
          highlights: ["Logo & visual identity", "Color & typography system", "Brand Guideline Book", "Print-ready master assets"]
        },
        {
          title: "Interactive Digital Catalog",
          category: "Catalog Design",
          tech: "InDesign / PDF / Web",
          desc: "Showcase your complete product line and services in high-definition. Delivered as print-ready press PDFs and interactive digital flipbooks optimized for web, tablet, and sales presentations.",
          features: ["Editorial page layout & grid systems", "CMYK press-ready preflight PDF output", "Interactive digital PDF with clickable indexes", "Product taxonomy & SKU categorization", "High-res photo retouching & color correction", "Rapid editorial revision cycles"],
          steps: ["Catalog Scope & Content", "Layout Design & Pagination", "Client Revisions", "Print & Digital Delivery"],
          brandAbout: "Present your products and services with high-impact layouts. Available in press-ready PDF and interactive digital flipbook formats.",
          highlights: ["Editorial grid layouts", "CMYK press files", "Interactive digital PDF", "Rapid revision cycles"]
        },
        {
          title: "Social Media Growth",
          category: "Social Media",
          tech: "Meta Ads / Analytics / Canva",
          desc: "We take full strategic command of your social channels. Content production, strategic publication scheduling, and ROI-driven paid advertising designed to grow brand authority and inbound leads.",
          features: ["Monthly strategic editorial calendar", "Custom graphic & short-form video creative", "Channel management for Instagram, LinkedIn & Facebook", "Meta Ads conversion campaign setup & daily optimization", "Monthly analytical ROI & performance reporting", "Community management & lead engagement"],
          steps: ["Audience & Brand Strategy", "Content Production", "Campaign Execution", "Analytics & Reporting"],
          brandAbout: "Strategic content creation, publication schedules, and targeted advertising engineered to build brand authority and inbound interest.",
          highlights: ["Monthly content calendar", "Graphic & video production", "Meta Ads campaign management", "Detailed ROI reporting"]
        },
        // TODO: geçici olarak kapatıldı
        /*
        {
          title: "24/7 Continuous System Support",
          category: "Maintenance & Support",
          tech: "24/7 Monitoring / cPanel / Git",
          desc: "Our engineering team remains by your side long after launch. Routine core updates, offsite backups, vulnerability scans, and priority response ensure your systems operate with total stability.",
          features: ["Core framework & plugin security patches", "Automated weekly cloud backup archives", "Proactive vulnerability & malware sweeps", "24/7 server uptime & performance monitoring", "Priority same-day emergency ticket response", "Monthly health & SLA performance reports"],
          steps: ["System Health Baseline", "Preventative Maintenance", "24/7 Live Monitoring", "Priority Ticket Support"],
          brandAbout: "Post-launch dedicated maintenance. Routine updates, encrypted backups, vulnerability scanning, and priority technical support.",
          highlights: ["Platform updates", "Automated backups", "Security scanning", "Priority response SLA"]
        }
        */
      ]
    };
