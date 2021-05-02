import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { fetchAllLogs } from '../services/logs';
import { LogEntryDoc } from '../types/LogEntry';
import './LogsPage.css';

const LogsPage = () => {
  const { data, isLoading } = useQuery<LogEntryDoc[]>('allLogs', fetchAllLogs);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className='container public-logs-container'>
      <section>
        <h1>Browse logs</h1>
        {data && data.length > 0 ? (
          data.map((entry) => (
            <article className='log-article' key={entry._id}>
              <Link to={`/logs/${entry._id}`}>
                <h2>{entry.title}</h2>
              </Link>
              <blockquote className='flex-2'>
                <i className='fas fa-quote-left'></i>{' '}
                <span>{entry.comments ? entry.comments : 'No comments'}</span>
              </blockquote>
              <p className='flex-2'>
                <i className='fas fa-info-circle'></i>
                <span>
                  {entry.description ? entry.description : 'No description'}
                </span>
              </p>
              <small>
                <strong>Author Rating:</strong> {entry.rating} out of 5
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
    </div>
  );
};

export default LogsPage;
