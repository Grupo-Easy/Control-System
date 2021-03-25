import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Title,
  Main,
  UploadBox,
  UploadText,
  UploadInput,
  UploadSubmit,
  UploadButton,
  UploadSelect,
  ConfBox,
  FileName,
} from "./style";
import api from "../../services/api";
import { List } from "semantic-ui-react";
import axios from "axios";
import FileDownload from "js-file-download";

export default function Dashboard() {
  const [userdata, setUser] = useState({});
  const [files, setFiles] = useState();
  const [status, setStatus] = useState(false);
  const [arg, setFile] = useState([]);
  const [name, setName] = useState("");
  const [typeId, setTypeID] = useState();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function GetData() {
      try {
        var response = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setUser(response.data);
        response = await api.get("/files", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setFile(response.data);
        response = await api.get("/types", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setTypes(response.data);
      } catch (err) {}
    }
    GetData();
  }, []);

  function handleFile(e) {
    let localFile = e.target.files[0];
    setFiles(localFile);
  }

  const downloadFile = async (fileUrl, namefile) => {
    // Get the file name

    // The path of the downloaded file on our machine
    try {
      const response = await axios({
        method: "GET",
        url: fileUrl,
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      FileDownload(response.data, namefile);
    } catch (err) {
      throw new Error(err);
    }
  };

  async function handleSubmit(e) {
    let formdata = new FormData();
    const localFile = files;
    formdata.append("file", localFile);

    e.preventDefault();
    console.log(e.target.files);
    await api.post("/files", formdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        name: name,
        type: typeId,
      },
    });
    setStatus(true);
    setInterval(() => {
      setStatus(false);
      window.location.reload();
    }, 2000);
  }

  return (
    <Container>
      <Header>
        <Title>{userdata.name} - Dashboard</Title>
      </Header>
      <Main>
        <UploadBox onSubmit={handleSubmit} enctype="multipart/form-data">
          <UploadText>Upload </UploadText>
          <UploadInput
            type="text"
            placeholder="Nome do arquivo"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <UploadInput
            type="file"
            id="file"
            name="file"
            onChange={(e) => handleFile(e)}
            hidden
          />
          <UploadButton for="file">Selecionar arquivo</UploadButton>
          <UploadSelect
            value={typeId}
            onChange={(e) => {
              console.log(e.target.value);
              setTypeID(e.target.value);
            }}
          >
            <option value="" disabled selected>
              Selecione uma categoria
            </option>
            {types.map((item) => (
              <option value={`${item.id}`} key={item.id}>
                {item.name}
              </option>
            ))}
          </UploadSelect>
          <UploadSubmit type="submit">Enviar</UploadSubmit>
        </UploadBox>
        {status && (
          <>
            <span>OK</span>
          </>
        )}
        <ConfBox>
          <FileName>Arquivos</FileName>
          <List divided relaxed>
            {arg.map((item) => (
              <List.Item key={item.name}>
                <List.Icon
                  name={item.icon}
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header
                    as="a"
                    onClick={() => {
                      downloadFile(
                        `${process.env.REACT_APP_API}/files${item.link}`,
                        `${item.link.replace("/", "")}`
                      );
                    }}
                  >
                    {item.name}
                  </List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </ConfBox>
        <ConfBox>
          <FileName>Tipos de arquivos</FileName>
          <List divided relaxed>
            {types.map((item) => (
              <List.Item key={item.id}>
                <List.Content>
                  <List.Header href={`/dashboard/${item.name}`} as="a">
                    {item.name}
                  </List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </ConfBox>
      </Main>
    </Container>
  );
}
