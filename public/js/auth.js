function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  return {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  };
}

function requireAuth() {
  if (!getToken()) {
    window.location.href = "index.html";
  }
}

function handleAuthError(err) {
  if (err && err.response && err.response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "index.html";
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
