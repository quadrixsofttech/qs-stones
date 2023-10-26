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
} from '@chakra-ui/react';
import styles from './KitchenOverview.styles';
import { GiMeal } from 'react-icons/gi';
import chooseMeal from './funcChooseMeal';

const KitchenMealModal = ({
  meal,
  isSelected,
  setLclSelectedMeal,
  isSelectedSalad,
  setLclSelectedSalad,
  isOpen,
  onClose,
}) => {
  const { name, image, type, ingridients, desc } = meal;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent alignItems={'center'}>
        <Flex {...styles.modalBox}>
          <Flex {...styles.modalImageBox}>
            <Image {...styles.mealImage} src={image} />
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
                <Flex {...styles.mealInfoBox}>
                  <Text fontSize={'sm'} color="black">
                    Ingredients:
                  </Text>
                  <Text {...styles.mealInfoBold}> {ingridients} </Text>
                  <Text fontSize={'sm'} color="black">
                    Description:
                  </Text>
                  <Text {...styles.mealInfoBold}> {desc} </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex justifyContent={'flex-end'} m="8">
            <Button
              variant="outline"
              colorScheme={isSelected || isSelectedSalad ? 'green' : 'purple'}
              onClick={() => {
                chooseMeal(
                  meal,
                  isSelected,
                  setLclSelectedMeal,
                  isSelectedSalad,
                  setLclSelectedSalad
                );
                onClose();
              }}
            >
              {isSelected || isSelectedSalad ? 'Selected' : 'Choose meal'}
            </Button>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default KitchenMealModal;
