import {
    Button,
    CloseButton,
    Flex,
    Heading,
    Image,
    Modal,
    ModalContent,
    ModalOverlay,
    Tag,
    Text,
    Icon
  } from '@chakra-ui/react';
  import styles from './KitchenOverview.styles';
  import { useTheme } from '@emotion/react';
  import { GiMeal } from 'react-icons/gi';

  const KitchenMealModal = ({
    isOpen,
    onClose,
    img,
    id,
    name,
    type,
    ingredients,
    desc
  }) => {
    const theme = useTheme();
    const gray400 = theme.colors.gray[400];
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems={'center'}>
          <Flex {...styles.modalBox}>
            <Flex {...styles.modalImageBox}>
              <Image {...styles.mealImage} src={img} />
              <Tag {...styles.tag}>{type}</Tag>
              <CloseButton onClick={onClose} {...styles.closeButton} />
            </Flex>
            <Flex {...styles.modalInfoContent}>
              <Flex justifyContent={'space-between'}>
                <Flex flexDir={'column'}>
                  <Flex gap="8" alignItems={'center'}>
                    <Heading borderBottom={'4px'} {...styles.modalHeading}>
                     <GiMeal />
                    </Heading>
                    <Heading {...styles.modalHeading} size="2xl">
                      {name}
                    </Heading>
                  </Flex>
                  <Flex gap="1" {...styles.mealInfoBox}>
                    <Text fontSize={'sm'} color="black">
                      Ingredients:
                    </Text>
                    <Text {...styles.mealInfoBold}> {ingredients} </Text>
                    <Text fontSize={'sm'} color="black">
                      Description:
                    </Text>
                    <Text {...styles.mealInfoBold}> {desc} </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent={'flex-end'} m="8">
              <Button variant="outline" colorScheme='purple'
              >
                Choose meal
              </Button>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    );
  };
  
  export default KitchenMealModal;

