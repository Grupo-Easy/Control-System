import styled from "styled-components";
import { lighten, darken } from "polished";

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 16px;
  width: 30vw;
  height: 70vh;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  @media (max-width: 1000px) {
    width: 45vw;
    height: 60vh;
  }
  @media (max-width: 576px) {
    width: 80vw;
    height: 60vh;
  }
`;

export const LoginTitle = styled.h1`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.75rem;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  height: 55vh;
  @media (max-width: 1000px) {
    width: 35vw;
    height: 40vh;
  }
`;

export const LoginInput = styled.input`
  border: 2px solid ${lighten(0.5, "#333")};
  background-color: none;
  border-radius: 25px;
  margin-bottom: 20px;
  transition: 0.3s ease-in;
  text-align: center;
  padding: 2.5%;
  outline: none;
  width: 15vw;
  height: 2vh;
  color: #333;

  @media (max-width: 1000px) {
    width: 25vw;
    height: 2.5vh;
  }

  @media (max-width: 576px) {
    width: 50vw;
    height: 4vh;
  }

  &:hover {
    transition: 0.3s ease-in;
    box-shadow: 0px 0px 8px rgba(32, 252, 143, 0.4);

    border: 2px solid ${darken(0.1, "#20fc8f")};
  }
`;

export const LoginButton = styled.button`
  box-shadow: 0px 0px 8px rgba(32, 252, 143, 0.4);
  background-color: ${darken(0.125, "#20fc8f")};
  border: 2px solid ${darken(0.2, "#20fc8f")};
  justify-content: center;
  transition: 0.3s all;
  border-radius: 25px;
  align-items: center;
  font-weight: bold;
  font-size: 120%;
  outline: none;
  display: flex;
  padding: 4.5%;
  border: 0px;
  color: #f8f8f8;
  width: 15vw;
  height: 2vh;

  &:hover {
    box-shadow: 0px 0px 8px rgba(32, 252, 143, 0.4);
    background-color: ${darken(0.2, "#20fc8f")};
    transition: 0.3s ease-in;
  }

  @media (max-width: 1000px) {
    width: 25vw;
    height: 2.5vh;
    padding: 5.5%;
  }

  @media (max-width: 576px) {
    width: 50vw;
    height: 4vh;
  }
`;

export const BoxError = styled.span`
  color: #f21b3f;
  margin-left: 1%;
  font-weight: bold;
  text-transform: uppercase;
`;
