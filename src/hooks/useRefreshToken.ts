import axios from "../API/axios";
import { IAuth } from "./types";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post("/refresh", {
        withCredentials: true,
      });
      if (setAuth) {
        setAuth((prev: IAuth) => {
          return {
            ...prev,
            adminId: response.data.adminId,
            accessToken: response.data.accessToken,
          };
        });
      }
      return response.data.accessToken;
    } catch (err) {
      if (setAuth) {
        setAuth({});
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
