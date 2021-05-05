import { useQuery } from 'react-query';
import { fetchAllLogs } from '../../services/logs';
import { LogEntryDoc } from '../../types/LogEntry';

export default function useFetchAllLogs() {
  return useQuery<LogEntryDoc[]>('allLogs', fetchAllLogs);
}
