const BASE_URL = "https://dummyjson.com";

// Получение данных в формате JSON
export async function fetchUsers(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Получение id пользователя
export async function fetchUsersByID(id, signal) {
  const res = await fetch(`${BASE_URL}/users/${id}`, { signal });
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }
  return res.json();
}
