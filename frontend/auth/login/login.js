document.addEventListener("DOMContentLoaded", () => {
    
    const button = document.querySelector(".login-btn");
    const passwordInput = document.querySelector("#password");
    const eyeIcon = document.querySelector(".eye-icon");

    eyeIcon.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.classList.add("active");

            eyeIcon.classList.remove("fa-eye");
            eyeIcon.classList.add("fa-eye-slash");
        } else {
            passwordInput.type = "password";
            eyeIcon.classList.remove("active");
            eyeIcon.classList.remove("fa-eye-slash");
            eyeIcon.classList.add("fa-eye");
        }
    });

    button.addEventListener("click", async (event) => {
        event.preventDefault();

        const email = document.querySelector("#email").value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please complete all fields.");
            return;
        }

        const data = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Error registering.");
                return;
            }

           alert("Successful registration.");
           window.location.href = ""

        } catch (error) {
            console.error("Error in login:", error);
            alert("An error ocurre while login.Please try again later.");
        }
    });
});