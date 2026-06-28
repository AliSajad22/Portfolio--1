const PROJECTS = {
  hafendeck: {
    title: "Hafendeck",
    tag: "Webdesign · Branding",
    description: `
      <p>Hafendeck ist ein fiktives Druckerei-Museum in der Hamburger Speicherstadt,
      das ich mir für mein Schulprojekt komplett selbst ausgedacht habe — inklusive
      Name, Logo, Farbwelt und Inhalt.</p>
      <p>Die Landingpage bewirbt ein Eröffnungsfestival mit Live-Druckvorführungen,
      einem Skatturnier und Workshops. Das komplette Layout habe ich in Figma entworfen.</p>
      <p><strong>Werkzeuge:</strong> Figma, eigenes Logo- und Farbkonzept
      (Petrol, Gelb, Beige).</p>
    `,
    images: ["Bilder/Hafendeck.webp"],
  },
  "rookie-travel": {
    title: "Cre8ive Force",
    tag: "Logodesign",
    description: `
      <p>Ein Logo für eine fiktive Reisemarke, die sich an junge Menschen richtet,
      die ihre ersten eigenen Reisen planen.</p>
      <p>Die Bildmarke zeigt drei Figuren, die gemeinsam die Arme heben, umrahmt von
      einem Flugzeug. Die Wortmarke ist bewusst kräftig und gut lesbar gehalten.</p>
      <p><strong>Werkzeuge:</strong> Adobe Illustrator.</p>
    `,
    images: ["Bilder/Cre8ive-Force_Logo.webp"],
  },
  "paradise-punch": {
    title: "Paradise Punch",
    tag: "Logodesign",
    description: `
      <p>Eine Wort-Bild-Marke für eine fiktive Getränkemarke. Das Tukan-Motiv
      greift den tropischen Markennamen auf und funktioniert auch einfarbig.</p>
      <p><strong>Werkzeuge:</strong> Adobe Illustrator.</p>
    `,
    images: ["Bilder/Pradis-punch.webp"],
  },
  spielkarten: {
    title: "Spielkarten-Illustrationen",
    tag: "Illustration",
    description: `
      <p>Ein eigenes Set illustrierter Spielkarten mit Druckerei-Werkzeugen als
      durchgehendes Motiv — Walzen, Pinsel, Farbtuben und Stempel ersetzen die
      klassischen Symbole.</p>
      <p>Entstanden als Ergänzung zum Hafendeck-Projekt, da dort ein Skatturnier
      Teil des Festivalprogramms ist.</p>
      <p><strong>Werkzeuge:</strong> Adobe Illustrator.</p>
    `,
    images: [
      "Bilder/7.webp",
      "Bilder/8.webp",
      "Bilder/A.webp",
      "Bilder/Q.webp",
    ],
  },
  bmk: {
    title: '„Mehr gestalten." – BMK-Kampagne',
    tag: "Print · Kampagne",
    description: `
      <p>Ein Print-Design für die eigene Schule, die Berufliche Schule für Medien
      und Kommunikation (BMK) in Hamburg, im Rahmen der Kampagne #nextlevelBMK.</p>
      <p>Umgesetzt habe ich einen Anstecker-Button, eine Stofftasche und Postkarten-
      Motive. Alle Motive nutzen das gleiche grafische System aus Kreisen, Pfeil und
      der Schul-Wortmarke.</p>
      <p><strong>Werkzeuge:</strong> Adobe Illustrator und InDesign.</p>
    `,
    images: [
      "Bilder/bmk__button.webp",
      "Bilder/bmk__tasche.webp",
      "Bilder/Bmk_postkarte.webp",
    ],
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tabs__btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = "tab-" + btn.dataset.tab;

      tabButtons.forEach((b) => b.classList.remove("tabs__btn--active"));
      btn.classList.add("tabs__btn--active");

      tabPanels.forEach((panel) => {
        panel.classList.toggle("tab-panel--active", panel.id === targetId);
      });

      animateVisibleBars();
    });
  });

  function animateVisibleBars() {
    document
      .querySelectorAll(".tab-panel--active .skill-row__fill")
      .forEach((bar) => bar.classList.add("skill-row__fill--in-view"));
  }

  animateVisibleBars();

  const lightbox = document.getElementById("lightbox");
  const lightboxBody = document.getElementById("lightboxBody");
  const galleryItems = document.querySelectorAll(".gallery-item[data-project]");

  function buildLightboxContent(project) {
    const slides = project.images
      .map(
        (src, i) =>
          `<img src="${src}" alt="${project.title} Bild ${i + 1}" class="lightbox__slide${i === 0 ? " lightbox__slide--active" : ""}" />`,
      )
      .join("");

    const dots = project.images
      .map(
        (_, i) =>
          `<button class="lightbox__dot${i === 0 ? " lightbox__dot--active" : ""}" data-slide="${i}" aria-label="Bild ${i + 1} anzeigen"></button>`,
      )
      .join("");

    const arrows =
      project.images.length > 1
        ? `<button class="lightbox__arrow lightbox__arrow--prev" data-prev aria-label="Vorheriges Bild">‹</button>
           <button class="lightbox__arrow lightbox__arrow--next" data-next aria-label="Nächstes Bild">›</button>`
        : "";

    return `
      <div class="lightbox__media">
        <div class="lightbox__slider">${arrows}${slides}</div>
        ${project.images.length > 1 ? `<div class="lightbox__dots">${dots}</div>` : ""}
      </div>
      <div class="lightbox__info">
        <span class="lightbox__tag">${project.tag}</span>
        <h2 class="lightbox__title" id="lightbox-title">${project.title}</h2>
        <div class="lightbox__description">${project.description}</div>
      </div>
    `;
  }

  function openLightbox(projectKey) {
    const project = PROJECTS[projectKey];
    if (!project) return;

    lightboxBody.innerHTML = buildLightboxContent(project);
    lightbox.classList.add("lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    setupSlider();
  }

  function closeLightbox() {
    lightbox.classList.remove("lightbox--open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxBody.innerHTML = "";
  }

  function setupSlider() {
    const slides = lightboxBody.querySelectorAll(".lightbox__slide");
    const dots = lightboxBody.querySelectorAll(".lightbox__dot");
    const prevBtn = lightboxBody.querySelector("[data-prev]");
    const nextBtn = lightboxBody.querySelector("[data-next]");
    if (!slides.length) return;

    let current = 0;

    function showSlide(index) {
      slides.forEach((s, i) =>
        s.classList.toggle("lightbox__slide--active", i === index),
      );
      dots.forEach((d, i) =>
        d.classList.toggle("lightbox__dot--active", i === index),
      );
      current = index;
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => showSlide(Number(dot.dataset.slide)));
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () =>
        showSlide((current - 1 + slides.length) % slides.length),
      );
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () =>
        showSlide((current + 1) % slides.length),
      );
    }
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => openLightbox(item.dataset.project));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item.dataset.project);
      }
    });
  });

  lightbox.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeLightbox);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("lightbox--open")) {
      closeLightbox();
    }
  });
});
