import { Flex, Tag, TagLabel } from "@chakra-ui/react";
import styles from "./ClearAllBtn.styles";

const ClearAllBtn = ({ handleClick }) => {
  return (
    <Tag {...styles.clearAllButton} onClick={handleClick}>
      <Flex align="center">
        <TagLabel>Clear all</TagLabel>
      </Flex>
    </Tag>
  );
};

export default ClearAllBtn;
