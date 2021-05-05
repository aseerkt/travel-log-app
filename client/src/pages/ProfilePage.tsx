import { useParams } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const params: any = useParams();
  const userId: string = params.userId;

  return (
    <div className='container'>
      <pre>userId: {userId}</pre>
    </div>
  );
};

export default ProfilePage;
