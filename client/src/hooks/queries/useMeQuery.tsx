import { useQuery } from 'react-query';
import { loadUser } from '../../services/users';
import { UserDoc } from '../../types/User';

export default function useMeQuery() {
  return useQuery<{ user: UserDoc }>('me', loadUser);
}
