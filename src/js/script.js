"use strict";

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

  /*Toggle Menu */

function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  const menuBg = document.getElementById('menu-bg');

  if (navMenu && menuBg) {
    navMenu.classList.toggle('change');
    menuBg.classList.toggle('change-bg');
  }
}
const menuToggle = document.getElementById('#toggle');
menuToggle.addEventListener('click', toggleMenu);

function onSubmitForm3(event) {
  event.preventDefault(); // Zatrzymujemy domyślne działanie przycisku submit
  // Pobieramy dane z formularza
  const form = event.target.closest('form');
  const name = form.querySelector('[name="name"]').value;
  const email = form.querySelector('[name="email"]').value;
  const phone = form.querySelector('[name="phone"]').value;
  // Pobierz także wartość token z reCAPTCHA, jeśli ją potrzebujesz
  // const token = 'twój_token';

  // Wysyłamy dane na serwer
  fetch('getconsultation3.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'name': name,
      'email': email,
      'phone': phone,
      // 'token': token // Jeśli potrzebujesz tokenu reCAPTCHA
    }),
  }).then(function(response) {
    if (response.ok) {
      // Wyświetlamy komunikat o sukcesie
      alert('Formularz wysłany pomyślnie!');
      // Możesz też wyczyścić pola formularza
      form.reset();
    } else {
      // Wyświetlamy komunikat o błędzie
      alert('Wysłanie formularza nie powiodło się. Spróbuj ponownie.');
    }
  }).catch(function(error) {
    // Wyświetlamy komunikat o błędzie
    alert('Wysłanie formularza nie powiodło się. Spróbuj ponownie.');
  });
}

// Nasłuchuj zdarzenia submit na formularzu form3
const form3 = document.querySelector('#form3');
form3.addEventListener('submit', onSubmitForm3);

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

});


