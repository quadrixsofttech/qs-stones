import ConferenceNavbar from '../../components/ConferenceNavbar/ConferenceNavbar';
import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import ConferenceOverview from '../../components/ConferenceOverview';

const ConferenceOverviewPage = () => {
  return (
    <DashboardLayout>
      <ConferenceNavbar />
      <ConferenceOverview />
    </DashboardLayout>
  );
};

export default ConferenceOverviewPage;
