// Фильтрация по возрасту и телефону на нескольких, уже отрисованных страницах
export function applyClientFilters(users, filters) {
  return users.filter((user) => {
    if (filters.age && Number(filters.age) !== user.age) {
      return false;
    }
    if (filters.tel && !user.phone.includes(filters.tel)) {
      return false;
    }
    return true;
  });
}
