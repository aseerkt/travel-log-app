import { useQuery } from 'react-query';
import { fetchMyLogs } from '../../services/logs';
import { LogEntryDoc } from '../../types/LogEntry';

const useFetchMyLogs = () => {
  return useQuery<LogEntryDoc[]>('myLogs', fetchMyLogs);
};

export default useFetchMyLogs;
