import { useParams } from 'react-router-dom';
import AddLogEntryForm from '../components/AddLogEntryForm';
import './AddLogPage.css';

const AddLogPage = () => {
  const params = useParams();
  const { latitude, longitude } = params as any;
  return (
    <div>
      <h2>Add Log</h2>
      <AddLogEntryForm location={{ latitude, longitude }} />
    </div>
  );
};

export default AddLogPage;
