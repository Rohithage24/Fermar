import axios from "axios";
import { useAuth } from "./AuthContext";

export const useAuthRequest = () => {
  const [auth] = useAuth();

  const get = async (url) => {
    return await axios.get(url, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
  };

  const post = async (url, data) => {
    return await axios.post(url, data, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
  };

  return { get, post };
};
