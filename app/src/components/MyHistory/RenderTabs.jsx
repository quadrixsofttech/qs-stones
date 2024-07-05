import { Tab } from '@chakra-ui/react';
import { tabTypes } from './constants/constants';

const RenderTabs = () => {
  return (
    <>
      {Object.values(tabTypes).map((type) => {
        return (
          <Tab _selected={{ color: 'purple.500' }} fontWeight={500} key={type}>
            {type}
          </Tab>
        );
      })}
    </>
  );
};

export default RenderTabs;
