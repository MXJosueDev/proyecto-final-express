window.onload = init;

function init() {
  requireAuth();

  document.getElementById("logout-btn").addEventListener("click", logout);
  document.getElementById("search-form").addEventListener("submit", onSearch);
  document.getElementById("clear-search").addEventListener("click", onClear);

  loadEmployees();
}

function loadEmployees() {
  setMessage("Cargando empleados...");

  axios
    .get(API_URL + "/employee", authHeaders())
    .then(res => {
      setMessage("");
      renderRows(res.data.message);
    })
    .catch(err => {
      if (handleAuthError(err)) return;
      setMessage("No se pudieron cargar los empleados");
    });
}

function onSearch(event) {
  event.preventDefault();
  const name = document.getElementById("search-name").value.trim();

  if (!name) {
    loadEmployees();
    return;
  }

  setMessage("Buscando...");

  axios
    .get(API_URL + "/employee/name/" + encodeURIComponent(name), authHeaders())
    .then(res => {
      const count = res.data.message.length;
      setMessage(count + " resultado(s)");
      renderRows(res.data.message);
    })
    .catch(err => {
      if (handleAuthError(err)) return;
      if (err.response && err.response.status === 404) {
        renderRows([]);
        setMessage("Sin resultados");
        return;
      }
      setMessage("Error en la busqueda");
    });
}

function onClear() {
  document.getElementById("search-name").value = "";
  loadEmployees();
}

function renderRows(rows) {
  const tbody = document.getElementById("employee-rows");
  tbody.innerHTML = "";

  if (!rows || rows.length === 0) {
    tbody.innerHTML = '<tr><td class="py-6 text-slate-500" colspan="7">Sin registros</td></tr>';
    return;
  }

  rows.forEach(emp => {
    tbody.innerHTML += `
      <tr class="border-t border-slate-100">
        <td class="py-3 pr-3">${emp.emp_id}</td>
        <td class="py-3 pr-3">${emp.emp_name}</td>
        <td class="py-3 pr-3">${emp.emp_lastname}</td>
        <td class="py-3 pr-3">${emp.emp_phone}</td>
        <td class="py-3 pr-3">${emp.emp_email}</td>
        <td class="py-3 pr-3">${emp.emp_address}</td>
        <td class="py-3">
          <div class="flex flex-wrap gap-2">
            <a
              class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:border-slate-300"
              href="employee-edit.html?id=${emp.emp_id}"
            >
              Editar
            </a>
            <button
              class="delete-btn rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:border-slate-300"
              data-id="${emp.emp_id}"
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", onDelete);
  });
}

function onDelete(event) {
  const id = event.currentTarget.dataset.id;
  if (!confirm("¿Eliminar empleado?")) return;

  axios
    .delete(API_URL + "/employee/" + id, authHeaders())
    .then(res => {
      if (res.data.code == 200) {
        setMessage("Empleado eliminado");
        loadEmployees();
        return;
      }
      setMessage("No se pudo eliminar el empleado");
    })
    .catch(err => {
      if (handleAuthError(err)) return;
      setMessage("Error al eliminar empleado");
    });
}

function setMessage(text) {
  const el = document.getElementById("message");
  if (el) el.textContent = text || "";
}
