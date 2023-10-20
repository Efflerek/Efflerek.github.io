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

/* Obsługa id="form3" */

const form3 = document.getElementById("form3");
const submitButton3 = form3.querySelector(".cons-sub");

submitButton3.addEventListener("click", function (event) {
  event.preventDefault();
  grecaptcha.ready(function() {
    grecaptcha.execute('6LeYvIsoAAAAAOsWBgeYrMeldkRxNYQ0P6PWGMpG', { action: 'submit' }).then(function (token) {
      submitForm3(token);
    });
  });
});

function submitForm3(recaptchaToken) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const privacyPolicy = document.getElementById("privacy-policy").checked;

  if (!name || !email || !phone || !privacyPolicy) {
    alert("Please fill in all fields.");
    return;
  }

  // Send the form data to the server using AJAX
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("privacy-policy", privacyPolicy);
  formData.append("recaptchaToken", recaptchaToken);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "getconsultation3.php");
  xhr.send(formData);

  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("Form submitted successfully.");
      // You can redirect the user to a "Thank you" page here if needed.
    } else {
      alert("Form submission failed. Please try again later.");
    }
  };
}

// Kod obsługi id="form2"
const myForm = document.getElementById("form2");
const mySubmitButton2 = myForm.querySelector(".submit");

mySubmitButton2.addEventListener("click", function (event) {
  event.preventDefault();
  grecaptcha.ready(function() {
    grecaptcha.execute('6Lc56bcoAAAAAOcFwapxTrthsqj86QsAn3vtplxt', { action: 'submit' }).then(function (token) {
      submitForm2(token);
    });
  });
});

function submitForm2(recaptchaToken) {
  const name2 = document.getElementById("name2").value;
  const email2 = document.getElementById("email2").value;
  const phone2 = document.getElementById("phone2").value;
  const userMessage2 = document.getElementById("userMessage2").value;
  const privacyPolicy2 = document.getElementById("privacy-policy2").checked;

  if (!name2 || !email2 || !phone2 || !privacyPolicy2) {
    alert("Please fill in all fields.");
    return;
  }

  // Send the form data along with the reCAPTCHA token to the server using AJAX
  const formData2 = new FormData();
  formData2.append("name2", name2);
  formData2.append("email2", email2);
  formData2.append("phone2", phone2);
  formData2.append("userMessage2", userMessage2);
  formData2.append("privacy-policy2", privacyPolicy2);
  formData2.append("recaptchaToken", recaptchaToken);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "sendform.php"); // Zmieniłem na "sendform2.php" dla rozróżnienia pliku PHP.
  xhr.send(formData2);

  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("Thank You for submitting the form!");
    } else {
      alert("Form submission failed. Please try again later.");
    }
  };
}


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


