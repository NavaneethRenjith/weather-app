import axios from "axios";
import AuthForm from "../components/AuthForm";
import type LoginResponse from "../interfaces/LoginResponse";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../api/ApiRoutes";
import { useAuthStore } from "../store/auth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  async function onLoginSubmit(userName: string, password: string) {
    try {
      const response = await axios.post<LoginResponse>(
        ApiRoutes.auth.login,
        {
          userName: userName,
          password: password,
        },
        { withCredentials: true }
      );

      // Show alert message
      console.log(response.data.message);

      login();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthForm
      title="Weather App"
      primaryButtonTitle="Login"
      secondaryText="Dont have an account?"
      secondaryButtonTitle="Sign Up"
      secondaryButtonDestination="/signup"
      onSubmit={onLoginSubmit}
    />
  );
}
