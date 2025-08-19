import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/auth";
import axios from "axios";
import ApiRoutes from "../api/ApiRoutes";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    performLogout();
  }, []);

  async function performLogout() {
    try {
      await axios.post(ApiRoutes.auth.logout, {}, { withCredentials: true });
      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return null;
}
