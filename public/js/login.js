window.onload = init;

function init() {
  if (getToken()) {
    window.location.href = "employees.html";
    return;
  }

  const form = document.getElementById("login-form");
  form.addEventListener("submit", onLogin);
}

function onLogin(event) {
  event.preventDefault();
  setMessage("");

  const user_mail = document.getElementById("input-mail").value.trim();
  const user_password = document.getElementById("input-password").value.trim();

  axios
    .post(API_URL + "/user/login", { user_mail, user_password })
    .then(res => {
      if (res.data.code == 200) {
        localStorage.setItem("token", res.data.message);
        window.location.href = "employees.html";
      } else {
        setMessage("Usuario y/o contrasena incorrectos");
      }
    })
    .catch(() => {
      setMessage("Error al iniciar sesion");
    });
}

function setMessage(text) {
  const el = document.getElementById("message");
  if (el) el.textContent = text || "";
}
