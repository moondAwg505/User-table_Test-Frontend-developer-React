const BASE_URL = "https://dummyjson.com/users";

// Формирует URL для запроса на основе переданных параметров
export function buildUsersUrl({ sortBy, order, page, limit, filters }) {
  const skip = (page - 1) * limit;
  const params = new URLSearchParams();
  params.set("limit", limit);
  params.set("skip", skip);

  if (sortBy) {
    params.set("sortBy", sortBy);
    params.set("order", order);
  }

  // Текстовый фильтр по имени -> эндпоинт /users/search (ищет по имени/фамилии сразу)
  if (filters?.name) {
    params.set("q", filters.name);
    return `${BASE_URL}/search?${params.toString()}`;
  }

  // Точный фильтр по полу -> эндпоинт /users/filter
  if (filters?.gender && filters.gender !== "Все") {
    params.set("key", "gender");
    params.set("value", filters.gender === "Мужской" ? "male" : "female");
    return `${BASE_URL}/filter?${params.toString()}`;
  }

  // Ни фильтра, ни поиска -> обычный список с сортировкой/пагинацией
  return `${BASE_URL}?${params.toString()}`;
}
