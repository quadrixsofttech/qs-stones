import DashboardLayout from '../../layout/DashboardLayout/DashboardLayout';
import ConferenceNavbar from '../../components/ConferenceNavbar/ConferenceNavbar';

const Conference = () => {
  return (
    <DashboardLayout Padding="0">
      <ConferenceNavbar />
      <h1>Calendar Page</h1>
    </DashboardLayout>
  );
};

export default Conference;
