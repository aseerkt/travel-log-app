import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { loadUser } from '../services/users';
import './ProfilePage.css';

const ProfilePage = () => {
  const { data } = useQuery('me', loadUser);
  const params: any = useParams();
  const userId: string = params.userId;

  return (
    <div className='container'>
      <pre>userId: {userId}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
