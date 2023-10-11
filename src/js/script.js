document.addEventListener('DOMContentLoaded', function () {
  // Pobierz wszystkie tabcardy
  const tabcards = document.querySelectorAll('.tabcard');

  tabcards.forEach(function (tabcard) {
    tabcard.addEventListener('click', function () {
      const tabContent = tabcard.querySelector('.tab-content span');
      const textToCopy = tabContent.textContent;

      navigator.clipboard.writeText(textToCopy)
        .then(function () {
          alert('Skopiowano do schowka: ' + textToCopy);
        })
        .catch(function (err) {
          console.error('Błąd kopiowania do schowka: ', err);
        });
    });
  });

  const openModalBtns = document.querySelectorAll('.sign-up.free-consultation');
  const modal = document.getElementById('modalform');
  const closeModal = modal.querySelector('.close');

  openModalBtns.forEach(openModalBtn => {
    openModalBtn.onclick = function () {
      modal.style.display = 'flex';
    };
  });

  closeModal.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  function toggleMenu() {
    document.getElementById('menu-bar').classList.toggle('change');
    document.getElementById('nav-menu').classList.toggle('change');
    document.getElementById('menu-bg').classList.toggle('change-bg');
  }

  const menuBar = document.querySelector('.menu-bar');
  menuBar.addEventListener('click', toggleMenu);

  // SWITCHER JĘZYKOWY
  const switcher = document.getElementById('language-toggle');

  switcher.addEventListener('change', function () {
    const currentPageName = window.location.pathname.split('/').pop();
    let newPageName;

    if (currentPageName === '') {
      window.location.href = 'https://easymotionskin.is/index.html';
      return;
    }

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

  // COOKIE POPUP
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

  // MODEL 3D
  const modelViewers = document.querySelectorAll('model-viewer');

  modelViewers.forEach(function (modelViewer) {
    modelViewer.addEventListener('load', function () {
      console.log('Model has been loaded!');
    });

    modelViewer.addEventListener('error', function (event) {
      console.error('An error occurred during model loading:', event);
    });
  });

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

  function validateForm() {
    const name = document.forms['form']['name'].value;
    const email = document.forms['form']['email'].value;
    const message = document.forms['form']['message'].value;

    if (name == '' || email == '' || message == '') {
      alert('Please fill in all required fields.');
      return false;
    }

    const formMessage = document.getElementById('formMessage');
    formMessage.style.display = 'block';

    return false;
  }

  function onSubmit(token, formId) {
    document.getElementById(formId).submit();
  }

  document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'sendform.php', true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Form submitted successfully.');
      } else {
        console.log('Form submission failed.');
      }
    };

    xhr.send(formData);
  });

  document.getElementById('consultation').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'getconsultation.php', true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Form submitted successfully.');
      } else {
        console.log('Form submission failed.');
      }
    };

    xhr.send(formData);
  });

  document.getElementById('form3').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'getconsultation.php', true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Form submitted successfully.');
      } else {
        console.log('Form submission failed.');
      }
    };

    xhr.send(formData);
  });
});
