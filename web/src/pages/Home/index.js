import React, { useState } from "react";
import {
  BoxError,
  Container,
  LoginBox,
  LoginButton,
  LoginContainer,
  LoginInput,
  LoginTitle,
} from "./style";
import api from "../../services/api";

export default function Home({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.get("/login", {
        auth: {
          username: username,
          password: password,
        },
      });
      localStorage.setItem("jwt", response.data.token);
      history.push("/dashboard");
    } catch (err) {
      setErro(true);
      setTimeout(() => {
        setErro(false);
      }, 2000);
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <LoginBox>
          <LoginContainer>
            <LoginTitle>Login</LoginTitle>
            <LoginInput
              placeholder="Email de usuario"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <LoginInput
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <LoginButton type="submit">Login</LoginButton>
          </LoginContainer>
          {erro && <BoxError>Email ou senha incorretos</BoxError>}
        </LoginBox>
      </form>
    </Container>
  );
}
