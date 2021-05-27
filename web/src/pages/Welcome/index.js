import React, { useEffect, useState } from "react";
import { Box, Grid, Flex, Text, Link, Skeleton } from "@chakra-ui/react";
import Auth from "../../components/Auth";
import { motion } from "framer-motion";
import Header from "../../components/Header";

function Dashboard({ history }) {
  const [Data, setData] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    created_at: "",
    updated_at: "",
  });
  const [RenderItens, setRenderItens] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    async function Login() {
      const data = await Auth.Verify(localStorage, history);
      const itens = await Auth.Process(data.role, [
        {
          Name: "Oficiona",
          Permissions: ["Oficiona", "Admin"],
          Href: "/dashboard/kanban",
        },
        {
          Name: "Gestião",
          Permissions: ["Gestion", "Admin"],
          Href: "/dashboard/gestion",
        },
        {
          Name: "Painel de administrador",
          Permissions: ["Admin"],
          Href: "/admin",
        },
      ]);
      setRenderItens(itens);
      setData(data);
      // setTimeout(() => {
      setLoading(true);
      // }, 1500);
    }
    Login();
  }, [history]);

  return (
    <>
      <Box height="100vh" width="100vw">
        <Header title="Ferramentas" />
        <Flex m={16} h="100%" flexDirection="column" alignItems="center">
          <Flex
            m={2}
            w={["20rem", "22rem", "40rem", "84rem"]}
            justifyContent="flex-start"
          >
            <Skeleton isLoaded={Loading} dela>
              <Text fontWeight="bold" fontSize="1.75rem" align="center">
                Olá {Data.name}
              </Text>
            </Skeleton>
          </Flex>
          <Skeleton isLoaded={Loading}>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                templateColumns={[
                  "repeat(1, 20rem)",
                  "repeat(1, 22rem)",
                  "repeat(3, 20rem)",
                  "repeat(3, 28rem)",
                ]}
                gap={4}
              >
                {RenderItens.map((item) => (
                  <Link
                    _hover="outline: none"
                    href={item.Href}
                    outline={"none."}
                    key={item.Name}
                  >
                    <motion.div
                      whileHover={{
                        y: -8,
                      }}
                    >
                      <Flex
                        bg="green.500"
                        maxW="1xs"
                        height="2xs"
                        borderRadius="lg"
                        justifyContent="center"
                        alignItems="center"
                        boxShadow="md"
                        p="6"
                        rounded="md"
                      >
                        <Text fontWeight="bold" fontSize="1.5rem" color="white">
                          {item.Name}
                        </Text>
                      </Flex>
                    </motion.div>
                  </Link>
                ))}
              </Grid>
            </Flex>
          </Skeleton>
        </Flex>
      </Box>
    </>
  );
}

export default Dashboard;
