// Tu peux ajouter des animations ici plus tard
console.log("Page chargée : prêt à hanter 👻");

// Affiche ou cache le menu déroulant
document.getElementById("filterButton").addEventListener("click", () => {
  const dropdown = document.getElementById("dropdownContent");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// Fermer le menu si on clique ailleurs
document.addEventListener("click", function (e) {
  const filterBtn = document.getElementById("filterButton");
  const dropdown = document.getElementById("dropdownContent");
  if (!filterBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".dropdown-content input[type='checkbox']");
  const ghostCards = document.querySelectorAll(".ghost-card");

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const selectedProofs = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.parentElement.textContent.trim());

      ghostCards.forEach(card => {
        const cardProofs = card.getAttribute("data-preuves").split(",");
        const hasAllProofs = selectedProofs.every(p => cardProofs.includes(p));

        card.style.display = hasAllProofs ? "block" : "none";
      });
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".dropdown-content input[type='checkbox']");
  const ghostCards = document.querySelectorAll(".ghost-card");
  const searchBar = document.getElementById("searchBar");

  function applyFilters() {
    const selectedProofs = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.trim());

    const searchTerm = searchBar.value.toLowerCase().trim();

    ghostCards.forEach(card => {
      const ghostName = card.querySelector("h2").textContent.toLowerCase();
      const cardProofs = card.getAttribute("data-preuves").split(",").map(p => p.toLowerCase());

      // Vérifie si le fantôme a toutes les preuves cochées
      const hasAllProofs = selectedProofs.every(p => cardProofs.includes(p.toLowerCase()));

      // Vérifie si le nom du fantôme ou une preuve contient le texte recherché
      const matchesSearch =
        ghostName.includes(searchTerm) ||
        cardProofs.some(p => p.includes(searchTerm));

      // Affiche si ça correspond à TOUTES les preuves + une correspondance de recherche
      const show = hasAllProofs && (searchTerm === "" || matchesSearch);
      card.style.display = show ? "block" : "none";
    });
  }

  // Appliquer filtre à chaque changement
  checkboxes.forEach(cb => cb.addEventListener("change", applyFilters));
  searchBar.addEventListener("input", applyFilters);
});
