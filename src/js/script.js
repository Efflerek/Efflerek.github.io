document.addEventListener('DOMContentLoaded', function () {
  // Obsługa otwierania i zamykania modalu
  const openModalBtns = document.querySelectorAll('.sign-up.free-consultation');
  const modal = document.getElementById("modalform");
  const closeModal = document.querySelector(".close");

  openModalBtns.forEach(openModalBtn => {
    openModalBtn.addEventListener('click', function () {
      modal.style.display = "flex";
    });
  });

  closeModal.addEventListener('click', function () {
    modal.style.display = "none";
  });

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Obsługa przycisku menu
  const menuBar = document.querySelector('.menu-bar');
  menuBar.addEventListener('click', function () {
    toggleMenu();
  });

  function toggleMenu() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav-menu").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }

  // Obsługa przełącznika językowego
  const switcher = document.getElementById('language-toggle');

  switcher.addEventListener('change', function () {
    const currentPageName = window.location.pathname.split('/').pop();
    let newPageName;

    if (currentPageName.endsWith('-is.html')) {
      newPageName = currentPageName.replace('-is.html', '.html');
    } else {
      newPageName = currentPageName.replace('.html', '-is.html');
    }

    setTimeout(function () {
      const newURL = window.location.origin + window.location.pathname.replace(currentPageName, newPageName);
      window.location.href = newURL;
    }, 200);
  });

  // Obsługa pop-upa ciasteczkowego
  if (document.cookie.indexOf('cookiePolicyAccepted=true') === -1) {
    const isIcelandicVersion = window.location.pathname.endsWith('-is.html');
    const cookiePopup = document.createElement('div');
    cookiePopup.id = 'cookie-popup';

    if (isIcelandicVersion) {
      cookiePopup.innerHTML = `
        <p>Vafrakökurstefna</p>
        <p>Þessi vefsíða notar vafrakökur til að auka upplifun þína. Með því að halda áfram samþykkir þú stefnu okkar um vafrakökur.
          <br><a href="cookie-policy-ems-is.html" class="link">LINK &#10148;</a>
        </p>
        <button class="cookie-popup__button">OK</button>
      `;
    } else {
      cookiePopup.innerHTML = `
        <p>Cookie Policy</p>
        <p>This website uses cookies to enhance your experience. By continuing, you agree to our cookie policy.
          <br><a href="cookie-policy-ems.html" class="link">LINK &#10148;</a>
        </p>
        <button class="cookie-popup__button">OK</button>
      `;
    }

    document.body.appendChild(cookiePopup);

    const cookieButton = document.querySelector('#cookie-popup button');
    cookieButton.addEventListener('click', function () {
      document.cookie = 'cookiePolicyAccepted=true; path=/';
      cookiePopup.style.display = 'none';
    });
  }

  // Obsługa Model Viewer
  const modelViewers = document.querySelectorAll('model-viewer');

  modelViewers.forEach(function (modelViewer) {
    modelViewer.addEventListener('load', function () {
      console.log('Model has been loaded!');
    });

    modelViewer.addEventListener('error', function (event) {
      console.error('An error occurred during model loading:', event);
    });
  });

  // Obsługa formularza kontaktowego
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', contactForm.getAttribute('action'), true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.error('An error occurred:', xhr.statusText);
      }
    };

    xhr.onerror = function () {
      console.error('Network error occurred');
    };

    xhr.send(formData);
  });

  // Ograniczenie liczby wyświetlanych słów w artykule
  const articles = document.querySelectorAll('.article-body');
  const maxWords = 25;

  articles.forEach(article => {
    const paragraph = article.querySelector('p');

    if (paragraph) {
      const words = paragraph.textContent.trim().split(' ');

      if (words.length > maxWords) {
        const truncatedText = words.slice(0, maxWords).join(' ') + '...';
        paragraph.textContent = truncatedText;
      }
    }
  });

  // Funkcja do walidacji formularza
  function validateForm() {
    const name = document.forms["myForm"]["name"].value;
    const email = document.forms["myForm"]["email"].value;
    const message = document.forms["myForm"]["message"].value;

    if (name == "" || email == "" || message == "") {
      alert("Please fill in all required fields.");
      return false;
    }

    const formMessage = document.getElementById("formMessage");
    formMessage.style.display = "block";

    return false;
  }

    // Funkcja do otwierania adresu na mapie
    function openAddressOnMap(address) {
      const geoURL = `geo:0,0?q=${encodeURIComponent(address)}`;
      window.open(geoURL, "_blank");
    }
  
    // Znajdź wszystkie elementy tabcard
    const tabcards = document.querySelectorAll(".tabcard");
  
    // Iteruj przez tabcardy i dodaj obsługę kliknięcia
    tabcards.forEach(tabcard => {
      const icon = tabcard.querySelector(".icon");
      const header = tabcard.querySelector("h3");
      const content = tabcard.querySelector(".tab-content span");
  
      // Sprawdź, czy istnieją wymagane elementy
      if (icon && header && content) {
        tabcard.addEventListener("click", function () {
          const text = content.textContent;
          if (header.textContent.includes("Netfang")) {
            // Jeśli kliknięto na tabcard z adresem email, skopiuj go do schowka
            copyToClipboard(text);
          } else if (header.textContent.includes("Simi")) {
            // Jeśli kliknięto na tabcard z numerem telefonu, skopiuj go do schowka
            copyToClipboard(text);
          } else if (header.textContent.includes("Staðsetning")) {
            // Jeśli kliknięto na tabcard z adresem, otwórz go na mapie
            openAddressOnMap(text);
          }
        });
      }
    });
  
    // Funkcja do kopiowania tekstu do schowka
    function copyToClipboard(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Skopiowano do schowka: " + text);
    }
  });