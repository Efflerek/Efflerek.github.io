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

  function onSubmit(formId) {
    let form = document.getElementById(formId);
    let formData = new FormData(form);

    let phpScript;
    
    if (formId === 'form') {
        phpScript = 'sendform.php';
    } else {
        phpScript = 'getconsultation.php';
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", phpScript, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Obsłuż odpowiedź serwera, jeśli to konieczne
            console.log(xhr.responseText);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            // Obsłuż błąd
            console.error("Wystąpił błąd podczas przetwarzania formularza.");
        }
    };

    xhr.send(formData);
}


});
