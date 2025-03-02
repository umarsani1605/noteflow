const BASE_URL = 'https://notes-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  return localStorage.setItem('accessToken', accessToken);
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

async function getUserLogged() {
  const response = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson;
}

async function addNote({ title, body }) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson;
}

async function getActiveNotes() {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson;
}

async function getArchivedNotes() {
  const response = await fetch(`${BASE_URL}/notes/archived`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson;
}

async function getNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson;
}

async function archiveNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson;
}

async function unarchiveNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson;
}

async function deleteNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson;
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
