import { Tab } from '@chakra-ui/react';

const RenderTabs = ({ objectForMapping }) => {
  return (
    <>
      {Object.values(objectForMapping).map((type) => {
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
