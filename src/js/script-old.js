document.addEventListener('DOMContentLoaded', function () {
    // Cookie popup
    if (document.cookie.indexOf('cookiePolicyAccepted=true') === -1) {
      // Create the cookie popup
      const isIcelandicVersion = window.location.pathname.endsWith('-is.html');
      const cookiePopup = document.createElement('div');
      cookiePopup.id = 'cookie-popup';
  
      if (isIcelandicVersion) {
        // Icelandic version
        cookiePopup.innerHTML = `
          <p>Vafrakökurstefna</p>
          <p>Þessi vefsíða notar vafrakökur til að auka upplifun þína. Með því að halda áfram samþykkir þú stefnu okkar um vafrakökur.
            <br><a href="cookie-policy-ems-is.html" class="link">LINK &#10148;</a>
          </p>
          <button class="cookie-popup__button">OK</button>
        `;
      } else {
        // English or other version
        cookiePopup.innerHTML = `
          <p>Cookie Policy</p>
          <p>This website uses cookies to enhance your experience. By continuing, you agree to our cookie policy.
            <br><a href="cookie-policy-ems.html" class="link">LINK &#10148;</a>
          </p>
          <button class="cookie-popup__button">OK</button>
        `;
      }
  
      document.body.appendChild(cookiePopup);
  
      // Handle user's click on "OK" button
      const cookieButton = document.querySelector('#cookie-popup button');
      cookieButton.addEventListener('click', function () {
        // Set the cookie to indicate acceptance
        document.cookie = 'cookiePolicyAccepted=true; path=/';
        cookiePopup.style.display = 'none'; // Hide the popup
      });
    }
  // Clipboard copy function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copied to clipboard: ' + text);
      })
      .catch((err) => {
        console.error('Error copying to clipboard: ', err);
      });
  };

  const tabcards = document.querySelectorAll('.tabcard');
  tabcards.forEach((tabcard) => {
    tabcard.addEventListener('click', function () {
      const tabContent = tabcard.querySelector('.tab-content span');
      const textToCopy = tabContent.textContent;
      copyToClipboard(textToCopy);
    });
  });

  // Modal functionality
  const openModalBtns = document.querySelectorAll('.sign-up.free-consultation');
  const modal = document.getElementById("modalform");
  const closeModal = document.getElementsByClassName("close")[0];

  openModalBtns.forEach((openModalBtn) => {
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

  // Mobile menu toggle
  function toggleMenu() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav-menu").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }

  const menuBar = document.querySelector('.menu-bar');
  menuBar.addEventListener('click', toggleMenu);

  // Language switcher
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

  // Form submit with reCAPTCHA
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    recaptchaCallback();
  });

  function recaptchaCallback() {
    document.getElementById("form").submit();
  }

  // Model Viewer
  const modelViewers = document.querySelectorAll('model-viewer');
  modelViewers.forEach(function (modelViewer) {
    modelViewer.addEventListener('load', function () {
      console.log('Model has been loaded!');
    });

    modelViewer.addEventListener('error', function (event) {
      console.error('An error occurred during model loading:', event);
    });
  });

  // Form submission
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

  // Max number of words in articles
  const articles = document.querySelectorAll('.article-body');
  const maxWords = 25;

  articles.forEach((article) => {
    const paragraph = article.querySelector('p');
    if (paragraph) {
      const words = paragraph.textContent.trim().split(' ');
      if (words.length > maxWords) {
        const truncatedText = words.slice(0, maxWords).join(' ') + '...';
        paragraph.textContent = truncatedText;
      }
    }
  });

  // Form validation
  function validateForm() {
    const name = document.forms["form"]["name"].value;
    const email = document.forms["form"]["email"].value;
    const message = document.forms["form"]["message"].value;

    if (name === "" || email === "" || message === "") {
      alert("Please fill in all required fields.");
      return false;
    }

    const formMessage = document.getElementById("formMessage");
    formMessage.style.display = "block";
    return false;
  }

  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
  });


});
