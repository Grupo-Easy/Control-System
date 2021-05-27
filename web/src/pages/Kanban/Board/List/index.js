import React from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import Card from "../Card";

function List({ title, data, index: listindex }) {
  return (
    <>
      <Box p={8} w={["sm", "md", "lg"]} maxW={["sm", "md", "lg"]} h="100%">
        <Box as="header" pb={["1.6rem"]}>
          <Heading>{title}</Heading>
          <Button
            borderRadius={"md"}
            colorScheme="green"
            size={["sm", "md", "lg"]}
          >
            <MdAdd size={24} color="#fff" />
          </Button>
        </Box>
        <Box as="main">
          {data.cards.map((card, index) => (
            <Card
              key={card.id}
              listIndex={listindex}
              index={index}
              data={card}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

export default List;
