document.addEventListener('DOMContentLoaded', function () {
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const closeModalBtn = document.querySelector(".close-modal-btn"); // Bouton de fermeture
  const form = document.getElementById('tournamentForm');
  const successMessage = document.createElement("div");
  successMessage.textContent = "Merci ! Votre réservation a été reçue.";
  successMessage.classList.add("success-message");
  successMessage.style.display = "none"; // Caché par défaut
  document.body.appendChild(successMessage); // Ajoute le message de succès au document

  // Fonction pour afficher la modale
  function launchModal() {
      modalbg.style.display = "block";
  }

  // Attacher l'événement click à chaque bouton pour lancer la modale
  modalBtn.forEach(btn => btn.addEventListener("click", launchModal));

  // Gestionnaire d'Événements pour Fermer la Modale
  closeModalBtn.addEventListener("click", function() {
      modalbg.style.display = "none";
  });

  // Fonction pour valider l'âge
  function isValidAge(birthdate) {
      const today = new Date();
      const birthDate = new Date(birthdate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age >= 18;
  }

  // Fonction pour afficher/effacer les erreurs
  function toggleError(field, isError) {
      if (isError) {
          field.classList.add("error");
      } else {
          field.classList.remove("error");
      }
  }

  // Fonction pour valider le formulaire
  function validate() {
      let isValid = true;

      const firstName = document.getElementById('first');
      const lastName = document.getElementById('last');
      const email = document.getElementById('email');
      const birthdate = document.getElementById('birthdate');
      const location = document.querySelector('input[name="location"]:checked');
      const terms = document.getElementById('checkbox1');
      const locationError = document.querySelector('.location-error');

      // Validation du prénom
      toggleError(firstName, firstName.value.trim().length < 2);

      // Validation du nom
      toggleError(lastName, lastName.value.trim().length < 2);

      // Validation de l'email
      toggleError(email, !email.value.trim() || !email.value.includes('@'));

      // Validation de la date de naissance pour +18 ans
      toggleError(birthdate, !isValidAge(birthdate.value));

      // Validation de la participation à un tournoi
      if (!location) {
          if (locationError) locationError.style.display = 'block';
          isValid = false;
      } else if (locationError) {
          locationError.style.display = 'none';
      }

      // Validation des conditions d'utilisation
      toggleError(terms, !terms.checked);

      // Mise à jour de la validité basée sur la présence d'erreurs
      isValid = !document.querySelectorAll('.error').length;

      return isValid;
  }

  // Gestion de la soumission du formulaire
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Empêcher la soumission par défaut
      const isValid = validate(); // Appelle la fonction validate()

      if (isValid) {
          console.log('Données du formulaire valides');
          successMessage.style.display = "block"; // Affiche le message de succès
          setTimeout(() => {
            successMessage.style.display = "none"; // Cache le message après 5 secondes
            modalbg.style.display = "none"; // Ferme la modale
            form.style.display = "none"; // Optionnel: Cachez le formulaire après la soumission réussie
        }, 5000);
          form.style.display = "none"; // Optionnel: Cachez le formulaire après la soumission réussie
          form.reset(); // Réinitialise le formulaire après la soumission réussie
      } else {
          console.log('Erreur de validation');
          // Ici, vous pouvez gérer les erreurs spécifiques et les afficher à l'utilisateur si nécessaire
      }
  });
});