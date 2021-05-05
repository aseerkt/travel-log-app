import { useQuery } from 'react-query';
import { loadUser } from '../../services/users';

export default function useMeQuery() {
  return useQuery('me', loadUser);
}
