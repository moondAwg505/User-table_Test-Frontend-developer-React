import { useState, useEffect } from "react";
import { buildUsersUrl } from "../utils/buildUsersUrl";
import { fetchUsers } from "../api/usersApi";

export function useUsers({ sort, filters, page, limit }) {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const url = buildUsersUrl({
          sortBy: sort.field,
          order: sort.order,
          page,
          limit,
          filters,
        });
        const data = await fetchUsers(url, controller.signal);
        setUsers(data.users);
        setTotal(data.total);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [sort.field, sort.order, page, limit, filters.name, filters.gender]);

  return { users, total, loading, error };
}
