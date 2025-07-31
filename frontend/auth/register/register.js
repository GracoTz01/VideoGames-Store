document.addEventListener("DOMContentLoaded", () => {

    const button = document.querySelector(".register-btn");
    const passwordInput =document.querySelector("#password");
    const eyeIcon =document.querySelector(".eye-icon");
    
        eyeIcon.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                eyeIcon.classList.add("active");
                
                eyeIcon.classList.remove("fa-eye");
                eyeIcon.classList.add("fa-eye-slash")
            } else {
                passwordInput.type = "password";
                eyeIcon.classList.remove("active");
                eyeIcon.classList.remove("fa-eye-slash");
                eyeIcon.classList.add("fa-eye")
            }
        });

    button.addEventListener("click", async (event) => {
        event.preventDefault();


        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const password = passwordInput.value.trim();
        


        if (!name || !email || !password) {
            alert("Please complete all fields.");
            return;
        }

        const data = {
            name: name,
            email: email,
            password: password,
        };

        try {

            const response = await fetch("http://localhost:3000/api/auth/register", {
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
            window.location.href = ".././login/login.html";

        } catch (error) {
            console.error("Error in registration:", error);
            alert("An error occurred while registering. Please try again later.");
        }

    });
});