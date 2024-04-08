document.addEventListener("DOMContentLoaded", function () {
  const modalBackground = document.querySelector(".bground");
  const modalButtons = document.querySelectorAll(".modal-btn");
  const closeModalBtn = document.querySelector(".close-modal-btn");
  const form = document.getElementById("tournamentForm");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const closeConfirmationBtn = document.querySelector(
    "#confirmationMessage .close-modal-btn"
  ); // Bouton pour fermer la confirmation
  const fermerBtn = document.querySelector("#confirmationMessage .fermer-btn"); // Bouton "Fermer" dans la confirmation

  modalButtons.forEach((button) =>
    button.addEventListener("click", () => {
      modalBackground.style.display = "block";
      document.body.style.overflow = "hidden"; // Ajoute ce style pour empêcher le défilement
    })
  );
  closeModalBtn.addEventListener("click", () => {
    modalBackground.style.display = "none";
    document.body.style.overflow = ""; // Retire le style pour permettre à nouveau le défilement
  });
  // Fermer la modal de confirmation
  closeConfirmationBtn.addEventListener("click", () => {
    confirmationMessage.style.display = "none";
    modalBackground.style.display = "none";
  });

  // Fermer la modal en cliquant sur "Fermer"
  fermerBtn.addEventListener("click", () => {
    confirmationMessage.style.display = "none";
    modalBackground.style.display = "none";
  });

  // A un écouteur pour fermer la modal si on clique en dehors de la fenêtre de confirmation (facultatif)
  window.addEventListener("click", function (event) {
    if (event.target == modalBackground) {
      confirmationMessage.style.display = "none";
      modalBackground.style.display = "none";
    }
  });

  function resetErrors() {
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));
  }

  function showErrorMessage(field, message, isGroup = false) {
    const container = field.closest(".formData");
    let errorMessage = container.querySelector(".error-message");
    if (!errorMessage) {
      errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      container.appendChild(errorMessage);
    }
    errorMessage.textContent = message;

    if (isGroup) {
      const inputs = container.querySelectorAll("input");
      inputs.forEach((input) => input.classList.add("error"));
    } else {
      const input = container.querySelector("input");
      if (input) input.classList.add("error");
    }
  }

  function validateForm() {
    resetErrors();
    let isValid = true;

    const firstName = document.getElementById("first");
    const lastName = document.getElementById("last");
    const email = document.getElementById("email");
    const birthdate = document.getElementById("birthdate");
    const terms = document.getElementById("checkbox1");
    const quantity = document.getElementById("quantity");
    const quantityValue = quantity.value.trim();
    const location = document.querySelector('input[name="location"]:checked');

    if (!firstName.value.trim() || firstName.value.trim().length < 2) {
      showErrorMessage(
        firstName,
        "Veuillez entrer 2 caractères ou plus pour le champ du prénom."
      );
      isValid = false;
    }

    if (!lastName.value.trim() || lastName.value.trim().length < 2) {
      showErrorMessage(
        lastName,
        "Veuillez entrer 2 caractères ou plus pour le champ du nom."
      );
      isValid = false;
    }

    if (!email.value.trim() || !email.value.includes("@")) {
      showErrorMessage(email, "L'adresse e-mail est invalide.");
      isValid = false;
    }

    if (!birthdate.value.trim()) {
      showErrorMessage(birthdate, "Veuillez entrer votre date de naissance.");
      isValid = false;
    }

    if (!terms.checked) {
      showErrorMessage(
        terms,
        "Vous devez accepter les conditions d'utilisation.",
        true
      );
      isValid = false;
    }

    const numericQuantity = parseInt(quantityValue, 10);

    if (isNaN(numericQuantity) || numericQuantity < 0) {
      showErrorMessage(
        quantity,
        "Veuillez entrer un nombre valide de tournois."
      );
      isValid = false;
    }

    //   if (typeof quantity.value === "string" || isNaN(quantity.value) || quantity.value < 0) {
    //       showErrorMessage(quantity, 'Veuillez entrer un nombre valide de tournois.');
    //       isValid = false;
    //   }

    if (!location) {
      showErrorMessage(
        document.querySelector('input[name="location"]').parentElement,
        "Veuillez choisir une option de tournoi.",
        true
      );
      isValid = false;
    }

    return isValid;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      console.log("Le formulaire est valide.");
      modalBackground.style.display = "block"; // Afficher l'arrière-plan de la modal
      confirmationMessage.style.display = "flex"; // Assurez-vous que c'est 'flex' pour le montrer
    } else {
      console.log("Le formulaire contient des erreurs.");
    }
  });
});

// (form.reset()) après un certain délai ou lorsque la modal de confirmation est fermée,
// pour que l'utilisateur puisse soumettre à nouveau le formulaire si nécessaire.
