import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import useFetchAllLogs from '../hooks/queries/useFetchAllLogs';

import './LogsPage.css';

const LogsPage = () => {
  const { data, isLoading } = useFetchAllLogs();

  if (isLoading) {
    return <Loader info='Fetching public logs' />;
  }

  return (
    <div className='container public-logs-container'>
      <h1 style={{ textTransform: 'uppercase' }}>Browse logs</h1>
      <section className='logs-list'>
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
              <p className='desc'>
                <span>
                  {entry.description ? (
                    entry.description
                  ) : (
                    <small>No description</small>
                  )}
                </span>
              </p>
              <Rating rating={entry.rating} />
            </article>
          ))
        ) : (
          <div className='card no-log-wrapper'>
            <p>No logs yet made public</p>
            <Link to='/my-logs-map'>Add new log</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default LogsPage;
