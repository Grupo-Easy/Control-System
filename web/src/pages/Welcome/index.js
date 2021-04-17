import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Flex,
  Text,
  Link,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import Auth from "../../components/Auth";
import { motion } from "framer-motion";

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
  const [Loading, setLoading] = useState(true);

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
      setLoading(true);
    }
    Login();
  }, [history]);

  return (
    <>
      <Box height="100vh" width="100vw">
        <Box
          boxShadow="base"
          p="6"
          bg="green.500"
          maxHeight={["20vh", "10vh"]}
          justifyContent="center"
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: "2rem", sm: "2rem" }}
            color="white"
          >
            Ferramentas
          </Text>
        </Box>
        <Flex m={16} h="100%" flexDirection="column" alignItems="center">
          <Flex
            m={2}
            w={["20rem", "22rem", "40rem", "84rem"]}
            justifyContent="flex-start"
          >
            <Skeleton>
              <Text fontWeight="bold" fontSize="1.75rem" align="center">
                {Data.name}
              </Text>
            </Skeleton>
          </Flex>
          <Skeleton isLogged={false}>
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
