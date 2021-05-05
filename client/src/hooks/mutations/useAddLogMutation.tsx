import { useMutation } from 'react-query';
import { addLogEntry } from '../../services/logs';

export default function useAddLogMutation() {
  return useMutation(addLogEntry);
}
