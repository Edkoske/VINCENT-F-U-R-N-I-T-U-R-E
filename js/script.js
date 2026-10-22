(() => {
  "use strict";

  const WHATSAPP_NUMBER = "254710241295";

  const products = [
    { id: "light-bed", name: "Light Upholstered Bed", category: "bedroom", label: "Bedroom", description: "A finished upholstered bed with a distinctive padded headboard and matching frame.", image: "images/2.jpg", alt: "Finished light upholstered bed displayed at the workshop", detail: "A finished upholstered bed photographed on display. Contact Vincent to ask about availability, sizes, fabric, and pricing." },
    { id: "grey-bed", name: "Grey Upholstered Bed", category: "bedroom", label: "Bedroom", description: "A dark fabric bed with a tall, button-detailed headboard.", image: "images/bed.jpg", alt: "Finished dark upholstered bed on display", detail: "A finished dark upholstered bed photographed on display. Contact Vincent to ask about availability, sizes, fabric, and pricing." },
    { id: "display-bed", name: "Light Fabric Bed", category: "bedroom", label: "Bedroom", description: "A light fabric bed with a softly tufted headboard, shown on display.", image: "images/bed%201.jpg", alt: "Finished light fabric bed displayed outside the workshop", detail: "A finished light fabric bed photographed on display. Contact Vincent to ask about availability, sizes, fabric, and pricing." },
    { id: "display-cabinet", name: "Display Storage Cabinet", category: "custom", label: "Storage & display", description: "A white finished cabinet with upper display cupboards and lower storage.", image: "images/3.jpg", alt: "Finished white storage and display cabinet on view", detail: "A finished white storage and display cabinet photographed on view. Contact Vincent to ask about availability, dimensions, and pricing." },
    { id: "tv-unit", name: "Entertainment Unit", category: "living", label: "Living room", description: "A white entertainment unit with a raised centre shelf and drawer storage.", image: "images/4.jpg", alt: "Finished white entertainment unit displayed outdoors", detail: "A finished white entertainment unit photographed on display. Contact Vincent to ask about availability, dimensions, and pricing." },
    { id: "lounge-sofa", name: "Contemporary Lounge Sofa", category: "living", label: "Living room", inspiration: true, description: "A relaxed sofa silhouette shown as an idea for a comfortable living space.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85", alt: "Styling inspiration: upholstered sofa in a living room", detail: "Styling inspiration only—not a confirmed Vincent Furniture product. Ask Vincent whether a similar custom design could be discussed for your room." },
    { id: "dining-table", name: "Gathering Dining Table", category: "dining", label: "Dining", inspiration: true, description: "A welcoming dining table setting to inspire a made-for-home design.", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=900&q=85", alt: "Styling inspiration: dining table in a contemporary room", detail: "Styling inspiration only—not a confirmed Vincent Furniture product. Use this reference to start a conversation about a dining table made for your space." },
    { id: "studio-workspace", name: "Studio Workspace", category: "office", label: "Office", inspiration: true, description: "A bright, considered workspace with practical furniture and a calm feel.", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85", alt: "Styling inspiration: desk furniture in a bright workspace", detail: "Styling inspiration only—not a confirmed Vincent Furniture product. Contact Vincent to discuss a desk or storage design for your workspace." },
    { id: "soft-bedroom", name: "Soft-Tone Bedroom", category: "bedroom", label: "Bedroom", inspiration: true, description: "A quiet bedroom palette to inspire a bed and furniture arrangement.", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85", alt: "Styling inspiration: calm bedroom with a finished bed", detail: "Styling inspiration only—not a confirmed Vincent Furniture product. Ask about adapting the look to a bed or bedroom storage project." },
    { id: "warm-living", name: "Warm Living Room", category: "living", label: "Living room", inspiration: true, description: "A warm contemporary living room with furniture ideas to explore.", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85", alt: "Styling inspiration: warm living space with contemporary furniture", detail: "Styling inspiration only—not a confirmed Vincent Furniture product. Share what you like about the look and ask Vincent about a custom piece." }
  ];

  const galleryImages = Array.from(document.querySelectorAll(".gallery-item")).map((item) => ({
    src: item.querySelector("img").src,
    alt: item.querySelector("img").alt
  }));
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  const productGrid = document.querySelector("#product-grid");
  const productDialog = document.querySelector("#product-dialog");
  const productDialogContent = document.querySelector("#product-dialog-content");
  const lightbox = document.querySelector("#lightbox");
  let activeGalleryIndex = 0;

  function whatsappUrl(message) {
    if (!WHATSAPP_NUMBER) return null;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function notifyWhatsAppNotConfigured(feedback) {
    feedback.textContent = "WhatsApp is not configured yet. Please contact Vincent directly once his number is added.";
    feedback.classList.add("error");
  }

  function openWhatsApp(message, feedback) {
    const url = whatsappUrl(message);
    if (!url) {
      notifyWhatsAppNotConfigured(feedback);
      return false;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    feedback.textContent = "WhatsApp opened in a new tab. Review your message there before sending.";
    feedback.classList.remove("error");
    return true;
  }

  function renderProducts(category = "all") {
    const visibleProducts = products.filter((product) => category === "all" || product.category === category);
    productGrid.innerHTML = visibleProducts.map((product, index) => `
      <article class="product-card${product.inspiration ? " product-card-inspiration" : ""}">
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.alt}" loading="lazy">
          <span class="product-category">${product.label}</span>
          ${product.inspiration ? '<span class="product-inspiration-tag">STYLE INSPIRATION</span>' : ""}
          <span class="product-number">${String(products.indexOf(product) + 1).padStart(2, "0")}</span>
        </div>
        <div class="product-info">
          <div class="product-info-top"><h3>${product.name}</h3><span class="product-price">${product.inspiration ? "Design idea" : "Request a quote"}</span></div>
          <p>${product.description}</p>
          <div class="product-actions">
            <button class="product-action" type="button" data-product-details="${product.id}">View details <span aria-hidden="true">↗</span></button>
            <button class="product-action secondary" type="button" data-product-inquiry="${product.id}">Ask on WhatsApp <span aria-hidden="true">↗</span></button>
          </div>
        </div>
      </article>`).join("");
    productGrid.dataset.count = String(visibleProducts.length);
    productGrid.querySelectorAll(".product-card").forEach((card, index) => {
      card.style.animationDelay = `${index * 70}ms`;
    });
    document.querySelectorAll("[data-filter-count]").forEach((count) => {
      const filter = count.dataset.filterCount;
      const total = filter === "all" ? products.length : products.filter((product) => product.category === filter).length;
      count.textContent = String(total).padStart(2, "0");
      count.closest(".filter-button").hidden = filter !== "all" && total === 0;
    });
  }

  function productById(id) {
    return products.find((product) => product.id === id);
  }

  function showProductDetails(product) {
    productDialogContent.innerHTML = `
      <article class="dialog-product">
        <img src="${product.image}" alt="${product.alt}">
        <div class="dialog-product-copy">
          <p class="eyebrow">${product.inspiration ? "Style inspiration · " : ""}${product.label}${product.inspiration ? "" : " · Finished piece"}</p>
          <h2 id="product-dialog-title">${product.name}</h2>
          <p>${product.detail}</p>
          <p class="dialog-quote">${product.inspiration ? "Inspiration image · Ask about a similar idea" : "Finished display piece · Pricing on request"}</p>
          <button class="button button-dark" type="button" data-dialog-inquiry="${product.id}">Ask about this piece <span aria-hidden="true">↗</span></button>
        </div>
      </article>`;
    productDialog.showModal();
  }

  function setGalleryImage(index) {
    activeGalleryIndex = (index + galleryImages.length) % galleryImages.length;
    const image = galleryImages[activeGalleryIndex];
    lightbox.querySelector("figure img").src = image.src;
    lightbox.querySelector("figure img").alt = image.alt;
    lightbox.querySelector("figcaption").textContent = image.alt.replace(/^Inspiration:\s*/i, "");
    lightbox.querySelector(".lightbox-count").textContent = `${activeGalleryIndex + 1} / ${galleryImages.length}`;
  }

  function showFeedback(element, message, isError = false) {
    element.textContent = message;
    element.classList.toggle("error", isError);
  }

  function formValue(form, name) {
    return String(new FormData(form).get(name) || "").trim();
  }

  function customInquiryMessage(form) {
    const file = form.elements.inspiration.files[0];
    return [
      "Hello Vincent, I'd like to discuss a custom furniture project.",
      `Name: ${formValue(form, "name")}`,
      `Phone: ${formValue(form, "phone")}`,
      formValue(form, "email") ? `Email: ${formValue(form, "email")}` : "",
      `Furniture type: ${formValue(form, "type")}`,
      formValue(form, "material") ? `Preferred material / finish: ${formValue(form, "material")}` : "",
      formValue(form, "dimensions") ? `Approximate dimensions: ${formValue(form, "dimensions")}` : "",
      formValue(form, "budget") ? `Budget range: ${formValue(form, "budget")}` : "",
      `Project description: ${formValue(form, "description")}`,
      file ? `Inspiration file to attach in WhatsApp: ${file.name}` : ""
    ].filter(Boolean).join("\n");
  }

  function contactInquiryMessage(form) {
    return [
      "Hello Vincent, I'd like to get in touch.",
      `Name: ${formValue(form, "name")}`,
      `Email: ${formValue(form, "email")}`,
      formValue(form, "phone") ? `Phone: ${formValue(form, "phone")}` : "",
      `Message: ${formValue(form, "message")}`
    ].filter(Boolean).join("\n");
  }

  function productInquiryMessage(product) {
    return [
      product.inspiration
        ? "Hello Vincent, I'd like to discuss a furniture design inspired by an example on your website."
        : "Hello Vincent, I'd like to ask about a finished furniture piece shown on your website.",
      "Name: [Please add your name]",
      `Furniture requested: ${product.name} (${product.label})`,
      `Details: ${product.description}`
    ].join("\n");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      siteNav.classList.remove("is-open");
    });
  });

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach((filter) => {
        const selected = filter === button;
        filter.classList.toggle("active", selected);
        filter.setAttribute("aria-pressed", String(selected));
      });
      renderProducts(button.dataset.filter);
    });
  });

  productGrid.addEventListener("click", (event) => {
    const detailsButton = event.target.closest("[data-product-details]");
    const inquiryButton = event.target.closest("[data-product-inquiry]");
    if (detailsButton) showProductDetails(productById(detailsButton.dataset.productDetails));
    if (inquiryButton) {
      const product = productById(inquiryButton.dataset.productInquiry);
      const feedback = document.querySelector("#custom-feedback");
      openWhatsApp(productInquiryMessage(product), feedback);
      document.querySelector("#custom").scrollIntoView({ behavior: "smooth" });
    }
  });

  productDialog.addEventListener("click", (event) => {
    if (event.target === productDialog || event.target.closest(".dialog-close")) productDialog.close();
    const inquiryButton = event.target.closest("[data-dialog-inquiry]");
    if (inquiryButton) {
      const product = productById(inquiryButton.dataset.dialogInquiry);
      productDialog.close();
      document.querySelector("#custom").scrollIntoView({ behavior: "smooth" });
      const feedback = document.querySelector("#custom-feedback");
      openWhatsApp(productInquiryMessage(product), feedback);
    }
  });
  [productDialog, lightbox].forEach((dialog) => {
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "Escape") dialog.close();
    });
  });

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      setGalleryImage(Number(item.dataset.index));
      lightbox.showModal();
      lightbox.querySelector(".lightbox-close").focus();
    });
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => setGalleryImage(activeGalleryIndex - 1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => setGalleryImage(activeGalleryIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") setGalleryImage(activeGalleryIndex - 1);
    if (event.key === "ArrowRight") setGalleryImage(activeGalleryIndex + 1);
  });

  document.querySelector("#custom-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const feedback = document.querySelector("#custom-feedback");
    if (!form.reportValidity()) {
      showFeedback(feedback, "Please complete the required fields before continuing.", true);
      return;
    }
    if (form.elements.email.value && !form.elements.email.validity.valid) {
      showFeedback(feedback, "Please enter a valid email address.", true);
      form.elements.email.focus();
      return;
    }
    openWhatsApp(customInquiryMessage(form), feedback);
  });

  document.querySelector("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const feedback = document.querySelector("#contact-feedback");
    if (!form.reportValidity()) {
      showFeedback(feedback, "Please complete the required fields before continuing.", true);
      return;
    }
    if (!form.elements.email.validity.valid) {
      showFeedback(feedback, "Please enter a valid email address.", true);
      form.elements.email.focus();
      return;
    }
    openWhatsApp(contactInquiryMessage(form), feedback);
  });

  document.querySelector("#custom-form [name='inspiration']").addEventListener("change", (event) => {
    const fileName = event.currentTarget.files[0]?.name;
    document.querySelector(".file-name").textContent = fileName
      ? `${fileName} selected. The file remains on your device; attach it in WhatsApp.`
      : "Choose a photo or PDF to mention in your message";
  });

  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", active);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach((section) => activeObserver.observe(section));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const backToTop = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 650);
  }, { passive: true });
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.querySelector("#copyright-year").textContent = String(new Date().getFullYear());

  renderProducts();
})();
