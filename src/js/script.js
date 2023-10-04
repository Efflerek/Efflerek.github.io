document.addEventListener('DOMContentLoaded', function () {
  const openModalBtns = document.querySelectorAll('.sign-up.free-consultation');
  const modal = document.getElementById("modalform");
  const closeModal = document.getElementsByClassName("close")[0];

  openModalBtns.forEach(openModalBtn => {
    openModalBtn.onclick = function () {
      modal.style.display = "flex";
    };
  });

  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };


  function toggleMenu() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav-menu").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }

  const menuBar = document.querySelector('.menu-bar');
  menuBar.addEventListener('click', toggleMenu);

// SWITCHER JĘZYKOWY //
const switcher = document.getElementById('language-toggle');

switcher.addEventListener('change', function () {
  // Pobierz nazwę aktualnej strony
  const currentPageName = window.location.pathname.split('/').pop();
  let newPageName; // Deklarujemy zmienną poza blokami if/else

  // Sprawdź, czy strona jest już w formacie "-is.html"
  if (currentPageName.endsWith('-is.html')) {
    // Jeśli strona jest w formacie "-is.html" lub "index-is.html", zmień ją na ".html"
    newPageName = currentPageName.replace('-is.html', '.html').replace('index-is.html', 'index.html');
  } else {
    // W przeciwnym razie, zmień na "-is.html"
    newPageName = currentPageName.replace('.html', '-is.html');
  }

  if (currentPageName === 'index-is.html') {
    // Jeśli strona to 'easymotionskin.is' lub 'index-is.html', przekieruj na 'easymotionskin.is/index.html'
    window.location.href = 'https://easymotionskin.is/index.html';
  }

  if (currentPageName === 'https://easymotionskin.is') {
    // Jeśli strona to 'easymotionskin.is' lub 'index-is.html', przekieruj na 'easymotionskin.is/index.html'
    window.location.href = 'https://easymotionskin.is/index.html';
  }
    // W przeciwnym razie przekieruj użytkownika na nową stronę
    // Opóźnij przekierowanie o 200 milisekund (0,2 sekundy)
    setTimeout(function () {
      // Buduj nowy URL na podstawie nazw stron
      const newURL = window.location.origin + window.location.pathname.replace(currentPageName, newPageName);

      // Przekieruj użytkownika na nową stronę
      window.location.href = newURL;
    }, 200);
  }
});



  //COOKIE POPUP //

// Sprawdź, czy użytkownik już zaakceptował ciastko
if (document.cookie.indexOf('cookiePolicyAccepted=true') === -1) {
  // Ciastko nie jest jeszcze ustawione, utwórz pop-up

  const isIcelandicVersion = window.location.pathname.endsWith('-is.html');
  const cookiePopup = document.createElement('div');
  cookiePopup.id = 'cookie-popup';

  if (isIcelandicVersion) {
    // Wersja islandzka
    cookiePopup.innerHTML = `
      <p>Vafrakökurstefna</p>
      <p>Þessi vefsíða notar vafrakökur til að auka upplifun þína. Með því að halda áfram samþykkir þú stefnu okkar um vafrakökur.
        <br><a href="cookie-policy-ems-is.html" class="link">LINK &#10148;</a>
      </p>
      <button class="cookie-popup__button">OK</button>
    `;
  } else {
    // Wersja angielska lub inna wersja
    cookiePopup.innerHTML = `
      <p>Cookie Policy</p>
      <p>This website uses cookies to enhance your experience. By continuing, you agree to our cookie policy.
        <br><a href="cookie-policy-ems.html" class="link">LINK &#10148;</a>
      </p>
      <button class="cookie-popup__button">OK</button>
    `;
  }

  document.body.appendChild(cookiePopup);

  // Obsługa kliknięcia przycisku "OK"
  const cookieButton = document.querySelector('#cookie-popup button');
  cookieButton.addEventListener('click', function () {
    // Ustaw ciastko jako zaakceptowane
    document.cookie = 'cookiePolicyAccepted=true; path=/';

    // Ukryj pop-up
    cookiePopup.style.display = 'none';
  });
}

  // MODEL 3D
  // Find all occurrences of the Model Viewer component on the page
  const modelViewers = document.querySelectorAll('model-viewer');

  // Iterate through each Model Viewer component
  modelViewers.forEach(function (modelViewer) {
    // Check if the component is loaded
    modelViewer.addEventListener('load', function () {
      // Perform any actions after the model is loaded
      console.log('Model has been loaded!');
    });

    // Check if an error occurred during model loading
    modelViewer.addEventListener('error', function (event) {
      // Display an error message
      console.error('An error occurred during model loading:', event);
    });
  });



  // SEND FORM
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const xhr = new XMLHttpRequest();

    xhr.open('POST', contactForm.getAttribute('action'), true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        // Handle success (display a thank you message, for example)
        console.log(xhr.responseText); // Log the response from the server
      } else {
        // Handle error
        console.error('An error occurred:', xhr.statusText);
      }
    };

    xhr.onerror = function () {
      // Handle network error
      console.error('Network error occurred');
    };

    xhr.send(formData);
  });

  // Max number of words
  // Get all elements with the class "article"
  const articles = document.querySelectorAll('.article-body');

  // Define the maximum number of words to display
  const maxWords = 25;

  // Loop through each article
  articles.forEach(article => {
    // Find the <p> element within the article
    const paragraph = article.querySelector('p');

    // Check if the paragraph exists
    if (paragraph) {
      // Split the text into words
      const words = paragraph.textContent.trim().split(' ');

      // Limit the number of words if it exceeds the maximum
      if (words.length > maxWords) {
        const truncatedText = words.slice(0, maxWords).join(' ') + '...';
        paragraph.textContent = truncatedText;
      }
    }
  });

  function validateForm() {
    const name = document.forms["myForm"]["name"].value;
    const email = document.forms["myForm"]["email"].value;
    const message = document.forms["myForm"]["message"].value;

    if (name == "" || email == "" || message == "") {
        alert("Please fill in all required fields.");
        return false;
    }

    // Wyświetl komunikat po pomyślnym wysłaniu
    const formMessage = document.getElementById("formMessage");
    formMessage.style.display = "block";

    return false; // Zapobiegaj faktycznemu wysłaniu formularza
}
});