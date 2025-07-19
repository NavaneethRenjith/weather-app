import { Link } from "react-router-dom";
import type { AuthFormProps } from "../interfaces/Props";
import React, { useState } from "react";

export default function AuthForm({
  title,
  primaryButtonTitle,
  secondaryText,
  secondaryButtonTitle,
  secondaryButtonDestination,
  onSubmit,
}: AuthFormProps) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(userName, password);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <form className="login-form" method="POST" onSubmit={handleSubmit}>
          <h2 className="form-title">{title}</h2>

          <label>Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">{primaryButtonTitle}</button>

          <div>
            <p>{secondaryText}</p>
            <Link to={secondaryButtonDestination}>{secondaryButtonTitle}</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
