import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  background-color: #20fc8f;
  width: 100vw;
  height: 10vh;
  @media (max-height: 1080px) {
    height: 15vh;
    padding: 1.5%;
  }
  padding-left: 2%;
`;

export const Title = styled.h1`
  color: #333;
`;

export const Main = styled.main`
  margin: 2%;
`;

export const BoxContainer = styled.div``;

export const ConfBoxForm = styled.form`
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  padding: 2%;
  margin-bottom: 1%;
`;

export const ConfBox = styled.div`
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  padding: 2%;
  margin-bottom: 1%;
`;

export const ConfButton = styled.button`
  border: 2px solid #20fc8f;
  background-color: #20fc8f;
  border-radius: 6px;
  padding: 0.5%;
  outline: none;
  color: #333;
`;

export const BoxText = styled.span`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5%;
`;

export const BoxInput = styled.input`
  border: 2px solid #20fc8f;
  border-radius: 6px;
  margin-right: 0.5%;
  margin-left: 0.5%;
  outline: none;
  padding: 0.5%;
  color: #333;
`;

export const BoxSelect = styled.select`
  border: 2px solid #20fc8f;
  background-color: #fff;
  border-radius: 6px;
  padding: 0.5%;
  outline: none;
`;

export const BoxSuccess = styled.span`
  color: #20fc8f;
  margin-left: 1%;
  font-weight: bold;
  text-transform: uppercase;
`;

export const BoxError = styled.span`
  color: #f21b3f;
  margin-left: 1%;
  font-weight: bold;
  text-transform: uppercase;
`;

export const BoxContainerOfUsers = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.1%;
`;

export const BoxUserSpan = styled.span`
  color: #333;
  font-weight: bold;
`;

export const DeleteButton = styled.button`
  color: #fff;
  border: 0px;
  padding: 0.5%;
  border-radius: 6px;
  background-color: #f21b3f;
`;
