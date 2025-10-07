// Lightweight i18n for Proto Yazılım site
(function () {
  // Use localStorage instead of cookies to avoid third-party cookie issues
  function setStorage(name, value) {
    try {
      localStorage.setItem(name, value);
    } catch (e) {
      console.warn("localStorage not available:", e);
    }
  }

  function getStorage(name) {
    try {
      return localStorage.getItem(name);
    } catch (e) {
      console.warn("localStorage not available:", e);
      return null;
    }
  }

  window.__I18N__ = {
    tr: {
      langLabel: "Dil",
      nav_about: "Hakkımızda",
      nav_projects: "Ürünler",
      nav_career: "Kariyer",
      nav_contact: "İletişim",
      see_products: "Ürünleri Gör",
      what_we_do: "Ne yapıyoruz?",
      software_dev: "Yazılım geliştirme",
      consulting: "Danışmanlık",
      big_data: "Büyük Veri",
      digital_solutions: "Dijital çözümler",
      references: "Referanslar",
      strong_culture: "Güçlü iş kültürü",
      together: "Birlikte\nçalışalım",
      contact_us: "Mesaj gönderin veya arayın.",
      contact_us_alt: "Bize bir mesaj gönderin veya arayın.",
      name_placeholder: "Ad soyad",
      email_placeholder_company: "Şirket eposta adresi",
      email_placeholder: "E-Posta adresi",
      message_placeholder: "Mesajınızı buraya yazınız",
      send_message: "Mesaj gönder",
      back: "geri dön",
      detail: "Detay",
      detail_hide: "Detay Gizle",
      products_title: "Ürünler",
      about_title: "Hakkımızda",
      career_title: "Kariyer",
      frontend_title: "Arayüz Geliştirici - Title: Frontend Developer",
      backend_title:
        "Senior Yazılım Geliştirici - Title: Sr. Backend Developer Java",
      proto_contact_subject: "Proto İletişim",
      cv_send: "CV Gönder",
    },
    en: {
      langLabel: "Language",
      nav_about: "About",
      nav_projects: "Products",
      nav_career: "Career",
      nav_contact: "Contact",
      see_products: "See Products",
      what_we_do: "What do we do?",
      software_dev: "Software development",
      consulting: "Consulting",
      big_data: "Big Data",
      digital_solutions: "Digital solutions",
      references: "References",
      strong_culture: "Strong work culture",
      together: "Let’s\nwork together",
      contact_us: "Send a message or call.",
      contact_us_alt: "Send us a message or call.",
      name_placeholder: "Full name",
      email_placeholder_company: "Company email address",
      email_placeholder: "Email address",
      message_placeholder: "Write your message here",
      send_message: "Send message",
      back: "go back",
      detail: "Detail",
      detail_hide: "Hide detail",
      products_title: "Products",
      about_title: "About",
      career_title: "Career",
      frontend_title: "Frontend Developer",
      backend_title: "Senior Software Developer - Sr. Backend Developer (Java)",
      proto_contact_subject: "Proto Contact",
      cv_send: "Send CV",
    },
    de: {
      langLabel: "Sprache",
      nav_about: "Über uns",
      nav_projects: "Produkte",
      nav_career: "Karriere",
      nav_contact: "Kontakt",
      see_products: "Produkte ansehen",
      what_we_do: "Was machen wir?",
      software_dev: "Softwareentwicklung",
      consulting: "Beratung",
      big_data: "Big Data",
      digital_solutions: "Digitale Lösungen",
      references: "Referenzen",
      strong_culture: "Starke Arbeitskultur",
      together: "Lass uns\nzusammenarbeiten",
      contact_us: "Nachricht senden oder anrufen.",
      contact_us_alt: "Senden Sie uns eine Nachricht oder rufen Sie an.",
      name_placeholder: "Vollständiger Name",
      email_placeholder_company: "Unternehmens-E-Mail-Adresse",
      email_placeholder: "E‑Mail‑Adresse",
      message_placeholder: "Schreiben Sie hier Ihre Nachricht",
      send_message: "Nachricht senden",
      back: "zurück",
      detail: "Details",
      detail_hide: "Details ausblenden",
      products_title: "Produkte",
      about_title: "Über uns",
      career_title: "Karriere",
      frontend_title: "Frontend‑Entwickler(in)",
      backend_title: "Senior Softwareentwickler – Sr. Backend Developer (Java)",
      proto_contact_subject: "Proto Kontakt",
      cv_send: "Lebenslauf senden",
    },
  };

  function currentLang() {
    return getStorage("site_lang") || "tr";
  }
  function setLang(lang) {
    setStorage("site_lang", lang);
  }

  function ensureLangSelector() {
    try {
      var nav = document.querySelector(".proto-navbar ul");
      if (!nav) {
        console.warn("Language selector: .proto-navbar ul not found");
        return;
      }
      if (document.getElementById("lang-select")) {
        console.log("Language selector already exists");
        return;
      }

      var li = document.createElement("li");
      li.style.marginLeft = "12px";
      li.style.display = "flex";
      li.style.alignItems = "center";

      var sel = document.createElement("select");
      sel.id = "lang-select";
      sel.style.background = "rgba(0,0,0,0.3)";
      sel.style.border = "1px solid rgba(255,255,255,0.6)";
      sel.style.color = "white";
      sel.style.padding = "4px 8px";
      sel.style.borderRadius = "4px";
      sel.style.fontSize = "14px";
      sel.style.fontWeight = "500";
      sel.style.cursor = "pointer";
      sel.style.outline = "none";

      // Style options for better visibility
      sel.style.webkitAppearance = "none";
      sel.style.mozAppearance = "none";
      sel.style.appearance = "none";

      var opts = [
        { v: "tr", l: "TR" },
        { v: "en", l: "EN" },
        { v: "de", l: "DE" },
      ];
      opts.forEach(function (o) {
        var op = document.createElement("option");
        op.value = o.v;
        op.textContent = o.l;
        op.style.background = "#1e1d1d";
        op.style.color = "white";
        sel.appendChild(op);
      });
      sel.value = currentLang();

      sel.addEventListener("change", function () {
        setLang(sel.value);
        // Refresh the page so all content and routes pick up the new language
        try {
          window.location.reload();
        } catch (e) {
          applyTranslations();
        }
      });

      // Add hover effect
      sel.addEventListener("mouseenter", function () {
        sel.style.background = "rgba(0,0,0,0.5)";
        sel.style.borderColor = "rgba(255,255,255,0.8)";
      });

      sel.addEventListener("mouseleave", function () {
        sel.style.background = "rgba(0,0,0,0.3)";
        sel.style.borderColor = "rgba(255,255,255,0.6)";
      });

      li.appendChild(sel);
      nav.appendChild(li);
      console.log("Language selector created successfully");
    } catch (e) {
      console.error("Language selector error:", e);
    }
  }

  function tText(key) {
    var lang = currentLang();
    var dict = window.__I18N__[lang] || window.__I18N__.tr;
    var phrases = window.__I18N_PHRASES__ || {};

    // First check in phrases object
    if (phrases[key] && phrases[key][lang]) {
      return phrases[key][lang];
    }

    // Then check in main dict
    return dict[key] || key;
  }

  function translateCommon() {
    var lang = currentLang();
    var dict = window.__I18N__[lang] || window.__I18N__.tr;
    try {
      document.documentElement.setAttribute("lang", lang);
    } catch (e) {}
    var m = {
      "/about.html": "nav_about",
      "/projects.html": "nav_projects",
      "/career.html": "nav_career",
      "/contact.html": "nav_contact",
    };
    Object.keys(m).forEach(function (href) {
      var a = document.querySelector('.proto-navbar a[href="' + href + '"]');
      if (a) {
        a.textContent = dict[m[href]];
        a.style.whiteSpace = "nowrap";
      }
    });
    document
      .querySelectorAll("#footer-contact .phrase, #contact .phrase")
      .forEach(function (el) {
        el.innerHTML = dict.together.replace("\n", "<br />");
      });
    document.querySelectorAll(".contact-address").forEach(function (el) {
      el.textContent = el.textContent.includes("Bize")
        ? dict.contact_us_alt
        : dict.contact_us;
    });
    ["form-name", "form-email", "form-message"].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var key =
        id === "form-name"
          ? "name_placeholder"
          : id === "form-email"
          ? el.placeholder && el.placeholder.toLowerCase().includes("şirket")
            ? "email_placeholder_company"
            : "email_placeholder"
          : "message_placeholder";
      el.placeholder = dict[key];
    });
    document.querySelectorAll(".next-button span").forEach(function (el) {
      el.textContent = dict.send_message;
    });
    // Translate all back buttons (contact page and product pages)
    document.querySelectorAll(".back-button span").forEach(function (el) {
      el.textContent = dict.back;
    });
    var h2s = document.querySelectorAll("h2");
    h2s.forEach(function (h) {
      var t = h.textContent.trim();
      if (t === "Ne yapıyoruz?") h.textContent = dict.what_we_do;
      if (t === "Referanslar") h.textContent = dict.references;
      if (t === "Güçlü iş kültürü") h.textContent = dict.strong_culture;
    });
    var h1s = document.querySelectorAll("h1");
    h1s.forEach(function (h) {
      var t = h.textContent.trim();
      if (t === "Ürünler") h.textContent = dict.products_title;
      if (t === "Hakkımızda") h.textContent = dict.about_title;
      if (t === "Kariyer") h.textContent = dict.career_title;
    });
    document
      .querySelectorAll(".project-button span, .detail-button span")
      .forEach(function (el) {
        if (el.textContent.trim().startsWith("Detay"))
          el.textContent = dict.detail;
      });
    window.__I18N_TOGGLE_OPEN__ = dict.detail;
    window.__I18N_TOGGLE_CLOSE__ = dict.detail_hide;
  }

  function translateSpecificContent() {
    var lang = currentLang();
    var mapTitles = {
      "Galata İzleme Platformu": {
        en: "Galata Monitoring Platform",
        de: "Galata Überwachungs plattform",
      },
      "Lepton Framework": { en: "Lepton Framework", de: "Lepton Framework" },
      "Proton Mesaj Yönetim Platformu": {
        en: "Proton Message Management Platform",
        de: "Proton Nachrichten verwaltungs plattform",
      },
    };
    document.querySelectorAll(".project-title h1").forEach(function (el) {
      var t = el.textContent.trim();
      if (mapTitles[t]) {
        el.textContent = mapTitles[t][lang] || t;
      }
    });

    // Translate product descriptions - direct mapping
    var productDescriptions = {
      "Galata İzleme Platformu, kurumunuzda bulunan tüm uygulamaların ürettiği log'ların ilgili sunuculardan toplanıp, merkezi bir log cluster'ında indekslenmesine ve bu log'ların gerçek zamanlı olarak analiz edilmesine olanak sağlar.":
        {
          en: "Galata Monitoring Platform collects logs from your applications, indexes them in a central log cluster, and enables real‑time analysis.",
          de: "Die Galata‑Überwachungs plattform sammelt Logs Ihrer Anwendungen, indexiert sie in einem zentralen Log‑Cluster und ermöglicht Echtzeitanalysen.",
        },
      "Lepton Framework, mobil ve web uygulamalarınızı aynı çatı altında kolaylıkla geliştirmenizi sağlayan bir üründür. Lepton komponentleri kullanılarak, projelerin mobil-web uygulamaları platform bağımsız ve ek maliyet olmadan eş zamanlı geliştirilebilir. Dokümantasyonu ve örnek projeleri ile hızlı başlangıçlara olanak sağlar.":
        {
          en: "Lepton Framework lets you easily build mobile and web apps under one roof. Using Lepton components, mobile and web apps can be developed simultaneously, platform‑independently, and without extra cost. Its documentation and sample projects enable fast starts.",
          de: "Mit dem Lepton Framework entwickeln Sie Mobile‑ und Web‑Apps einfach unter einem Dach. Mit Lepton‑Komponenten können Mobile‑ und Web‑Apps plattformunabhängig und ohne zusätzliche Kosten parallel entwickelt werden. Dokumentation und Beispielprojekte ermöglichen einen schnellen Einstieg.",
        },
      "Proton Mesaj Yönetim Platformu; kullanıcılarınıza göndereceğiniz milyonlarca e-posta, SMS ve anlık bildirimi tasarlayıp, hızlı ve sorunsuz iletebileceğiniz, kullanıcı-bildirim etkileşimlerini raporlayabileceğiniz, altyapınıza veya bulut hesabınıza kurabileceğiniz bir mesaj yönetim platformudur. Proton, toplu mesaj gönderme yeteneğinin yanında, sağladığı API'ler aracılığı ile gerçek zamanlı bildirim gönderme yeteneğine de sahiptir.":
        {
          en: "Proton Message Management Platform lets you design, send, and report millions of emails, SMS, and push notifications quickly and reliably. It can be deployed on your infrastructure or cloud account. Beyond bulk messaging, Proton provides APIs for real‑time notifications.",
          de: "Die Proton Nachrichten verwaltungs plattform ermöglicht das Entwerfen, Versenden und Auswerten von Millionen E‑Mails, SMS und Push‑Benachrichtigungen – schnell und zuverlässig. Deployments sind on‑premises oder in Ihrer Cloud möglich. Neben Massenversand bietet Proton APIs für Echtzeit‑Benachrichtigungen.",
        },
    };

    // Only translate product descriptions if not Turkish
    if (lang !== "tr") {
      document.querySelectorAll(".project-info p").forEach(function (el) {
        var originalText = el.textContent || el.innerText || "";
        var normalized = originalText.replace(/\s+/g, " ").trim();

        // Try direct match
        if (normalized && productDescriptions[normalized]) {
          var translation = productDescriptions[normalized][lang];
          if (translation) {
            el.textContent = translation;
          }
        }
      });
    }

    // Translate projects page intro
    if (lang !== "tr") {
      var projectPhrase = document.querySelector(".project-container .phrase");
      if (projectPhrase) {
        var introText =
          "Proto Yazılım ürünleri; mühendislerimizin özgün fikirleri ile kullanıcı deneyimleri dikkate alınarak oluşturulmuştur. Ürünlerimiz, güncel teknolojiye dayanan alt yapıları ile geliştirilmeye uygun olup; ürünlerimizin kurulumu, kullanımı ve işletilmeleri kolaydır.";
        var introTranslations = {
          en: "Proto Yazılım products are created with our engineers' original ideas and with user experience in mind. Built on modern technology, our products are easy to develop on, install, use, and operate.",
          de: "Proto Yazılım‑Produkte entstehen aus den originellen Ideen unserer Ingenieur:innen und mit Fokus auf das Nutzererlebnis. Auf moderner Technologie aufgebaut, sind sie leicht erweiterbar, zu installieren, zu nutzen und zu betreiben.",
        };

        var phraseText = projectPhrase.textContent.replace(/\s+/g, " ").trim();
        if (phraseText === introText && introTranslations[lang]) {
          projectPhrase.textContent = introTranslations[lang];
        }
      }
    }

    document
      .querySelectorAll(".see-products a span.pr-2")
      .forEach(function (el) {
        el.textContent = tText("see_products");
      });
    var el1 = document.querySelector("#career-page h2");
    if (el1) {
      var t = el1.textContent.trim();
      if (t.indexOf("Arayüz Geliştirici") === 0)
        el1.textContent = tText("frontend_title");
    }
    var els = document.querySelectorAll("#career-page h2");
    if (els && els.length > 1) {
      var t2 = els[1].textContent.trim();
      if (t2.indexOf("Senior Yazılım Geliştirici") === 0)
        els[1].textContent = tText("backend_title");
    }
  }

  function translateMailto() {
    window.__I18N_MAIL_SUBJECT__ = tText("proto_contact_subject");
  }

  // Phrase-level translations for full content
  // Map of exact Turkish snippets to { en, de }
  window.__I18N_PHRASES__ = {
    // index - page 1 intro paragraph
    "Proaktif yaklaşımımızla bilgiye dayanan kapsayıcı fikir ve çözümlerimizi şeffaf bir şekilde iş ortaklarımızla paylaşıyoruz. Teknolojiyi, kullanıcı deneyimi ve görsel tasarım ile birleştirerek optimum değerlerde çalışan yazılımlar üretiyoruz.":
      {
        en: "With our proactive approach, we transparently share inclusive, knowledge-based ideas and solutions with our partners. We combine technology with user experience and visual design to produce software that operates at optimal value.",
        de: "Mit unserem proaktiven Ansatz teilen wir wissensbasierte, ganzheitliche Ideen und Lösungen transparent mit unseren Partnern. Wir verbinden Technologie mit Nutzererlebnis und visuellem Design, um Software mit optimalem Mehrwert zu entwickeln.",
      },
    // index - what we do left paragraph
    "Her işimizde yeni bir vizyon yaratmak ve o vizyonu şekillendirmek için çalışıyoruz. Cesur, meraklı ve tecrübeli ekibimiz ile öğrendiklerimizi beklentileri aşmak için kullanıyoruz.":
      {
        en: "In every project, we work to create and shape a new vision. With our bold, curious, and experienced team, we use what we learn to exceed expectations.",
        de: "In jedem Projekt arbeiten wir daran, eine neue Vision zu schaffen und zu gestalten. Mit unserem mutigen, neugierigen und erfahrenen Team nutzen wir unsere Erkenntnisse, um Erwartungen zu übertreffen.",
      },
    // index - service descriptions
    "İş ortaklarımızın stratejik hedeflerine ve kurumsal yapılarına uygun, uçtan uca eksiksiz yazılımlarla nitelikli çözümler sunuyoruz.":
      {
        en: "We deliver high‑quality solutions with end‑to‑end software tailored to our partners’ strategic goals and organizational structures.",
        de: "Wir liefern hochwertige Lösungen mit End‑to‑End‑Software, die auf die strategischen Ziele und die Organisationsstruktur unserer Partner zugeschnitten ist.",
      },
    "Uygulama Geliştirme, Proje Yönetimi, DevOps ve UI/UX projelerinde deneyimli takımımızla beraber yanınızdayız.":
      {
        en: "We stand by you with our experienced team in Application Development, Project Management, DevOps, and UI/UX projects.",
        de: "Wir stehen Ihnen mit unserem erfahrenen Team in Anwendungsentwicklung, Projektmanagement, DevOps und UI/UX‑Projekten zur Seite.",
      },
    "Veri platformu altyapılarının kurulması, analiz araçlarının raporlama ve iş zekası çözümleri ile makine öğrenmesi süreçlerinin tanımlanması konularında danışmanlık hizmetleri veriyor ve ürün çözümleri sunuyoruz.":
      {
        en: "We provide consultancy and product solutions for setting up data platform infrastructures, defining analytics/reporting and business intelligence solutions, and machine learning processes.",
        de: "Wir bieten Beratung und Produktlösungen für den Aufbau von Datenplattform‑Infrastrukturen, die Definition von Analyse‑/Reporting‑ und Business‑Intelligence‑Lösungen sowie für Machine‑Learning‑Prozesse.",
      },
    "Dağıtık sistem mimarileri, orkestrasyon çözümleri, uçtan uca web ve mobil uygulama-geliştirme konularında hizmet veriyor ve ürün çözümleri sunuyoruz.":
      {
        en: "We provide services and product solutions in distributed system architectures, orchestration solutions, and end‑to‑end web and mobile application development.",
        de: "Wir bieten Dienstleistungen und Produktlösungen für verteilte Systemarchitekturen, Orchestrierungslösungen sowie End‑to‑End‑Web‑ und Mobile‑App‑Entwicklung.",
      },
    // index - references description
    "İş ortaklarımıza, rakiplerinden bir adım önde olma avantajını sağlayacak yenilikçi çözümler sunuyoruz.":
      {
        en: "We offer innovative solutions that give our partners the advantage of staying one step ahead of their competitors.",
        de: "Wir bieten innovative Lösungen, die unseren Partnern den Vorteil verschaffen, ihren Wettbewerbern einen Schritt voraus zu sein.",
      },
    // index - strong culture paragraphs
    "Mutlu bir işyerinin, daha üretken çalışanlar anlamına geldiğini biliyoruz. Çalışanlarımıza, kendilerini; değerli, güvende ve rahat hissettikleri, gelişme fırsatlarıyla dolu bir çalışma ortamı sunuyoruz.":
      {
        en: "We know that a happy workplace means more productive employees. We provide our employees with a work environment full of growth opportunities where they feel valued, safe, and comfortable.",
        de: "Wir wissen, dass ein glücklicher Arbeitsplatz produktivere Mitarbeitende bedeutet. Wir bieten ein Arbeitsumfeld voller Entwicklungsmöglichkeiten, in dem sich unsere Mitarbeitenden wertgeschätzt, sicher und wohl fühlen.",
      },
    "Cesur, meraklı, tecrübeli ekibimiz ile yeniyi, hep daha iyiyi hedefliyor ve öğrendiklerimizi, beklentileri aşmak için kullanıyoruz.":
      {
        en: "With our bold, curious, and experienced team, we always aim for the new and the better, using what we learn to exceed expectations.",
        de: "Mit unserem mutigen, neugierigen und erfahrenen Team streben wir stets nach Neuem und Besserem und nutzen unsere Erkenntnisse, um Erwartungen zu übertreffen.",
      },
    "Sonuç odaklı bakış açımızla ürünlerimizi tecrübemizle birleştirip, iş ortaklarımıza kesintisiz ve üretken çözümlerle destek veriyoruz.":
      {
        en: "With our result‑oriented approach, we combine our products with our experience and support our partners with seamless and productive solutions.",
        de: "Mit unserem ergebnisorientierten Ansatz verbinden wir unsere Produkte mit unserer Erfahrung und unterstützen unsere Partner mit nahtlosen und produktiven Lösungen.",
      },
    "Yaratıcı ve çözüm odaklı yapımızla iş ortaklarımıza dünya standartlarında yazılımlara sahip olma deneyimi yaşatıyoruz.":
      {
        en: "With our creative and solution‑oriented structure, we enable our partners to experience world‑class software.",
        de: "Mit unserer kreativen und lösungsorientierten Ausrichtung ermöglichen wir unseren Partnern Software auf Weltklasseniveau.",
      },
    // projects page intro
    "Proto Yazılım ürünleri; mühendislerimizin özgün fikirleri ile kullanıcı deneyimleri dikkate alınarak oluşturulmuştur. Ürünlerimiz, güncel teknolojiye dayanan alt yapıları ile geliştirilmeye uygun olup; ürünlerimizin kurulumu, kullanımı ve işletilmeleri kolaydır.":
      {
        en: "Proto Yazılım products are created with our engineers’ original ideas and with user experience in mind. Built on modern technology, our products are easy to develop on, install, use, and operate.",
        de: "Proto Yazılım‑Produkte entstehen aus den originellen Ideen unserer Ingenieur:innen und mit Fokus auf das Nutzererlebnis. Auf moderner Technologie aufgebaut, sind sie leicht erweiterbar, zu installieren, zu nutzen und zu betreiben.",
      },
    // product cards brief
    "Galata İzleme Platformu, kurumunuzda bulunan tüm uygulamaların ürettiği log’ların ilgili sunuculardan toplanıp, merkezi bir log cluster’ında indekslenmesine ve bu log’ların gerçek zamanlı olarak analiz edilmesine olanak sağlar.":
      {
        en: "Galata Monitoring Platform collects logs from your applications, indexes them in a central log cluster, and enables real‑time analysis.",
        de: "Die Galata‑Überwachungsplattform sammelt Logs Ihrer Anwendungen, indexiert sie in einem zentralen Log‑Cluster und ermöglicht Echtzeitanalysen.",
      },
    "Lepton Framework, mobil ve web uygulamalarınızı aynı çatı altında kolaylıkla geliştirmenizi sağlayan bir üründür. Lepton komponentleri kullanılarak, projelerin mobil-web uygulamaları platform bağımsız ve ek maliyet olmadan eş zamanlı geliştirilebilir. Dokümantasyonu ve örnek projeleri ile hızlı başlangıçlara olanak sağlar.":
      {
        en: "Lepton Framework lets you easily build mobile and web apps under one roof. Using Lepton components, mobile and web apps can be developed simultaneously, platform‑independently, and without extra cost. Its documentation and sample projects enable fast starts.",
        de: "Mit dem Lepton Framework entwickeln Sie Mobile‑ und Web‑Apps einfach unter einem Dach. Mit Lepton‑Komponenten können Mobile‑ und Web‑Apps plattformunabhängig und ohne zusätzliche Kosten parallel entwickelt werden. Dokumentation und Beispielprojekte ermöglichen einen schnellen Einstieg.",
      },
    "Proton Mesaj Yönetim Platformu; kullanıcılarınıza göndereceğiniz milyonlarca e-posta, SMS ve anlık bildirimi tasarlayıp, hızlı ve sorunsuz iletebileceğiniz, kullanıcı-bildirim etkileşimlerini raporlayabileceğiniz, altyapınıza veya bulut hesabınıza kurabileceğiniz bir mesaj yönetim platformudur. Proton, toplu mesaj gönderme yeteneğinin yanında, sağladığı API’ler aracılığı ile gerçek zamanlı bildirim gönderme yeteneğine de sahiptir.":
      {
        en: "Proton Message Management Platform lets you design, send, and report millions of emails, SMS, and push notifications quickly and reliably. It can be deployed on your infrastructure or cloud account. Beyond bulk messaging, Proton provides APIs for real‑time notifications.",
        de: "Die Proton Nachrichten verwaltungs plattform ermöglicht das Entwerfen, Versenden und Auswerten von Millionen E‑Mails, SMS und Push‑Benachrichtigungen – schnell und zuverlässig. Deployments sind on‑premises oder in Ihrer Cloud möglich. Neben Massenversand bietet Proton APIs für Echtzeit‑Benachrichtigungen.",
      },
    // contact page heading variant
    "Mesaj gönderin veya arayın.": {
      en: "Send a message or call.",
      de: "Nachricht senden oder anrufen.",
    },
    // index - page 1 header
    "Yeniyi ve daha iyiyi hedefliyoruz": {
      en: "We aim for the new and the better",
      de: "Wir streben nach Neuem und Besserem",
    },
    // index - strong culture item titles
    "Deneyimli takım": {
      en: "Experienced team",
      de: "Erfahrenes Team",
    },
    "Müşteri desteği": {
      en: "Customer support",
      de: "Kundensupport",
    },
    "Müşteri odaklı çözümler": {
      en: "Customer‑centric solutions",
      de: "Kundenorientierte Lösungen",
    },
    // career page phrases
    "Her geçen gün büyüyen ekibimizde yerini almak ister misin? Hemen iletişime geç.":
      {
        en: "Would you like to join our ever‑growing team? Get in touch now.",
        de: "Möchtest du Teil unseres stetig wachsenden Teams werden? Melde dich jetzt.",
      },
    "Deneyimli ve dinamik organizasyonumuzda bizimle birlikte yer alacak Frontend Developer takım arkadaşı aramaktayız.":
      {
        en: "We are looking for a Frontend Developer teammate to join our experienced and dynamic organization.",
        de: "Wir suchen eine(n) Frontend‑Entwickler(in), die/der unser erfahrenes und dynamisches Team verstärkt.",
      },
    "Deneyimli ve dinamik organizasyonumuzda bizimle birlikte yer alacak Java Developer takım arkadaşı aramaktayız.":
      {
        en: "We are looking for a Java Developer teammate to join our experienced and dynamic organization.",
        de: "Wir suchen eine(n) Java‑Entwickler(in), die/der unser erfahrenes und dynamisches Team verstärkt.",
      },
    // about page content
    "Proto Yazılım; yazılım profesyonelleri tarafından kurulmuş bir teknoloji şirketi olup; yazılım geliştirme, danışmanlık, dijital çözümler ve sistem entegrasyonu konularında hizmet vermektedir. Çözüm odaklı yapısını koruyarak, katma değerli ürün ve hizmet üretmeyi hedef olarak benimseyen Proto Yazılım; iş ortaklarının ihtiyaçları doğrultusunda, yenilikçi ürünleri ile güncel teknolojiye uygun çözümler sunmaktadır.":
      {
        en: "Proto Yazılım is a technology company founded by software professionals; providing services in software development, consulting, digital solutions and system integration. Maintaining its solution-oriented structure, Proto Yazılım adopts producing value-added products and services as its goal; offering solutions suitable for current technology with innovative products in line with the needs of its business partners.",
        de: "Proto Yazılım ist ein Technologieunternehmen, das von Softwareprofis gegründet wurde und Dienstleistungen in den Bereichen Softwareentwicklung, Beratung, digitale Lösungen und Systemintegration anbietet. Proto Yazılım, der seine lösungsorientierte Struktur bewahrt, hat sich zum Ziel gesetzt, Mehrwertprodukte und -dienstleistungen zu produzieren; und bietet Lösungen, die der aktuellen Technologie entsprechen, mit innovativen Produkten entsprechend den Bedürfnissen seiner Geschäftspartner.",
      },
    // career page job requirements - Frontend
    "Üniversitelerin ilgili bölümlerinden mezun Javascript Framework'leri ile ilgili en az 2 yıllık deneyim sahibi Javascript, HTML, CSS ve SASS konularında bilgi sahibi Tercihen React bilgisine sahip, (NodeJS, AngularJS, ReactJS, VueJS, KnockoutJS vb.) Tercihen Native Mobile Javascript Framework'leri ile ilgili deneyim sahibi Javascript ortamına hakim, (Webpack, Bower, Npm, Grunt, ESLint, Node.js, Metro vb.) İyi seviyede İngilizce bilen Danışmanlık ekibimizde yer alarak müşteri yönetimine destek verebilecek İletişime açık, problem çözme becerisi gelişmiş, takım oyuncusu Sorumluluk alan ve kendisini sürekli geliştiren; araştırmacı Yeniliklere açık, öğrenmek ve öğretmek konusunda hevesli":
      {
        en: "Graduate from relevant university departments At least 2 years of experience with Javascript Frameworks Knowledge of Javascript, HTML, CSS and SASS Preferably experienced with React (NodeJS, AngularJS, ReactJS, VueJS, KnockoutJS, etc.) Preferably experienced with Native Mobile Javascript Frameworks Proficient in Javascript environment (Webpack, Bower, Npm, Grunt, ESLint, Node.js, Metro, etc.) Good level of English Be able to support customer management by taking part in our consulting team Open to communication, strong problem solving skills, team player Takes responsibility and continuously improves oneself; researcher Open to innovation, eager to learn and teach",
        de: "Abschluss relevanter Universitätsfakultäten Mindestens 2 Jahre Erfahrung mit Javascript‑Frameworks Kenntnisse in Javascript, HTML, CSS und SASS Vorzugsweise Erfahrung mit React (NodeJS, AngularJS, ReactJS, VueJS, KnockoutJS usw.) Vorzugsweise Erfahrung mit Native Mobile Javascript Frameworks Vertraut mit der Javascript‑Umgebung (Webpack, Bower, Npm, Grunt, ESLint, Node.js, Metro usw.) Gute Englischkenntnisse In der Lage, die Kundenverwaltung durch Teilnahme an unserem Beratungsteam zu unterstützen Kommunikativ, ausgeprägte Problemlösungsfähigkeit, Teamplayer Übernimmt Verantwortung und entwickelt sich kontinuierlich weiter; forschend Offen für Innovation, lernbegierig und lehrfreudig",
      },
    // career page job requirements - Backend
    "Üniversitelerin ilgili bölümlerinden mezun Tercihen master derecesine sahip Konusunda en az 3 yıllık deneyime sahibi Java ve Spring Framework teknolojilerine hakim OOP, Design Pattern'ler, Test Driven Development ve Unit Test konularına hakim RDBMS ve NoSql konularında deneyimli CI/CD konularında deneyimli Tercihen Cloud teknolojileri ile çalışmış Agile metodolojileri ileilgili deneyimli İyi seviyede İngilizce bilen Danışmanlık ekibimizde yer alarak müşteri yönetimine destek verebilecek İletişime açık, problem çözme becerisi gelişmiş, takım oyuncusu Sorumluluk alan ve kendisini sürekli geliştiren; araştırmacı Yeniliklere açık, öğrenmek ve öğretmek konusunda hevesli":
      {
        en: "Graduate from relevant university departments Preferably holding a master's degree At least 3 years of experience in the field Proficient in Java and Spring Framework technologies Knowledgeable in OOP, Design Patterns, Test Driven Development and Unit Testing Experienced in RDBMS and NoSQL Experienced in CI/CD Preferably worked with Cloud technologies Experienced with Agile methodologies Good level of English Be able to support customer management by taking part in our consulting team Open to communication, strong problem solving skills, team player Takes responsibility and continuously improves oneself; researcher Open to innovation, eager to learn and teach",
        de: "Abschluss relevanter Universitätsfakultäten Vorzugsweise Master‑Abschluss Mindestens 3 Jahre Erfahrung im Bereich Versiert in Java‑ und Spring‑Framework‑Technologien Kenntnisse in OOP, Design Patterns, Test Driven Development und Unit Testing Erfahren in RDBMS und NoSQL Erfahren in CI/CD Vorzugsweise Erfahrung mit Cloud‑Technologien Erfahren mit agilen Methoden Gute Englischkenntnisse In der Lage, die Kundenverwaltung durch Teilnahme an unserem Beratungsteam zu unterstützen Kommunikativ, ausgeprägte Problemlösungsfähigkeit, Teamplayer Übernimmt Verantwortung und entwickelt sich kontinuierlich weiter; forschend Offen für Innovation, lernbegierig und lehrfreudig",
      },
  };

  function translateByPhrase() {
    var lang = currentLang();
    if (lang === "tr") return; // no-op for Turkish
    var dict = window.__I18N_PHRASES__ || {};
    // Walk text nodes inside main content areas
    var root = document.getElementById("swup") || document.body;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue) return NodeFilter.FILTER_REJECT;
        var t = n.nodeValue.replace(/\s+/g, " ").trim();
        if (!t) return NodeFilter.FILTER_REJECT;
        // only consider reasonably long texts to avoid changing tiny labels handled elsewhere
        if (t.length < 3) return NodeFilter.FILTER_REJECT;
        return dict[t] ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
    var node;
    var changed = 0;
    while ((node = walker.nextNode())) {
      var originalRaw = node.nodeValue;
      var originalNorm = originalRaw.replace(/\s+/g, " ").trim();
      var trans = dict[originalNorm] && dict[originalNorm][lang];
      if (trans) {
        // preserve surrounding whitespace of the text node
        var leading = originalRaw.match(/^\s*/)[0];
        var trailing = originalRaw.match(/\s*$/)[0];
        node.nodeValue = leading + trans + trailing;
        changed++;
      }
    }
    // Also adjust some exact heading/label elements whose innerText equals a known key
    Object.keys(dict).forEach(function (k) {
      var all = document.querySelectorAll("*");
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        if (el.children && el.children.length) continue;
        var txt = (el.innerText || "").replace(/\s+/g, " ").trim();
        if (txt === k) {
          el.innerText = dict[k][lang];
        }
      }
    });
  }

  // Explicit bindings for index.html to use global variables for all static texts
  function bindIndex() {
    try {
      var lang = currentLang();
      // Page 1 header
      var p1h = document.querySelector(".page-1 h2");
      if (p1h) p1h.textContent = tText("Yeniyi ve daha iyiyi hedefliyoruz");

      // Service titles - What we do section
      var serviceTitles = document.querySelectorAll(".page-2 h4");
      serviceTitles.forEach(function (h4) {
        var titleText = h4.textContent.trim();
        if (titleText === "Yazılım geliştirme") {
          h4.textContent = tText("software_dev");
        } else if (titleText === "Danışmanlık") {
          h4.textContent = tText("consulting");
        } else if (titleText === "Büyük Veri") {
          h4.textContent = tText("big_data");
        } else if (titleText === "Dijital çözümler") {
          h4.textContent = tText("digital_solutions");
        }
      });

      // Strong culture main title
      var strongCultureTitle = document.querySelector(".page-4 h2");
      if (strongCultureTitle)
        strongCultureTitle.textContent = tText("strong_culture");

      // Strong culture main paragraph
      var strongCulturePara = document.querySelector(
        ".page-4 .col-lg-4.col-md-12 p"
      );
      if (strongCulturePara) {
        strongCulturePara.textContent = tText(
          "Mutlu bir işyerinin, daha üretken çalışanlar anlamına geldiğini biliyoruz. Çalışanlarımıza, kendilerini; değerli, güvende ve rahat hissettikleri, gelişme fırsatlarıyla dolu bir çalışma ortamı sunuyoruz."
        );
      }

      // Strong culture block titles and subtitles
      var centerItem = document.querySelector(".page-4 .center-context.item");
      if (centerItem) {
        var h4 = centerItem.querySelector("h4");
        var p = centerItem.querySelector("p.subtitle");
        if (h4) h4.textContent = tText("Deneyimli takım");
        if (p)
          p.textContent = tText(
            "Cesur, meraklı, tecrübeli ekibimiz ile yeniyi, hep daha iyiyi hedefliyor ve öğrendiklerimizi, beklentileri aşmak için kullanıyoruz."
          );
      }
      var supportItem = document.querySelectorAll(".page-4 .item")[1];
      if (supportItem) {
        var h4s = supportItem.querySelector("h4");
        var ps = supportItem.querySelector("p.subtitle");
        if (h4s) h4s.textContent = tText("Müşteri desteği");
        if (ps)
          ps.textContent = tText(
            "Sonuç odaklı bakış açımızla ürünlerimizi tecrübemizle birleştirip, iş ortaklarımıza kesintisiz ve üretken çözümlerle destek veriyoruz."
          );
      }
      var customerItem = document.querySelectorAll(".page-4 .item")[2];
      if (customerItem) {
        var h4c = customerItem.querySelector("h4");
        var pc = customerItem.querySelector("p.subtitle");
        if (h4c) h4c.textContent = tText("Müşteri odaklı çözümler");
        if (pc)
          pc.textContent = tText(
            "Yaratıcı ve çözüm odaklı yapımızla iş ortaklarımıza dünya standartlarında yazılımlara sahip olma deneyimi yaşatıyoruz."
          );
      }
    } catch (e) {}
  }

  // Explicit bindings for about.html
  function bindAbout() {
    try {
      var lang = currentLang();

      // About page main title
      var aboutTitle = document.querySelector(".about-container h1");
      if (aboutTitle) aboutTitle.textContent = tText("about_title");

      // About page main content
      var aboutContent = document.querySelector(".about-container .content");
      if (aboutContent) {
        aboutContent.textContent = tText(
          "Proto Yazılım; yazılım profesyonelleri tarafından kurulmuş bir teknoloji şirketi olup; yazılım geliştirme, danışmanlık, dijital çözümler ve sistem entegrasyonu konularında hizmet vermektedir. Çözüm odaklı yapısını koruyarak, katma değerli ürün ve hizmet üretmeyi hedef olarak benimseyen Proto Yazılım; iş ortaklarının ihtiyaçları doğrultusunda, yenilikçi ürünleri ile güncel teknolojiye uygun çözümler sunmaktadır."
        );
      }
    } catch (e) {}
  }

  // Explicit bindings for career.html
  function bindCareer() {
    try {
      var lang = currentLang();

      // Only run if we're on the career page
      if (!document.querySelector("#career-page")) return;

      // Career page main title
      var careerTitle = document.querySelector("#career-page h1");
      if (careerTitle) careerTitle.textContent = tText("career_title");

      // Career page main phrase
      var careerPhrase = document.querySelector("#career-page .phrase");
      if (careerPhrase) {
        careerPhrase.textContent = tText(
          "Her geçen gün büyüyen ekibimizde yerini almak ister misin? Hemen iletişime geç."
        );
      }

      // CV Send buttons
      var cvButtons = document.querySelectorAll(".cv-button a");
      cvButtons.forEach(function (btn) {
        var btnText = btn.textContent.trim();
        if (
          btnText === "CV Gönder" ||
          btnText === "Send CV" ||
          btnText === "Lebenslauf senden"
        ) {
          btn.textContent = tText("cv_send");
        }
      });

      // Detail toggle buttons - translate the initial "Detay" text
      var detailButtons = document.querySelectorAll(".detail-button span");
      detailButtons.forEach(function (span) {
        var spanText = span.textContent.trim();
        if (
          spanText === "Detay" ||
          spanText === "Detail" ||
          spanText === "Details"
        ) {
          span.textContent = tText("detail");
        } else if (
          spanText === "Detay Gizle" ||
          spanText === "Hide detail" ||
          spanText === "Details ausblenden"
        ) {
          span.textContent = tText("detail_hide");
        }
      });

      // Job details - Frontend
      var frontendDetails = document.querySelector("#detail-01 .detail");
      if (frontendDetails) {
        // For English
        if (lang === "en") {
          var lines = [
            "Graduate from relevant university departments",
            "At least 2 years of experience with Javascript Frameworks",
            "Knowledge of Javascript, HTML, CSS and SASS",
            "Preferably experienced with React (NodeJS, AngularJS, ReactJS, VueJS, KnockoutJS, etc.)",
            "Preferably experienced with Native Mobile Javascript Frameworks",
            "Proficient in Javascript environment (Webpack, Bower, Npm, Grunt, ESLint, Node.js, Metro, etc.)",
            "Good level of English",
            "Be able to support customer management by taking part in our consulting team",
            "Open to communication, strong problem solving skills, team player",
            "Takes responsibility and continuously improves oneself; researcher",
            "Open to innovation, eager to learn and teach",
          ];
          frontendDetails.innerHTML = lines.join(" <br />");
        }
        // For German
        else if (lang === "de") {
          var linesDE = [
            "Abschluss relevanter Universitätsfakultäten",
            "Mindestens 2 Jahre Erfahrung mit Javascript‑Frameworks",
            "Kenntnisse in Javascript, HTML, CSS und SASS",
            "Vorzugsweise Erfahrung mit React (NodeJS, AngularJS, ReactJS, VueJS, KnockoutJS usw.)",
            "Vorzugsweise Erfahrung mit Native Mobile Javascript Frameworks",
            "Vertraut mit der Javascript‑Umgebung (Webpack, Bower, Npm, Grunt, ESLint, Node.js, Metro usw.)",
            "Gute Englischkenntnisse",
            "In der Lage, die Kundenverwaltung durch Teilnahme an unserem Beratungsteam zu unterstützen",
            "Kommunikativ, ausgeprägte Problemlösungsfähigkeit, Teamplayer",
            "Übernimmt Verantwortung und entwickelt sich kontinuierlich weiter; forschend",
            "Offen für Innovation, lernbegierig und lehrfreudig",
          ];
          frontendDetails.innerHTML = linesDE.join(" <br />");
        }
      }

      // Job details - Backend
      var backendDetails = document.querySelector("#detail-02 .detail");
      if (backendDetails) {
        // For English
        if (lang === "en") {
          var linesEN2 = [
            "Graduate from relevant university departments",
            "Preferably holding a master's degree",
            "At least 3 years of experience in the field",
            "Proficient in Java and Spring Framework technologies",
            "Knowledgeable in OOP, Design Patterns, Test Driven Development and Unit Testing",
            "Experienced in RDBMS and NoSQL",
            "Experienced in CI/CD",
            "Preferably worked with Cloud technologies",
            "Experienced with Agile methodologies",
            "Good level of English",
            "Be able to support customer management by taking part in our consulting team",
            "Open to communication, strong problem solving skills, team player",
            "Takes responsibility and continuously improves oneself; researcher",
            "Open to innovation, eager to learn and teach",
          ];
          backendDetails.innerHTML = linesEN2.join(" <br />");
        }
        // For German
        else if (lang === "de") {
          var linesDE2 = [
            "Abschluss relevanter Universitätsfakultäten",
            "Vorzugsweise Master‑Abschluss",
            "Mindestens 3 Jahre Erfahrung im Bereich",
            "Versiert in Java‑ und Spring‑Framework‑Technologien",
            "Kenntnisse in OOP, Design Patterns, Test Driven Development und Unit Testing",
            "Erfahren in RDBMS und NoSQL",
            "Erfahren in CI/CD",
            "Vorzugsweise Erfahrung mit Cloud‑Technologien",
            "Erfahren mit agilen Methoden",
            "Gute Englischkenntnisse",
            "In der Lage, die Kundenverwaltung durch Teilnahme an unserem Beratungsteam zu unterstützen",
            "Kommunikativ, ausgeprägte Problemlösungsfähigkeit, Teamplayer",
            "Übernimmt Verantwortung und entwickelt sich kontinuierlich weiter; forschend",
            "Offen für Innovation, lernbegierig und lehrfreudig",
          ];
          backendDetails.innerHTML = linesDE2.join(" <br />");
        }
      }
    } catch (e) {}
  }

  // Explicit bindings for galata.html and other product pages
  function bindProductPages() {
    try {
      var lang = currentLang();
      if (lang === "tr") return;

      // Check if we're on a product detail page
      var isProductPage = document.querySelector(".project-pages");
      if (!isProductPage) return;

      // All product pages translations (Galata, Lepton, Proton)
      var productTranslations = {
        "Kolay kurulum": {
          en: "Easy Installation",
          de: "Einfache Installation",
        },
        "Galata İzleme Platformu, log'ların ilgili sistemlerden toplanması esnasında uygulama sunucusu kaynaklarını minimum seviyede kullanacak şekilde ayarlanmış 'agent' teknolojilerini kullanır. Uygulama log'ları, merkezi bir Elasticsearch cluster'ına indekslenir. Platform ile sağlanan kurulum betikleri (script) aracılığı ile kurum gereksinimlerine uygun optimize edilmiş Elasticsearch cluster tamamen otomatik olarak kendi sunucularınızdan oluşan altyapınıza veya bulut hesabınıza (AWS veya GCP) dakikalar içinde kurulur ve kullanıma hazır hale gelir.":
          {
            en: "Galata Monitoring Platform uses 'agent' technologies configured to use minimal application server resources when collecting logs from relevant systems. Application logs are indexed in a central Elasticsearch cluster. Through installation scripts provided with the platform, an optimized Elasticsearch cluster suitable for your organization's requirements is automatically installed on your own infrastructure or cloud account (AWS or GCP) within minutes and becomes ready to use.",
            de: "Die Galata-Überwachungsplattform verwendet 'Agent'-Technologien, die so konfiguriert sind, dass sie beim Sammeln von Logs aus relevanten Systemen minimale Anwendungsserver-Ressourcen verwenden. Anwendungslogs werden in einem zentralen Elasticsearch-Cluster indexiert. Über die mit der Plattform bereitgestellten Installationsskripte wird ein optimierter Elasticsearch-Cluster, der den Anforderungen Ihrer Organisation entspricht, automatisch innerhalb weniger Minuten auf Ihrer eigenen Infrastruktur oder Ihrem Cloud-Konto (AWS oder GCP) installiert und ist einsatzbereit.",
          },
        "Rol Tabanlı Kullanıcı Yönetimi": {
          en: "Role-Based User Management",
          de: "Rollenbasierte Benutzerverwaltung",
        },
        "Galata İzleme Platformu ile Elasticsearch üzerinde oluşturulacak indekslere hangi kullanıcıların hangi yetkilerle erişebileceği kolaylıkla tanımlanmakta, yeni kullanıcı tanımlama ve bunların rol atamaları yetkili kullanıcı tarafından yapılmaktadır.":
          {
            en: "With Galata Monitoring Platform, it is easy to define which users can access indexes to be created on Elasticsearch with what permissions, and new user definitions and their role assignments are made by authorized users.",
            de: "Mit der Galata-Überwachungsplattform lässt sich einfach definieren, welche Benutzer mit welchen Berechtigungen auf in Elasticsearch zu erstellende Indizes zugreifen können, und neue Benutzerdefinitionen sowie deren Rollenzuweisungen werden von autorisierten Benutzern vorgenommen.",
          },
        "Legacy uygulamalar": {
          en: "Legacy Applications",
          de: "Legacy-Anwendungen",
        },
        "Galata İzleme Platformu, legacy uygulamaların mevcut işleyişlerini hiçbir şekilde değiştirmeden, üretilen kayıtların zaman, seviye ve mesaj içeriklerinin json formatına dönüştürülmesine olanak sağlamaktadır.":
          {
            en: "Galata Monitoring Platform enables the conversion of time, level, and message contents of generated records to JSON format without changing the existing operations of legacy applications in any way.",
            de: "Die Galata-Überwachungsplattform ermöglicht die Konvertierung von Zeit-, Level- und Nachrichteninhalten der generierten Datensätze in das JSON-Format, ohne den bestehenden Betrieb von Legacy-Anwendungen in irgendeiner Weise zu ändern.",
          },
        "Orkestrasyon Desteği": {
          en: "Orchestration Support",
          de: "Orchestrierungsunterstützung",
        },
        "Galata İzleme Platformu, isterseniz mevcut K8s cluster'ınıza, isterseniz kendi kurulumuyla provize edilebilen Docker Swarm cluster'ına otomatik kurulabilmektedir.":
          {
            en: "Galata Monitoring Platform can be automatically installed on your existing K8s cluster or on a Docker Swarm cluster that can be provisioned with its own installation.",
            de: "Die Galata-Überwachungsplattform kann automatisch auf Ihrem bestehenden K8s-Cluster oder auf einem Docker-Swarm-Cluster installiert werden, der mit seiner eigenen Installation bereitgestellt werden kann.",
          },
        Analiz: {
          en: "Analysis",
          de: "Analyse",
        },
        "Galata İzleme Platformu ile beraber kurulan Kibana uygulaması sayesinde gerçek zamanlı hata ayıklama ve olay bazlı grafiklerin çıkartılıp, bunların analizlerinin yapılması da mümkün kılınmaktadır.":
          {
            en: "Thanks to the Kibana application installed with Galata Monitoring Platform, it is possible to perform real-time debugging and extract event-based graphs and analyze them.",
            de: "Dank der mit der Galata-Überwachungsplattform installierten Kibana-Anwendung ist es möglich, Echtzeit-Debugging durchzuführen und ereignisbasierte Grafiken zu extrahieren und zu analysieren.",
          },
        "Log yapısı": {
          en: "Log Structure",
          de: "Log-Struktur",
        },
        "Galata İzleme Platformu, bütün log'ları json formatında tutar. Her kayda ait zaman bilgisi, log seviyesi, mesaj içeriği vb. Elasticsearch üzerinde ayrı ayrı alanlarda indekslenir. Böylelikle büyük mesaj içeriklerinde tam metin araması yapmak yerine, zaman veya seviye bilgisiyle indekslenen bu alanlar özelinde sorgu yapmak mümkün olmaktadır.":
          {
            en: "Galata Monitoring Platform stores all logs in JSON format. Time information, log level, message content, etc. for each record are indexed in separate fields on Elasticsearch. Thus, instead of doing full-text search in large message contents, it is possible to query specifically in these fields indexed by time or level information.",
            de: "Die Galata-Überwachungsplattform speichert alle Logs im JSON-Format. Zeitinformationen, Log-Level, Nachrichteninhalte usw. für jeden Datensatz werden in separaten Feldern auf Elasticsearch indexiert. Somit ist es möglich, anstelle einer Volltextsuche in großen Nachrichteninhalten gezielt in diesen nach Zeit- oder Level-Informationen indexierten Feldern zu suchen.",
          },

        // Lepton Framework translations
        Temalandırma: {
          en: "Theming",
          de: "Thematisierung",
        },
        "Lepton Framework, mobil ve web uygulamaları için oluşturulan temayı, her iki platform için de ayrı efor sarf etmeden kullanabilmenize olanak sağlar. Projelerin ve komponentlerin görünümlerinin hızlıca değiştirilmesinde esnek bir yapı sunar.":
          {
            en: "Lepton Framework allows you to use the theme created for mobile and web applications without spending separate effort for both platforms. It offers a flexible structure for quickly changing the appearance of projects and components.",
            de: "Das Lepton Framework ermöglicht es Ihnen, das für mobile und Webanwendungen erstellte Theme ohne separaten Aufwand für beide Plattformen zu verwenden. Es bietet eine flexible Struktur für die schnelle Änderung des Erscheinungsbilds von Projekten und Komponenten.",
          },
        Stillendirme: {
          en: "Styling",
          de: "Stilisierung",
        },
        "Lepton Framework, oluşturulan tema dışında, hem web hem de mobil platformu üzerinde herhangi bir komponentin özel olarak görünümünün kolaylıkla değiştirilmesine olanak sağlar. Değişen dizayn kararlarına hızlı adapte olmayı mümkün kılar.":
          {
            en: "Apart from the created theme, Lepton Framework allows you to easily change the appearance of any component on both web and mobile platforms. It enables quick adaptation to changing design decisions.",
            de: "Neben dem erstellten Theme ermöglicht das Lepton Framework die einfache Änderung des Erscheinungsbilds beliebiger Komponenten sowohl auf Web- als auch auf mobilen Plattformen. Es ermöglicht eine schnelle Anpassung an sich ändernde Design-Entscheidungen.",
          },
        "Global State Yönetimi": {
          en: "Global State Management",
          de: "Globale Zustandsverwaltung",
        },
        "Lepton Framework; global state yönetiminde, ağaç yapısı ile sizleri sistem karmaşasından kurtarır. Böylelikle, büyük projelerdeki global state yönetimini kolaylıkla yapmanızı sağlar.":
          {
            en: "Lepton Framework saves you from system complexity in global state management with its tree structure. Thus, it enables you to easily manage global state in large projects.",
            de: "Das Lepton Framework befreit Sie mit seiner Baumstruktur von der Systemkomplexität bei der globalen Zustandsverwaltung. Somit ermöglicht es Ihnen, den globalen Zustand in großen Projekten einfach zu verwalten.",
          },
        "Şablon Desteği": {
          en: "Template Support",
          de: "Vorlagenunterstützung",
        },
        "Lepton Framework; projenizin kapsamına göre, önceden hazırlanan (e-ticaret, bankacılık, sağlık vb.) şablonlar ile projelerin daha önemli gereksinimlerine vakit ayırabilmenizi sağlar. Hazır konfigürasyonlar ile proje başlangıç maliyetlerinizi minimuma indirir. Kapsama göre hazırlanan örnekler ile hızlı adaptasyon sağlar.":
          {
            en: "Lepton Framework allows you to focus on more important requirements of projects with pre-prepared templates (e-commerce, banking, healthcare, etc.) according to the scope of your project. It minimizes your project startup costs with ready-made configurations. It provides quick adaptation with examples prepared according to scope.",
            de: "Das Lepton Framework ermöglicht es Ihnen, sich mit vorbereiteten Vorlagen (E-Commerce, Banking, Gesundheitswesen usw.) entsprechend dem Umfang Ihres Projekts auf wichtigere Anforderungen der Projekte zu konzentrieren. Es minimiert Ihre Projektstartkosten mit vorgefertigten Konfigurationen. Es bietet schnelle Anpassung mit nach Umfang vorbereiteten Beispielen.",
          },
        "Proje İskeleti": {
          en: "Project Scaffolding",
          de: "Projektgerüst",
        },
        "Lepton Framework, projenize uygun olarak kullanmak istediğiniz proje şablonunu tek komut satırı ile oluşturmaya olanak sağlar. Kod yazım standartları ile projenizin takım halinde uyumlu ve kaliteli çalışılmasını mümkün kılar.":
          {
            en: "Lepton Framework allows you to create the project template you want to use for your project with a single command line. It enables your project to work harmoniously and with quality as a team with code writing standards.",
            de: "Das Lepton Framework ermöglicht es Ihnen, die Projektvorlage, die Sie für Ihr Projekt verwenden möchten, mit einer einzigen Befehlszeile zu erstellen. Es ermöglicht Ihrem Projekt, harmonisch und qualitativ hochwertig als Team mit Codeschreibstandards zu arbeiten.",
          },

        // Proton Message Management Platform translations
        "Proton Mesaj Yönetim Platformu, milyonlarca mesajın sorunsuz ve hızlı işlenebilmesi amacıyla Apache Kafka kullanır. Platformda sağlanan kurulum betikleri (script) aracılığı ile canlı sistem kalitesinde, uygulama gereksinimlerine uygun optimize edilmiş Kafka cluster, tamamen otomatik olarak kendi sunucularınızdan oluşan altyapınıza veya bulut hesabınıza (AWS veya GCP) dakikalar içinde kurulur ve kullanıma hazır hale gelir.":
          {
            en: "Proton Message Management Platform uses Apache Kafka for seamless and fast processing of millions of messages. Through installation scripts provided on the platform, a production-quality Kafka cluster optimized according to application requirements is automatically installed on your own infrastructure or cloud account (AWS or GCP) within minutes and becomes ready to use.",
            de: "Die Proton-Nachrichtenverwaltungsplattform verwendet Apache Kafka für die nahtlose und schnelle Verarbeitung von Millionen von Nachrichten. Über die auf der Plattform bereitgestellten Installationsskripte wird ein produktionsreifer Kafka-Cluster, der entsprechend den Anwendungsanforderungen optimiert ist, automatisch innerhalb weniger Minuten auf Ihrer eigenen Infrastruktur oder Ihrem Cloud-Konto (AWS oder GCP) installiert und ist einsatzbereit.",
          },
        "Proton Designer": {
          en: "Proton Designer",
          de: "Proton Designer",
        },
        "Proton Mesaj Yönetim Platformu'nda, Proton Designer ile bildirim gönderilecek hedef kitlenin verilerini; sisteme, önceden oluşturulan formatlar aracılığıyla yükleyebilir, bildirim mesajlarını şablon olarak tasarlayıp ileri tarihli toplu dağıtımları internet tarayıcınızdan kolaylıkla planlayabilirsiniz. Gerçekleşmiş bütün dağıtımların istatistiklerini (başarılı ve başarısız gönderimler, kullanıcılar tarafından okunmuş bildirim sayıları gibi) Proton Designer üzerinden raporlayabilirsiniz.":
          {
            en: "In Proton Message Management Platform, with Proton Designer you can upload target audience data for notifications to the system through pre-created formats, design notification messages as templates and easily schedule future bulk distributions from your web browser. You can report statistics of all completed distributions (such as successful and failed sends, number of notifications read by users) through Proton Designer.",
            de: "In der Proton-Nachrichtenverwaltungsplattform können Sie mit Proton Designer Zielgruppendaten für Benachrichtigungen über vorab erstellte Formate in das System hochladen, Benachrichtigungsnachrichten als Vorlagen entwerfen und zukünftige Massenverteilungen einfach über Ihren Webbrowser planen. Sie können Statistiken aller abgeschlossenen Verteilungen (wie erfolgreiche und fehlgeschlagene Sendungen, Anzahl der von Benutzern gelesenen Benachrichtigungen) über Proton Designer berichten.",
          },
        "Kampanya Yönetimi": {
          en: "Campaign Management",
          de: "Kampagnenverwaltung",
        },
        "Proton Mesaj Yönetim Platformu, sisteme yüklenen kullanıcı verisinde yer alan değerlere göre, filtreler kurgulamanıza ve veri setinizi değiştirmeden ihtiyaçlarınıza özel kampanyalar oluşturmanıza olanak sağlar. Örneğin, Proton Designer üzerinden; belirli bir yaş grubuna, belirli bir konumdaki kullanıcılara veya kendi belirleyeceğiniz değişken değerlere uyan kullanıcılara bildirim gönderebilirsiniz.":
          {
            en: "Proton Message Management Platform allows you to set up filters according to values in the user data uploaded to the system and create campaigns specific to your needs without changing your data set. For example, through Proton Designer, you can send notifications to a specific age group, users in a specific location, or users matching variable values you define.",
            de: "Die Proton-Nachrichtenverwaltungsplattform ermöglicht es Ihnen, Filter entsprechend den Werten in den in das System hochgeladenen Benutzerdaten einzurichten und Kampagnen zu erstellen, die auf Ihre Bedürfnisse zugeschnitten sind, ohne Ihren Datensatz zu ändern. Beispielsweise können Sie über Proton Designer Benachrichtigungen an eine bestimmte Altersgruppe, Benutzer an einem bestimmten Ort oder Benutzer senden, die mit von Ihnen definierten variablen Werten übereinstimmen.",
          },
        "Kişiselleştirilmiş Bildirimler": {
          en: "Personalized Notifications",
          de: "Personalisierte Benachrichtigungen",
        },
        "Proton Mesaj Yönetim Platformu'na yüklediğiniz verilere e-posta, SMS veya anlık bildirim şablonlarından erişebilir, içeriğinde yer alan veriler ile kullanıcılarınıza özel bildirimler hazırlayabilirsiniz.":
          {
            en: "You can access the data you upload to Proton Message Management Platform from email, SMS or instant notification templates, and prepare personalized notifications for your users with the data contained in them.",
            de: "Sie können auf die Daten, die Sie auf die Proton-Nachrichtenverwaltungsplattform hochladen, von E-Mail-, SMS- oder Sofortbenachrichtigungsvorlagen aus zugreifen und mit den darin enthaltenen Daten personalisierte Benachrichtigungen für Ihre Benutzer erstellen.",
          },
        "Proton Mesaj Yönetim Platformu, isterseniz mevcut K8s cluster'ınıza, isterseniz kendi kurulumuyla provize edilebilen Docker Swarm cluster'ına otomatik kurulabilmektedir. Proton, mikroservis mimarisine uygun tasarlanmıştır.":
          {
            en: "Proton Message Management Platform can be automatically installed on your existing K8s cluster or on a Docker Swarm cluster that can be provisioned with its own installation. Proton is designed according to microservice architecture.",
            de: "Die Proton-Nachrichtenverwaltungsplattform kann automatisch auf Ihrem bestehenden K8s-Cluster oder auf einem Docker-Swarm-Cluster installiert werden, der mit seiner eigenen Installation bereitgestellt werden kann. Proton ist gemäß Microservice-Architektur konzipiert.",
          },
        Entegrasyonlar: {
          en: "Integrations",
          de: "Integrationen",
        },
        "Proton Mesaj Yönetim Platformu, e-posta gönderimleriniz için SMTP, SMS gönderimleriniz için Twilio, anlık bildirim gönderimleriniz için APNS ve Firebase Cloud Messaging desteği sağlamaktadır. Ayrıca Proton, kuruma özel entegrasyonların yapılmasına da olanak vermektedir.":
          {
            en: "Proton Message Management Platform provides SMTP support for your email sending, Twilio for your SMS sending, APNS and Firebase Cloud Messaging support for your instant notification sending. In addition, Proton allows for organization-specific integrations.",
            de: "Die Proton-Nachrichtenverwaltungsplattform bietet SMTP-Unterstützung für Ihr E-Mail-Versenden, Twilio für Ihr SMS-Versenden, APNS- und Firebase Cloud Messaging-Unterstützung für Ihr Sofortbenachrichtigungs-Versenden. Darüber hinaus ermöglicht Proton organisationsspezifische Integrationen.",
          },
      };

      // Helper function to normalize text for comparison
      function normalizeText(text) {
        return text
          .replace(/\s+/g, " ") // Normalize whitespace
          .trim()
          .replace(/[\u2018\u2019]/g, "'") // Replace curly quotes with straight quotes
          .replace(/[\u201C\u201D]/g, '"'); // Replace curly double quotes
      }

      // Create a normalized lookup map for faster matching
      var normalizedTranslations = {};
      Object.keys(productTranslations).forEach(function (key) {
        var normalized = normalizeText(key);
        normalizedTranslations[normalized] = productTranslations[key];
      });

      // Translate all h1 titles and p content in project-info-card
      document.querySelectorAll(".project-info-card h1").forEach(function (el) {
        var text = el.textContent.trim();
        var normalized = normalizeText(text);
        if (
          normalizedTranslations[normalized] &&
          normalizedTranslations[normalized][lang]
        ) {
          el.textContent = normalizedTranslations[normalized][lang];
        }
      });

      document.querySelectorAll(".project-info-card p").forEach(function (el) {
        var text = el.textContent.replace(/\s+/g, " ").trim();
        var normalized = normalizeText(text);
        if (
          normalizedTranslations[normalized] &&
          normalizedTranslations[normalized][lang]
        ) {
          el.textContent = normalizedTranslations[normalized][lang];
        }
      });
    } catch (e) {
      console.error("Product page translation error:", e);
    }
  }

  function applyTranslations() {
    ensureLangSelector();
    translateCommon();
    translateSpecificContent();
    translateMailto();
    translateByPhrase();
    bindIndex();
    bindAbout();
    bindCareer();
    bindProductPages();
  }

  // Collect all static texts into a global bucket for easy translation authoring
  function collectStaticTexts() {
    try {
      var root = document.getElementById("swup") || document.body;
      var skipTags = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 }; // skip these
      var missing = window.__I18N_MISSING__ || {};
      var phrases = window.__I18N_PHRASES__ || {};
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          if (!n.nodeValue) return NodeFilter.FILTER_REJECT;
          if (n.parentElement && skipTags[n.parentElement.tagName])
            return NodeFilter.FILTER_REJECT;
          // skip anchors that are emails/phones
          if (
            n.parentElement &&
            n.parentElement.tagName === "A" &&
            (n.parentElement.getAttribute("href") || "").match(
              /^(mailto:|tel:)/
            )
          )
            return NodeFilter.FILTER_REJECT;
          // skip address blocks
          if (n.parentElement && n.parentElement.tagName === "ADDRESS")
            return NodeFilter.FILTER_REJECT;
          var t = n.nodeValue.replace(/\s+/g, " ").trim();
          if (!t) return NodeFilter.FILTER_REJECT;
          // exclude tiny tokens and obvious UI already handled
          if (t.length < 3) return NodeFilter.FILTER_REJECT;
          // don't collect if already registered in phrases
          return phrases[t] ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
        },
      });
      var node;
      var count = 0;
      while ((node = walker.nextNode())) {
        var t = node.nodeValue.replace(/\s+/g, " ").trim();
        if (!missing[t]) missing[t] = { en: "", de: "" };
        count++;
      }
      window.__I18N_MISSING__ = missing;
      // Optional: expose a combined view
      window.__I18N_ALL_TEXTS__ = Object.assign({}, phrases, missing);
    } catch (e) {}
  }

  // Run collector too (does not mutate DOM)
  document.addEventListener("DOMContentLoaded", function () {
    collectStaticTexts();
  });
  document.addEventListener("swup:contentReplaced", function () {
    collectStaticTexts();
  });

  // If DOM is already loaded, run collector immediately
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    collectStaticTexts();
  }

  // Run now and after swup replaces content
  document.addEventListener("DOMContentLoaded", function () {
    applyTranslations();
  });
  document.addEventListener("swup:contentReplaced", function () {
    applyTranslations();
  });

  // If DOM is already loaded (script is deferred), run immediately
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    applyTranslations();
  }

  // Define toggle function for career page
  window.toggle = function (src, target) {
    try {
      var element = document.getElementById(src);
      if (!element) return;

      var detailOpen = window.__I18N_TOGGLE_OPEN__ || "Detay";
      var detailClose = window.__I18N_TOGGLE_CLOSE__ || "Detay Gizle";

      // Close other open details
      for (var i = 1; i <= 2; i++) {
        var elemId = "show-detail-" + i;
        var elem = document.getElementById(elemId);
        if (!elem) continue;
        var currentText = elem.children[0].innerText.trim();
        // Check if it's in "close" state (showing "Hide detail" text)
        if (
          src !== elemId &&
          currentText !== detailOpen &&
          currentText !== "Detay" &&
          currentText !== "Detail" &&
          currentText !== "Details"
        ) {
          elem.children[0].innerText = detailOpen;
          elem.classList.remove("button-toggle-on");
          if (window.jQuery) {
            jQuery("#detail-0" + i).collapse("toggle");
          }
        }
      }

      // Toggle the target collapse
      if (window.jQuery) {
        jQuery("#" + target).collapse("toggle");
      }

      // Update button text
      var elementText = element.children[0].innerText.trim();
      if (
        elementText === "Detay" ||
        elementText === "Detail" ||
        elementText === "Details" ||
        elementText === detailOpen
      ) {
        element.children[0].innerText = detailClose;
        element.classList.add("button-toggle-on");
      } else {
        element.children[0].innerText = detailOpen;
        element.classList.remove("button-toggle-on");
      }
    } catch (e) {
      console.error("Toggle error:", e);
    }
  };

  try {
    var oldSubmit = window.handleSubmit;
    if (oldSubmit) {
      window.handleSubmit = function () {
        var name = document.getElementById("form-name")
          ? document.getElementById("form-name").value
          : "";
        var email = document.getElementById("form-email")
          ? document.getElementById("form-email").value
          : "";
        var msgEl = document.getElementById("form-message");
        var msg =
          msgEl && msgEl.value ? msgEl.value.replaceAll("\n", "%0D") : "";
        var subject = window.__I18N_MAIL_SUBJECT__ || "Proto İletişim";
        window.location.href =
          "mailto:info@protoyazilim.com?cc=" +
          encodeURIComponent(email) +
          "&subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          msg +
          "%0D" +
          encodeURIComponent(name) +
          "%0D" +
          encodeURIComponent(email);
      };
    }
  } catch (e) {}
})();
