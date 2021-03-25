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
  padding-left: 2%;
`;

export const Title = styled.h1`
  color: #333;
`;

export const Main = styled.main`
  margin: 2%;
`;

export const UploadBox = styled.form`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 45vw;
  padding: 1%;
  border-radius: 8px;
  border: 2px solid #20fc8f;
  margin-bottom: 2%;
  @media (max-width: 1000px) {
    padding: 1.5%;
    width: 80vw;
  }
  @media (max-width: 576px) {
    padding: 2.5%;
    width: 90vw;
    margin-bottom: 4%;
    flex-direction: column;
  }
`;

export const UploadText = styled.span`
  font-weight: bold;
  font-size: 150%;
`;

export const UploadInput = styled.input`
  padding: 1%;
  margin-left: 8px;
  outline: none;
  border: 2px solid #20fc8f;
  color: #333;
  padding: 1.5%;
  border-radius: 4px;
  @media (max-width: 576px) {
    margin: 8px;
  }
`;

export const UploadSelect = styled.select`
  border: 2px solid #20fc8f;
  background-color: #fff;
  border-radius: 4px;
  outline: none;
  padding: 1.5%;
`;

export const UploadButton = styled.label`
  background-color: #20fc8f;
  border: 2px solid #20fc8f;
  font-family: sans-serif;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  padding: 1.5%;
  color: #333;
  margin: 8px;
  @media (max-width: 576px) {
    margin: 8px;
  }
`;

export const UploadSubmit = styled.button`
  background-color: #20fc8f;
  border: 8px solid #20fc8f;
  border-radius: 4px;
  margin-left: 8px;
  padding: 1.5%;
  outline: none;
  border: 0px;
  color: #333;
`;

export const FileName = styled.span`
  display: block;
  font-weight: bold;
  text-transform: uppercase;
`;

export const ConfBox = styled.div`
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  padding: 2%;
  margin-bottom: 1%;
`;

export const ShowFiles = styled.div`
  display: flex;
  flex: 1;
  width: 60vw;
`;
