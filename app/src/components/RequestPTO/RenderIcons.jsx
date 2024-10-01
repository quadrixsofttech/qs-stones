import { Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import styles from "./RequestPTO.styles";
import { BiTrash } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";

export const RenderIcons = ({
  id,
  type,
  status,
  time,
  handleOpen,
  handleEdit,
  isHovered,
}) => {
  return (
    <>
      <Text {...styles.grayText}>{time}</Text>
      <Spacer />
      {type === "remote" && isHovered ? (
        <Icon
          as={BiTrash}
          boxSize={5}
          color={"red.300"}
          onClick={handleOpen}
          _hover={{
            color: "red.500",
          }}
        />
      ) : status === "pending" && isHovered ? (
        <Flex gap={1} alignItems={"center"}>
          <Icon
            as={FiEdit}
            boxSize={4}
            onClick={() => handleEdit(id)}
            _hover={{
              color: "purple.500",
            }}
          />
          <Icon
            as={BiTrash}
            boxSize={5}
            color={"red.300"}
            onClick={handleOpen}
            _hover={{
              color: "red.500",
            }}
          />
        </Flex>
      ) : (
        ""
      )}
    </>
  );
};
