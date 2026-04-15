const API = "/api";
login.addEventListener('click', async (e) => {

  
    try {
        const  {data}  = await axios.post(
            `${API}/auth/signin`,
         
            {
                withCredentials: true
            }
        );
       
   
        if (data.success) {
           sessionStorage.setItem("username", data.name);
            window.location.href = "/home.html";
        } else {
            window.location.href ='/login.html'
            alert("Hey user 🤗 we couldn't find your account. Please log in. If you're new, go back 🔙 and register first.");
        }

    } catch (error) {
            if (error.response) {
        // Server responded with error status (4xx / 5xx)
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);

        alert(error.response.data.message || "Server error");

    } else if (error.request) {
        // Request sent but no response received
        alert("Server not responding");

    } else {
        // Something wrong in frontend code
        alert("Unexpected error: " + error.message);
    }
    }
});
