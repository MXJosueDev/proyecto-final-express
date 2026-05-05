let employeeId = null;

window.onload = init;

function init() {
  requireAuth();

  const params = new URLSearchParams(window.location.search);
  employeeId = params.get("id");

  if (!employeeId) {
    window.location.href = "employees.html";
    return;
  }

  document.getElementById("employee-form").addEventListener("submit", onSubmit);
  loadEmployee();
}

function loadEmployee() {
  axios
    .get(API_URL + "/employee/" + employeeId, authHeaders())
    .then(res => {
      const emp = res.data.message;
      document.getElementById("emp-name").value = emp.emp_name || "";
      document.getElementById("emp-lastname").value = emp.emp_lastname || "";
      document.getElementById("emp-phone").value = emp.emp_phone || "";
      document.getElementById("emp-email").value = emp.emp_email || "";
      document.getElementById("emp-address").value = emp.emp_address || "";
    })
    .catch(err => {
      if (handleAuthError(err)) return;
      setMessage("No se pudo cargar el empleado");
    });
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
    .put(API_URL + "/employee/" + employeeId, data, authHeaders())
    .then(res => {
      if (res.data.code == 200) {
        setMessage("Empleado actualizado");
        setTimeout(() => {
          window.location.href = "employees.html";
        }, 700);
        return;
      }
      setMessage("No se pudo actualizar el empleado");
    })
    .catch(err => {
      if (handleAuthError(err)) return;
      setMessage("Error al actualizar empleado");
    });
}

function setMessage(text) {
  const el = document.getElementById("message");
  if (el) el.textContent = text || "";
}
