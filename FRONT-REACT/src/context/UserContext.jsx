import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const UserContext = createContext();

const api = axios.create({
  baseURL: "http://localhost:3000",
});


const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
    if (token) localStorage.removeItem("token");
  }
  return config;
});


const BASE_PATH = "/usuarios";
const BASE_PATH_ROLES  = "/roles";
const BASE_PATH_REGISTER = "/auth/register"

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resolveData = (responseData) => {
    if (Array.isArray(responseData)) return responseData;
    if (Array.isArray(responseData?.data)) return responseData.data;
    return responseData?.data ?? responseData ?? [];
  };

  const getRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(BASE_PATH_ROLES);
      setRoles(resolveData(data));  
    } catch (error) {
      setError(error.message || "Error al obtener roles");
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(BASE_PATH);
      setUsers(resolveData(data));
    } catch (e) {
      setError(e.message || "Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (newUser) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post(BASE_PATH_REGISTER, newUser);
      const created = resolveData(data);
      
      const item = Array.isArray(created) ? created[0] : created;
      setUsers((prev) => (Array.isArray(prev) ? [...prev, item] : [item]));
    } catch (e) {
      setError(e.message || "Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  const editUser = async (id, updated) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.put(`${BASE_PATH}/${id}`, updated);
      console.log("data",data);
      console.log("update", updated);
      const saved = resolveData(data) || updated;
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...saved, id } : u))
      );
    } catch (e) {
      setError(e.message || "Error al actualizar usuario");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setError(null);
    try {
      await api.delete(`${BASE_PATH}/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      setError(e.message || "Error al eliminar usuario");
    }
  };

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  return (
    <UserContext.Provider
      value={{ 
        users, 
        loading, 
        error,
        roles, 
        getUsers,
        getRoles, 
        addUser, 
        editUser, 
        deleteUser 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
