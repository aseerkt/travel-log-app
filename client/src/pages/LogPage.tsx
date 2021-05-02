import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchOneLog } from '../services/logs';
import { LogEntryDoc } from '../types/LogEntry';
import './LogPage.css';

const LogPage = () => {
  const params: any = useParams();
  const logId: string = params.id;
  const { data, isLoading } = useQuery<LogEntryDoc>(['oneLog', logId], () =>
    fetchOneLog(logId)
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default LogPage;
