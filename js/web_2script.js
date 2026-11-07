// ICT 2102: Week 4 JavaScript Practical

// 1. MOBILE MENU
const menuButton = document.getElementById("menuToggle");
const menuLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", function () {
    menuLinks.classList.toggle("is-open");
});

// Close the menu after clicking a link.
const links = menuLinks.querySelectorAll("a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        menuLinks.classList.remove("is-open");
    });
});


// 2. SHOW AND HIDE PASSWORD
const password = document.getElementById("password");
const passwordButton = document.getElementById("togglePassword");

passwordButton.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        passwordButton.textContent = "Hide password";
    } else {
        password.type = "password";
        passwordButton.textContent = "Show password";
    }
});


// 3. REGISTRATION FORM
const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("full-name").value;
    const age = document.getElementById("age").value;
    const programme = document.getElementById("programme").value;

    if (age < 16 || age > 100) {
        document.getElementById("registrationMessage").textContent =
            "Age must be between 16 and 100.";
    } else {
        document.getElementById("registrationMessage").textContent =
            "Thank you " + name + ". Your " + programme +
            " registration has been checked.";
    }
});


// 4. COUNT CHARACTERS IN REGISTRATION COMMENTS
const comments = document.getElementById("comments");
const commentsCounter = document.getElementById("commentsCounter");

comments.addEventListener("input", function () {
    commentsCounter.textContent =
        comments.value.length + " / 500 characters";
});


// 5. WEBSITE FEEDBACK FORM
const feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const visitorName = document.getElementById("visitor-name").value;

    document.getElementById("feedbackMessage").textContent =
        "Thank you for your feedback, " + visitorName + ".";
});


// 6. COUNT CHARACTERS IN FEEDBACK
const feedbackText = document.getElementById("feedback-message");
const feedbackCounter = document.getElementById("feedbackCounter");

feedbackText.addEventListener("input", function () {
    feedbackCounter.textContent =
        feedbackText.value.length + " / 500 characters";
});


// 7. HTML VALIDATION DEMONSTRATION
const validationForm = document.getElementById("validationForm");

validationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentName = document.getElementById("required-name").value;

    document.getElementById("validationMessage").textContent =
        "Well done, " + studentName + ". The form is valid.";
});


// 8. EXAMPLE BUTTONS
document.getElementById("exampleNormalButton").addEventListener("click", function () {
    document.getElementById("exampleButtonMessage").textContent =
        "You clicked the normal button.";
});

document.getElementById("exampleSubmitButton").addEventListener("click", function () {
    document.getElementById("exampleButtonMessage").textContent =
        "This is an example button.";
});

document.getElementById("exampleResetButton").addEventListener("click", function () {
    const fields = document.querySelectorAll(
        "#examples input, #examples select, #examples textarea"
    );

    fields.forEach(function (field) {
        if (field.type === "checkbox" || field.type === "radio") {
            field.checked = false;
        } else {
            field.value = "";
        }
    });

    document.getElementById("exampleButtonMessage").textContent =
        "The example fields have been cleared.";
});


// 9. DISPLAY A MESSAGE IN THE CONSOLE
console.log("JavaScript is working!");
