import { Flex, Tag, TagLabel } from "@chakra-ui/react";
import styles from "./styles/ClearAllBtn.styles";

const ClearAllBtn = ({ handleClick, text }) => {
  return (
    <Tag {...styles.clearAllButton} onClick={handleClick}>
      <Flex align="center">
        <TagLabel>{text}</TagLabel>
      </Flex>
    </Tag>
  );
};

export default ClearAllBtn;
