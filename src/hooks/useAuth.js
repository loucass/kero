import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  const [, setUser] = useLocalStorage("user", null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return { login, logout };
};
