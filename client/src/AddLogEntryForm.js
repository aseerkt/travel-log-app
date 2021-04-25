import PropTyes from 'prop-types';
import { useState } from 'react';
import { addLogEntry } from './API';

const AddLogEntryForm = ({ location: { latitude, longitude }, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    comments: '',
    rating: 5,
    visitDate: '',
  });

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addLogEntry({ ...formData, latitude, longitude });
      onClose();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
    setLoading(false);
  };

  const { title, description, comments, rating, visitDate } = formData;

  return (
    <form onSubmit={onSubmit}>
      <div className='form-control'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={onChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='desc'>Description</label>
        <textarea
          name='description'
          id='desc'
          value={description}
          onChange={onChange}
          rows='4'
        ></textarea>
      </div>
      <div className='form-control'>
        <label htmlFor='comments'>Comments</label>
        <input
          type='text'
          name='comments'
          id='comments'
          value={comments}
          onChange={onChange}
        />
      </div>
      <div className='form-control'>
        <label htmlFor='rating'>Rating</label>
        <input
          type='number'
          name='rating'
          id='rating'
          value={rating}
          onChange={onChange}
        />
      </div>
      {/* <div className='form-control'>
        <label htmlFor='latitude'>Latitude</label>
        <input
          type='number'
          name='latitude'
          id='latitude'
          value={latitude}
          onChange={onChange}
          disabled
        />
      </div>
      <div className='form-control'>
        <label htmlFor='longitude'>Longitude</label>
        <input
          type='number'
          name='longitude'
          id='longitude'
          value={longitude}
          onChange={onChange}
          disabled
        />
      </div> */}
      <div className='form-control'>
        <label htmlFor='visitDate'>VisitDate</label>
        <input
          type='date'
          name='visitDate'
          id='visitDate'
          value={visitDate}
          onChange={onChange}
        />
      </div>
      <button type='submit' disabled={loading}>
        Submit
      </button>
    </form>
  );
};

AddLogEntryForm.propTypes = {
  location: PropTyes.object.isRequired,
  onClose: PropTyes.func.isRequired,
};

export default AddLogEntryForm;
