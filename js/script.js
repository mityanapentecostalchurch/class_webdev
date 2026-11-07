// ICT 2102: JavaScript practical examples
// Concepts: variables, constants, functions, DOM, events, conditions and form validation.

document.addEventListener("DOMContentLoaded", function () {
  // 1. VARIABLE, DATE OBJECT AND DOM MANIPULATION: update the copyright year.
  const yearElement = document.getElementById("current-year");
  const currentYear = new Date().getFullYear();
  yearElement.textContent = currentYear;

  // 2. FUNCTION AND CLICK EVENT: respond when the welcome button is clicked.
  function showWelcomeMessage() {
    alert("Welcome to Bright Future Learning Centre!");
  }
  document.getElementById("welcome-button").addEventListener("click", showWelcomeMessage);

  // 3. MOBILE NAVIGATION: JavaScript toggles a CSS class when the menu is clicked.
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("primary-navigation");

  menuButton.addEventListener("click", function () {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✕ Close" : "☰ Menu";
  });

  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰ Menu";
    });
  });

  // 4. DOM SELECTION, LOOP, CONDITIONS AND EVENTS: search/filter course cards.
  const searchInput = document.getElementById("course-search");
  const categorySelect = document.getElementById("course-category");
  const courseCards = document.querySelectorAll(".course-card");
  const resultMessage = document.getElementById("course-result");
  const noResults = document.getElementById("no-results");

  function filterCourses() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const chosenCategory = categorySelect.value;
    let visibleCount = 0;

    courseCards.forEach(function (card) {
      const cardText = card.textContent.toLowerCase();
      const cardCategory = card.dataset.category;
      const matchesText = cardText.includes(searchTerm);
      const matchesCategory = chosenCategory === "all" || cardCategory === chosenCategory;

      if (matchesText && matchesCategory) {
        card.hidden = false;
        visibleCount++;
      } else {
        card.hidden = true;
      }
    });

    resultMessage.textContent = "Showing " + visibleCount + " of " + courseCards.length + " courses.";
    noResults.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener("input", filterCourses);
  categorySelect.addEventListener("change", filterCourses);

  document.getElementById("clear-search").addEventListener("click", function () {
    searchInput.value = "";
    categorySelect.value = "all";
    filterCourses();
    searchInput.focus();
  });

  // 5. INPUT EVENT: count the characters typed in the message textarea.
  const messageInput = document.getElementById("message");
  const characterCount = document.getElementById("character-count");

  function updateCharacterCount() {
    characterCount.textContent = messageInput.value.length + " / 250 characters";
  }
  messageInput.addEventListener("input", updateCharacterCount);

  // 6. FORM SUBMISSION, CONDITIONS AND VALIDATION.
  const form = document.getElementById("registration-form");
  const feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload while practising front-end JavaScript.

    const name = document.getElementById("full-name").value.trim();
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    const course = document.getElementById("selected-course").value;

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const courseError = document.getElementById("course-error");

    nameError.textContent = "";
    emailError.textContent = "";
    courseError.textContent = "";
    feedback.textContent = "";
    feedback.className = "form-feedback";

    let valid = true;

    if (name.length < 3) {
      nameError.textContent = "Enter a name containing at least 3 characters.";
      valid = false;
    }
    if (email === "" || !emailInput.checkValidity()) {
      emailError.textContent = "Enter a valid email address.";
      valid = false;
    }
    if (course === "") {
      courseError.textContent = "Please select a course.";
      valid = false;
    }

    if (valid) {
      feedback.textContent = "Thank you, " + name + ". Your interest in " + course + " has been recorded for this demonstration.";
      feedback.classList.add("success");
      form.reset();
      updateCharacterCount();
    } else {
      feedback.textContent = "Please correct the highlighted fields and submit the form again.";
      feedback.classList.add("error");
    }
  });

  form.addEventListener("reset", function () {
    nameErrorClear();
    feedback.textContent = "";
    feedback.className = "form-feedback";
    updateCharacterCount();
  });

  function nameErrorClear() {
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("course-error").textContent = "";
  }

  // 7. CONSOLE OUTPUT: students can inspect this using browser Developer Tools.
  console.log("Bright Future JavaScript has loaded.");
  console.log("Number of course cards:", courseCards.length);
});
