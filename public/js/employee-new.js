window.onload = init;

function init() {
  requireAuth();
  document.getElementById("employee-form").addEventListener("submit", onSubmit);
}

function onSubmit(event) {
  event.preventDefault();
  setMessage("");

  const data = {
    emp_name: document.getElementById("emp-name").value.trim(),
    emp_lastname: document.getElementById("emp-lastname").value.trim(),
    emp_phone: document.getElementById("emp-phone").value.trim(),
    emp_email: document.getElementById("emp-email").value.trim(),
    emp_address: document.getElementById("emp-address").value.trim(),
  };

  axios
    .post(API_URL + "/employee", data, authHeaders())
    .then(res => {
      if (res.data.code == 201) {
        setMessage("Empleado creado");
        setTimeout(() => {
          window.location.href = "employees.html";
        }, 700);
        return;
      }
      setMessage("No se pudo crear el empleado");
    })
    .catch(err => {
      if (handleAuthError(err)) return;
      setMessage("Error al crear empleado");
    });
}

function setMessage(text) {
  const el = document.getElementById("message");
  if (el) el.textContent = text || "";
}
