const button = document.querySelector(".button")
const password1 = document.querySelector(".password")
const password_rules = document.querySelector(".password-rules")
const message = password_rules.querySelector(".password_message")
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

let password_state = false
const eyeIcon = document.querySelector(".eye")

eyeIcon.addEventListener("click", () => {
  if (password1.type === "password") {
    // Show password
    password1.type = "text"
    eyeIcon.classList.toggle("fa-eye")
    eyeIcon.classList.toggle("fa-eye-slash")
  } else {
    // Hide password
    password1.type = "password"

    // Remove line
    eyeIcon.classList.toggle("fa-eye")
    eyeIcon.classList.toggle("fa-eye-slash")
  }
})

password1.addEventListener("input", () => {
  const password = document.querySelector(".password").value.trim()
  if (password_rules.style.display !== "block") {
    password_rules.style.display = "block"
  }
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,}$/

  if (passwordPattern.test(password)) {
    password_state = true
    message.innerHTML = "Strong Password"
    password_rules.style.color = "green"
  } else {
    password_state = false

    message.innerHTML = "This password is too Weak"
    password_rules.style.color = "red"
  }
})
const emailvalid = document.querySelector(".emailValid")


const API = "/api";
button.addEventListener("click", async (e) => {
  e.preventDefault()
  button.disabled = true
  const name = document.querySelector(".name").value.trim()
  const email = document.querySelector(".email").value.trim()
  const registration = document.querySelector(".registration").value.trim()
  const Password = document.querySelector(".password").value.trim()

  if (name && email && registration && Password) {
    if (!emailRegex.test(email)) {
      emailvalid.style.display = "block"
      emailvalid.innerHTML = "🔴 Email is not valid"
      emailvalid.style.color = "red"
    } else {
      emailvalid.style.display = "none"
      try {
        const { data } = await axios.post(
          `{API}/api/auth/signup,
          
          {
            Name: name,
            Email: email,
            password: Password,
          },
          {
            withCredentials: true,
          },
        )
       console.log(data)
        if (data.success) {
          alert(data.message)
          window.location.href = "/login.html"
        } else {
          alert(data.message)
        }
      } catch (error) {
        if (error.response) {
          // Server responded with error status (4xx / 5xx)
          console.log("Status:", error.response.status)
          console.log("Data:", error.response.data)

          alert(error.response.data.message || "Server error")
        } else if (error.request) {
          // Request sent but no response received
          alert("Server not responding")
        } else {
          // Something wrong in frontend code
          alert("Unexpected error: " + error.message)
        }
      } finally {
        button.disabled = false // unlock button
      }
    }
  } else {
    alert("Please fill all fields")
  }
})
