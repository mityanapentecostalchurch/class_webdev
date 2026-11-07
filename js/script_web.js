document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript is connected. The Week 4 page is ready.");


       // 0. RESPONSIVE MOBILE NAVIGATION
    // Concepts: DOM selection, click event, classList.toggle,
    // attributes and responsive CSS.
       const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const menuIsOpen = navLinks.classList.toggle("is-open");
            menuToggle.setAttribute("aria-expanded", String(menuIsOpen));
            menuToggle.querySelector(".menu-label").textContent =
                menuIsOpen ? "Close menu" : "Menu";
        });

        // Close the mobile menu after a visitor selects a section.
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.querySelector(".menu-label").textContent = "Menu";
            });
        });
    }

       // 1. HELPER: display a message in a page element
       function showMessage(elementId, message, messageType) {
        const element = document.getElementById(elementId);
        if (!element) return;

        element.textContent = message;
        element.classList.remove("success-message", "error-message");

        if (messageType) {
            element.classList.add(messageType);
        }
    }

       // 2. REGISTRATION FORM
    // Concepts: DOM selection, submit event, preventDefault,
    // variables, conditions, arrays, template strings.
       const registrationForm = document.getElementById("registrationForm");

    if (registrationForm) {
        const dobInput = document.getElementById("date-of-birth");
        const ageInput = document.getElementById("age");
        const commentsInput = document.getElementById("comments");
        const commentsCounter = document.getElementById("commentsCounter");

        // Do not allow a date of birth in the future.
        if (dobInput) {
            dobInput.max = new Date().toISOString().split("T")[0];
        }

        // Live character counter for additional comments.
        if (commentsInput && commentsCounter) {
            commentsInput.addEventListener("input", function () {
                commentsCounter.textContent =
                    `${commentsInput.value.length} / 500 characters`;
            });
        }

        registrationForm.addEventListener("submit", function (event) {
            // Stop the browser from reloading/submitting to a server.
            event.preventDefault();

            const fullName = document.getElementById("full-name").value.trim();
            const regNumber = document.getElementById("registration-number").value.trim();
            const email = document.getElementById("email").value.trim();
            const age = Number(ageInput.value);
            const programme = document.getElementById("programme").value;

            const selectedStudyMode =
                document.querySelector('input[name="study-mode"]:checked');

            const selectedInterests =
                document.querySelectorAll('input[name="interest"]:checked');

            // Additional JavaScript checks.
            if (dobInput.value) {
                const dateOfBirth = new Date(dobInput.value + "T00:00:00");
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (dateOfBirth > today) {
                    showMessage(
                        "registrationMessage",
                        "Date of birth cannot be in the future.",
                        "error-message"
                    );
                    dobInput.focus();
                    return;
                }
            }

            if (age < 16 || age > 100 || !Number.isFinite(age)) {
                showMessage(
                    "registrationMessage",
                    "Please enter an age between 16 and 100.",
                    "error-message"
                );
                ageInput.focus();
                return;
            }

            if (!selectedStudyMode) {
                showMessage(
                    "registrationMessage",
                    "Please select a study mode.",
                    "error-message"
                );
                return;
            }

            // Collect selected interests into an array.
            const interests = [];
            selectedInterests.forEach(function (checkbox) {
                interests.push(checkbox.value);
            });

            const interestText = interests.length
                ? interests.join(", ")
                : "No interests selected";

            // Show a confirmation on the page. No password is displayed.
            const confirmation =
                `Thank you, ${fullName}. Your registration details have passed the browser checks. ` +
                `Registration number: ${regNumber}. Programme: ${programme}. ` +
                `Study mode: ${selectedStudyMode.value}. Interests: ${interestText}. ` +
                `Email: ${email}. This is a demonstration only; no record has been saved.`;

            showMessage("registrationMessage", confirmation, "success-message");
            console.log("Registration form checked for:", fullName);
        });

        // Clear feedback message and counter when the form is reset.
        registrationForm.addEventListener("reset", function () {
            showMessage("registrationMessage", "", "");
            window.setTimeout(function () {
                if (commentsCounter) {
                    commentsCounter.textContent = "0 / 500 characters";
                }
            }, 0);
        });
    }

       // 3. SHOW / HIDE PASSWORD
    // Concepts: click event, input type, condition.
       const passwordInput = document.getElementById("password");
    const togglePasswordButton = document.getElementById("togglePassword");

    if (passwordInput && togglePasswordButton) {
        togglePasswordButton.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePasswordButton.textContent = "Hide password";
            } else {
                passwordInput.type = "password";
                togglePasswordButton.textContent = "Show password";
            }
        });
    }

       // 4. WEBSITE FEEDBACK FORM
    // Concepts: form event, DOM, conditions, selected radio input.
       const feedbackForm = document.getElementById("feedbackForm");

    if (feedbackForm) {
        const feedbackText = document.getElementById("feedback-message");
        const feedbackCounter = document.getElementById("feedbackCounter");

        if (feedbackText && feedbackCounter) {
            feedbackText.addEventListener("input", function () {
                feedbackCounter.textContent =
                    `${feedbackText.value.length} / 500 characters`;
            });
        }

        feedbackForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const visitorName = document.getElementById("visitor-name").value.trim();
            const rating = document.getElementById("rating").value;
            const recommendation =
                document.querySelector('input[name="recommend"]:checked');

            if (!recommendation) {
                showMessage(
                    "feedbackMessage",
                    "Please indicate whether you would recommend this website.",
                    "error-message"
                );
                return;
            }

            showMessage(
                "feedbackMessage",
                `Thank you, ${visitorName}. Your rating was "${rating}". ` +
                `Recommendation: ${recommendation.value}. Your feedback passed the browser checks. ` +
                `It has not been sent to a server or stored.`,
                "success-message"
            );

            console.log("Feedback form checked for:", visitorName);
        });

        feedbackForm.addEventListener("reset", function () {
            showMessage("feedbackMessage", "", "");
            window.setTimeout(function () {
                if (feedbackCounter) {
                    feedbackCounter.textContent = "0 / 500 characters";
                }
            }, 0);
        });
    }

       // 5. HTML VALIDATION DEMONSTRATION
    // The browser first checks required, email, min, max and
    // minlength attributes. This event runs after those checks pass.
       const validationForm = document.getElementById("validationForm");

    if (validationForm) {
        validationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("required-name").value.trim();

            showMessage(
                "validationMessage",
                `Well done, ${name}. The browser accepted the required name, email, age and password fields.`,
                "success-message"
            );
        });

        validationForm.addEventListener("reset", function () {
            showMessage("validationMessage", "", "");
        });
    }

       // 6. BUTTON EXAMPLES
    // Concepts: click events and reusable functions.
       const normalButton = document.getElementById("exampleNormalButton");
    const submitDemoButton = document.getElementById("exampleSubmitButton");
    const resetDemoButton = document.getElementById("exampleResetButton");

    if (normalButton) {
        normalButton.addEventListener("click", function () {
            showMessage(
                "exampleButtonMessage",
                "The normal button was clicked. JavaScript responded to the click event.",
                "success-message"
            );
        });
    }

    if (submitDemoButton) {
        submitDemoButton.addEventListener("click", function () {
            showMessage(
                "exampleButtonMessage",
                "This is a demonstration button. A real submit button should be placed inside a form.",
                "success-message"
            );
        });
    }

    if (resetDemoButton) {
        resetDemoButton.addEventListener("click", function () {
            const exampleSection = document.getElementById("examples");
            const fields = exampleSection.querySelectorAll("input, select, textarea");

            fields.forEach(function (field) {
                if (field.type === "checkbox" || field.type === "radio") {
                    field.checked = false;
                } else {
                    field.value = "";
                }
            });

            showMessage(
                "exampleButtonMessage",
                "The example controls have been cleared using JavaScript.",
                "success-message"
            );
        });
    }
});
