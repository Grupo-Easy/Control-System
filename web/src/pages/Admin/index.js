import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import {
  Container,
  Header,
  Main,
  BoxSuccess,
  BoxContainerOfUsers,
  BoxUserSpan,
  DeleteButton,
} from "./style";
import api from "../../services/api";
import { ConfBox } from "./style";
import { BoxText } from "./style";
import { BoxInput, BoxContainer } from "./style";
import { ConfButton } from "./style";
import { BoxSelect, ConfBoxForm, BoxError } from "./style";
import { Text } from "@chakra-ui/react";

export default function Dashboard({ history }) {
  const [userdata, setUser] = useState({});
  const [categoryName, setCategory] = useState("");
  const [errorCategory, setErrorCategory] = useState(false);
  const [successCategory, setSuccessCategory] = useState(false);

  const [errorUser, setErrorUser] = useState(false);
  const [successUser, setSuccessUser] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [Types, setTypes] = useState([]);

  const [Users, setUsers] = useState([]);

  useEffect(() => {
    async function GetData() {
      try {
        var response = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (response.data.role !== "Admin") {
          history.push("/dashboard");
        }

        setUser(response.data);
        response = await api.get("/types", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setTypes(response.data);

        response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setUsers(response.data);
      } catch (err) {}
    }
    GetData();
  }, [history]);

  async function handleSubmitCategory(e) {
    e.preventDefault();
    try {
      const response = await api.post(
        "/types",
        {
          name: categoryName,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );
      setSuccessCategory(true);
      setTypes([...Types, response.data]);
      setTimeout(() => {
        setSuccessCategory(false);
      }, 2000);
    } catch (err) {
      setErrorCategory(true);
      setTimeout(() => {
        setErrorCategory(false);
      }, 2000);
    }
  }

  async function handleSubmitUser(e) {
    e.preventDefault();
    try {
      const response = await api.post("/signup", {
        name: name,
        username: username,
        email: email,
        role: role,
        password: password,
        key: process.env.REACT_APP_TOKEN,
      });
      console.log(response.data);
      setSuccessUser(true);
      setTimeout(() => {
        setSuccessUser(false);
        setName("");
        setUsername("");
        setEmail("");
        setRole("");
        setPassword("");
      }, 2000);
    } catch (err) {
      setErrorUser(true);
      setTimeout(() => {
        setErrorUser(false);
      }, 2000);
    }
  }

  async function deleteUser(id) {
    try {
      var response = await api.delete("/", {
        data: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (response.status === 200) {
        response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        setUsers(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <Header>
        <Text fontSize="1.75rem" fontWeight="bold">
          {userdata.name} - Admin
        </Text>
      </Header>
      <Main>
        <Text fontSize="1.50rem" fontWeight="bold">
          Configurações
        </Text>
        <BoxContainer>
          <ConfBoxForm onSubmit={handleSubmitCategory}>
            <BoxText>Adicionar categoria</BoxText>
            <BoxInput
              placeholder="Nome da categoria"
              value={categoryName}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              required
            />
            <ConfButton>Adicionar</ConfButton>
            {successCategory && <BoxSuccess>OK</BoxSuccess>}
            {errorCategory && <BoxError>ERROR</BoxError>}
          </ConfBoxForm>
          <ConfBoxForm onSubmit={handleSubmitUser}>
            <BoxText>Adicionar novo usuario</BoxText>
            <BoxInput
              placeholder="Nome completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <BoxInput
              placeholder="Nome de usuario"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <BoxSelect
              value={role}
              onChange={(e) => {
                console.log(e.target.value);
                setRole(e.target.value);
              }}
              required
            >
              <option value="" disabled>
                Selecione o tipo de acesso
              </option>
              <option value="Gestion">Gestão</option>
              <option value="Oficina">Oficina</option>
              <option value="Admin">Admin</option>
            </BoxSelect>
            <BoxInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <BoxInput
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <ConfButton>Adicionar</ConfButton>
            {successUser && <BoxSuccess>OK</BoxSuccess>}
            {errorUser && <BoxError>ERROR</BoxError>}
          </ConfBoxForm>
        </BoxContainer>
        <BoxContainer>
          <ConfBox>
            <BoxText>Categorias existentes</BoxText>
            <List divided relaxed>
              {Types.map((item) => (
                <List.Item key={item.id}>
                  <List.Content>
                    <List.Header
                      href={`/dashboard/gestion/${item.name}`}
                      as="a"
                    >
                      {item.name}
                    </List.Header>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </ConfBox>
        </BoxContainer>
        <BoxContainer>
          <ConfBox>
            <BoxText>Usuarios existentes</BoxText>
            <List divided relaxed>
              {Users.map((item) => (
                <List.Item key={item.id}>
                  <List.Content>
                    <List.Header>
                      <BoxContainerOfUsers>
                        <BoxUserSpan>
                          {item.name} - {item.username}
                        </BoxUserSpan>
                        <DeleteButton
                          onClick={() => {
                            deleteUser(item.id);
                          }}
                        >
                          X
                        </DeleteButton>
                      </BoxContainerOfUsers>
                    </List.Header>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </ConfBox>
        </BoxContainer>
      </Main>
    </Container>
  );
}
