import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import styles from "./SignupLayout.styles";
import { Link } from "react-router-dom";
import QSpaceLogo from "../../images/QSpace-Logo.svg";

const SignupLayout = ({ title, subtitle, children }) => {
  return (
    <Flex {...styles.pageWrapper}>
      <Stack {...styles.contentWrapper}>
        <Stack align={"center"}>
          <Link to="/">
            <Image src={QSpaceLogo} marginBottom={"46px"} />
          </Link>
          <Heading fontSize={"3xl"}>{title}</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {subtitle}
          </Text>
        </Stack>
        <Box {...styles.card}>{children}</Box>
      </Stack>
    </Flex>
  );
};

export default SignupLayout;
