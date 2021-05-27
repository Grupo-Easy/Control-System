import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import produce from "immer";
import Card from "./Card";
import List from "./List";
import loadList from "../apifake";
import BoardContext from "./context";

const data = loadList();

function Board() {
  const [lists, setLists] = useState(data);

  function move(fromList, toList, from, to) {
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];

        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      })
    );
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Flex flexDirection="row" m={16} h="80vh">
        {lists.map((list, index) => (
          <List title={list.title} key={index} index={index} data={list} />
        ))}
      </Flex>
    </BoardContext.Provider>
  );
}

export default Board;
