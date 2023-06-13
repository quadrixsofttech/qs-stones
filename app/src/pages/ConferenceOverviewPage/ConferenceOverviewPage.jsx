import ConferenceNavbar from '../../components/ConferenceNavbar/ConferenceNavbar';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import ConferenceOverview from '../../components/ConferenceOverview';

const ConferenceOverviewPage = () => {
  return (
    <DashboardLayout Padding="0">
      <ConferenceNavbar />
      <ConferenceOverview />
    </DashboardLayout>
  );
};

export default ConferenceOverviewPage;
