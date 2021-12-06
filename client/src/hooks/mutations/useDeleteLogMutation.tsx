import { useMutation } from 'react-query';
import { deleteLogEntry } from '../../services/logs';

export default function useDeleteLogMutation() {
  return useMutation(deleteLogEntry);
}
