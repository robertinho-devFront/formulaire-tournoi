document.addEventListener('DOMContentLoaded', function () {
  const modalBackground = document.querySelector(".bground");
  const modalButtons = document.querySelectorAll(".modal-btn");
  const closeModalButton = document.querySelector(".close-modal-btn");
  const form = document.getElementById('tournamentForm');
  const confirmationMessage = document.getElementById('confirmationMessage');

  modalButtons.forEach(button => button.addEventListener("click", function () {
    modalBackground.style.display = "block";
  }));

  closeModalButton.addEventListener("click", function () {
    modalBackground.style.display = "none";
  });

  function resetErrors() {
    document.querySelectorAll('.error-message').forEach(element => element.remove());
    document.querySelectorAll('.error, .error-group').forEach(element => element.classList.remove('error', 'error-group'));
  }

  function createErrorMessage(message) {
    const errorMessageElement = document.createElement("span");
    errorMessageElement.textContent = message; 
    errorMessageElement.classList.add('error-message');
    return errorMessageElement;
  }

  function triggerError(field, message) {
    const errorContainer = field.closest('.formData');
    const errorMessageElement = createErrorMessage(message);

    errorContainer.appendChild(errorMessageElement);
    errorContainer.classList.add('error'); 
  }

  function validateField(field, isValid, message) {
    if (!isValid) {
      triggerError(field, message);
      return false;
    }
    return true;
  }

  function validateForm() {
    resetErrors(); 
    let formIsValid = true;

    const firstName = document.getElementById('first');
    const lastName = document.getElementById('last');
    const email = document.getElementById('email');
    const birthdate = document.getElementById('birthdate');
    const terms = document.getElementById('checkbox1');
    const quantity = document.getElementById('quantity');
    const locationRadioButtons = document.querySelectorAll('input[name="location"]:checked');
    const hasSelectedLocation = locationRadioButtons.length > 0;

    formIsValid &= validateField(firstName, firstName.value.trim().length >= 2, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
    formIsValid &= validateField(lastName, lastName.value.trim().length >= 2, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    formIsValid &= validateField(email, email.value.trim().includes('@'), 'L\'adresse e-mail est invalide.');
    formIsValid &= validateField(birthdate, birthdate.value.trim() !== '', 'Veuillez entrer votre date de naissance.');
    formIsValid &= validateField(terms, terms.checked, 'Vous devez accepter les conditions d\'utilisation.');
    formIsValid &= validateField(document.querySelector('.location-container'), hasSelectedLocation, 'Veuillez choisir une option de tournoi.');
    formIsValid &= validateField(quantity, !isNaN(quantity.value) && quantity.value >= 0, 'Veuillez entrer un nombre valide de tournois.');

    return formIsValid;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault(); 
    const isValid = validateForm(); 

    if (isValid) {
      console.log('Le formulaire est valide.');
      confirmationMessage.style.display = 'block';
      setTimeout(() => {
        confirmationMessage.style.display = 'none';
        modalBackground.style.display = "none"; 
      }, 5000);
      form.reset(); 
    } else {
      console.log('Le formulaire contient des erreurs.');
    }
  });
});