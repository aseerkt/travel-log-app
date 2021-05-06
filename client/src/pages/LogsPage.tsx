import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import useFetchAllLogs from '../hooks/queries/useFetchAllLogs';
import useMeQuery from '../hooks/queries/useMeQuery';

import './LogsPage.css';

const LogsPage = () => {
  const { data: meData } = useMeQuery();
  const { data, isLoading } = useFetchAllLogs();
  if (isLoading) {
    return <Loader info='Fetching public logs' />;
  }
  return (
    <div className='container public-logs-container'>
      <section className='logs-list'>
        <h1 style={{ textTransform: 'uppercase' }}>Browse logs</h1>
        {data && data.length > 0 ? (
          data.map((entry) => (
            <article className='log-article' key={entry._id}>
              <Link to={`/logs/${entry._id}`}>
                <h2>{entry.title}</h2>
              </Link>
              <blockquote className='flex-2'>
                <i className='fas fa-quote-left'></i>{' '}
                <span>
                  {entry.comments ? entry.comments : <small>No comments</small>}
                </span>
              </blockquote>
              <p className='flex-2'>
                <i className='fas fa-info-circle'></i>
                <span>
                  {entry.description ? (
                    entry.description
                  ) : (
                    <small>No description</small>
                  )}
                </span>
              </p>
              <small>
                <strong>Author Rating:</strong>
                <Rating rating={entry.rating} />
              </small>
            </article>
          ))
        ) : (
          <div className='no-log-wrapper'>
            <h3>No logs yet made public</h3>
            <Link to='/my-logs-map'>Add new log</Link>
          </div>
        )}
      </section>
      <section>
        <h1>YOUR LOGS</h1>
        <div className='log-article'>
          {meData && meData.user && (
            <article>
              <h2>Welcome ${meData.user.fullName}</h2>
              <Link to='/my-logs-map'>
                <button>Add new log</button>
              </Link>
            </article>
          )}
          <Link to='/login'>
            <h3 style={{ color: 'blueviolet' }}>Sign In</h3>
          </Link>
          <p>Login to keep track of your personal journey</p>
        </div>
      </section>
    </div>
  );
};

export default LogsPage;
