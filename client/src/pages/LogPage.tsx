import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import useFetchOneLog from '../hooks/queries/useFetchOneLog';

import './LogPage.css';

const LogPage = () => {
  const params: any = useParams();
  const logId: string = params.id;
  const { data, isLoading } = useFetchOneLog(logId);

  if (isLoading) {
    return <Loader info='Loading log...' />;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default LogPage;
