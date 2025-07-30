const password = document.querySelector("#password").value;
const name = document.querySelector("#name").value;
const email = document.querySelector("#email").value;
const button = document.querySelector(".register-btn");

button.addEventListener('click', async () => {
    // Crear el objeto data
    const data = { name, email, password };

    // Hacer la peticion
    const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body : JSON.stringify(data)
    });

    // Verificar si el resultado esta correcto
    // Operadores Logicos AND -> &&  OR -> || NOT -> !
    if (!response.ok) {
        console.log('SALIO MAL');
    }

    // COnvertir la respuesta a json
    const result = response.json();

    console.log(result);
});