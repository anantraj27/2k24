const API = "/api";

const email = document.querySelector(".email")
const password =document.querySelector(".password")
const login = document.querySelector(".login")
login.addEventListener('click', async (e) => {
    e.preventDefault(); // 👈 Sabse important! Page ko reload hone se rokta hai

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    try {
        const response = await axios.post(
            `${API}/auth/signin`,
            {
                Email: emailValue, // Match backend usernameField
                password: passwordValue
            },
            { withCredentials: true }
        );

        // Axios response data ko 'data' property mein rakhta hai
        const result = response.data;
         console.log(result);
        if (result.success) {
            console.log("Login Success!");
            sessionStorage.setItem("username", result.name);
            window.location.href = "/home.html"; // Redirect to home
        } else {
            // Yeh tab chalega jab success: false ho
            alert("Login failed: " + result.message);
            window.location.href = '/login.html';
        }

    } catch (error) {
        // Agar status 401 (Unauthorized) aata hai toh error block mein jayega
        if (error.response) {
            alert(error.response.data.message || "Invalid Email or Password");
        } else {
            alert("Server not responding");
        }
    }
});