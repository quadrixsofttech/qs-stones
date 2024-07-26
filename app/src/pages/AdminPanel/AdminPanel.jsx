import DashboardLayout from "../../layout/DashboardLayout";
import {
  Flex,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import RenderTabs from "./../../components/MyHistory/RenderTabs";
import { adminPanelTypes } from "./../../constants/AdminPanelTypes";
import { AllUsersInfo } from "./AllUsersInfo";
import { RenderAllPendingRequests } from "./RenderAllPendingRequests";
import styles from "./AdminPanel.styles";
import useGettingEmployees from "../../hooks/useGettigEmployees";

const AdminPanel = () => {
  const { employees, employeesLoading, employeesError, refetchEmployees } =
    useGettingEmployees();
  return (
    <DashboardLayout>
      <Flex gap="4" height={"100%"}>
        <Tabs w={"100%"}>
          <TabList>
            <RenderTabs objectForMapping={adminPanelTypes} />
          </TabList>
          <TabIndicator {...styles.tabIndicator} />
          <TabPanels>
            <TabPanel>
              <RenderAllPendingRequests
                employees={employees}
                employeesLoading={employeesLoading}
                employeesError={employeesError}
                refetchEmployees={refetchEmployees}
              />
            </TabPanel>
            <TabPanel>
              {
                //Ovde ispod izmeni ovah VH, nije dobro resenje. Zbog tabova je problem da bude 100%
              }
              <Flex maxHeight={"82vh"}>
                <AllUsersInfo
                  employees={employees}
                  employeesLoading={employeesLoading}
                  employeesError={employeesError}
                  refetchEmployees={refetchEmployees}
                />
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </DashboardLayout>
  );
};

export default AdminPanel;
