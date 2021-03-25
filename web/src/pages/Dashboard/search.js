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
  ShowFiles,
  UploadButton,
  UploadSelect,
} from "./style";
import api from "../../services/api";
import { List } from "semantic-ui-react";
import axios from "axios";
import FileDownload from "js-file-download";

export default function Dashboard({ match }) {
  const id = match.params.type;
  console.log(match.params);
  const [userdata, setUser] = useState({});
  const [arg, setFile] = useState([]);

  useEffect(() => {
    async function GetData() {
      try {
        var response = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setUser(response.data);
        response = await api.get(`/files/type/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setFile(response.data.reverse());
      } catch (err) {}
    }
    GetData();
  }, []);

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

  return (
    <Container>
      <Header>
        <Title>{userdata.name} - Dashboard</Title>
      </Header>
      <Main>
        <h2>Arquivos</h2>
        <ShowFiles>
          <List divided relaxed>
            {arg.map((item) => (
              <>
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
              </>
            ))}
          </List>
        </ShowFiles>
      </Main>
    </Container>
  );
}
