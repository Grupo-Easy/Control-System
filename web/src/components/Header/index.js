import React from "react";
import { Box, Heading } from "@chakra-ui/react";

function Header({ title }) {
  return (
    <Box
      boxShadow="base"
      p="6"
      bg="green.500"
      maxHeight={["20vh", "10vh"]}
      justifyContent="center"
    >
      <Heading as="h1" fontSize={{ base: "2rem", sm: "2rem" }} color="white">
        {title}
      </Heading>
    </Box>
  );
}

export default Header;
