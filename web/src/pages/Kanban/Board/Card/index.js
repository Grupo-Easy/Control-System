import React, { useRef, useContext } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import BoardContext from "../context";

function Card({ data, index, listIndex }) {
  const ref = useRef();

  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { id: data.id, index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <>
      <Box mb={"1.2rem"} p={4} ref={ref} rounded="md" boxShadow="base">
        <Text fontSize="1.2rem" cursor="pointer">
          {data.content}
        </Text>
      </Box>
    </>
  );
}

export default Card;
