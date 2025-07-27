import AuthForm from "../components/AuthForm";
import axios from "axios";
import type LoginResponse from "../interfaces/LoginResponse";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../api/ApiRoutes";

export default function SignUp() {
  const navigate = useNavigate();

  async function onSignUpSubmit(userName: string, password: string) {
    try {
      const response = await axios.post<LoginResponse>(
        ApiRoutes.auth.signup,
        {
          userName: userName,
          password: password,
        },
        { withCredentials: true }
      );

      // Show alert message
      console.log(response.data.message);

      navigate("/");
    } catch (error) {
      // Show alert message
      console.log(error);
    }
  }

  return (
    <AuthForm
      title="Weather App"
      primaryButtonTitle="Sign Up"
      secondaryText="Already have an account?"
      secondaryButtonTitle="Login"
      secondaryButtonDestination="/login"
      onSubmit={onSignUpSubmit}
    />
  );
}
