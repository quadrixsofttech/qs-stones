import { Flex, Image } from '@chakra-ui/react';
import image from '../../images/qs-stones-HOME.jpg';

const Hero = () => {
  return (
    <Flex h={'50%'} w={'80%'} mt={5}>
      <Image
        src={image}
        alt="qs-image"
        w={'100%'}
        h={'100%'}
        objectFit={'cover'}
      ></Image>
    </Flex>
  );
};

export default Hero;
