import React, { useState, useContext } from 'react';
import config from '../../../config';
import ApiContext from '../../../ApiContext';

function EditProfileComponent() {
  const appContext = useContext(ApiContext);
  const [formValues, setFormValues] = useState({});
  const { currentUser } = useContext(ApiContext);
  const { accessToken, id } = currentUser;


  const doEditProfile = (e) => {
    e.preventDefault();
    const data = { ...formValues };
    fetch(`${config.API_ENDPOINT}/api/user_profile/${id}`, {
      method: 'PATCH',
      headers: {
        authorization: accessToken,
        'user-id': id,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        appContext.currentUser = data;
        window.location.href = '/profile';
      });
  };

  const onFormValueChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className='edit_profile'>
      <form onSubmit={doEditProfile}>
        <label htmlFor='name'>
          Name *
          <input
            require
            onChange={onFormValueChange}
            placeholder='John Doe'
            name='name'
            type='text'
          />
        </label>
        <label htmlFor='email'>
          Email *
          <input
            require
            onChange={onFormValueChange}
            placeholder='john.doe@gmail.com'
            name='email'
            type='email'
          />
        </label>
        <label htmlFor='profession'>
          Profession *
          <select require onChange={onFormValueChange} name='profession'>
            <option value={'UI UX'}>UI UX</option>
            <option value={'Frontend Development'}>Frontend Development</option>
            <option value={'Backend Development'}>Backend Development</option>
            <option value={'Fullstack Development'}>
              Fullstack Development
            </option>
          </select>
        </label>
        <label htmlFor='phone'>
          <input
            onChange={onFormValueChange}
            placeholder='805-565-4005'
            name='phone'
            type='text'
          />
        </label>
        <label htmlFor='discord_id'>
          Discord ID
          <input
            onChange={onFormValueChange}
            placeholder='Discord ID'
            name='discord_id'
            type='text'
          />
        </label>
        <label htmlFor='location'>
          City
          <input
            onChange={onFormValueChange}
            placeholder='City'
            name='location'
            type='text'
          />
        </label>
        <label htmlFor='job_title'>
          Job Title
          <input
            onChange={onFormValueChange}
            placeholder='Job Title'
            name='job_title'
            type='text'
          />
        </label>
        <label htmlFor='job_company'>
          Company Name
          <input
            onChange={onFormValueChange}
            placeholder='Company Name'
            name='job_company'
            type='text'
          />
        </label>
        <label htmlFor='open_sessions'>
          # of open sessions each week *
          <select required onChange={onFormValueChange} name='open_sessions'>
            <option value={1}>Available for 1 session a week</option>
            <option value={2}>Available for 2 session a week</option>
            <option value={3}>Available for 3 session a week</option>
          </select>
        </label>

        <label htmlFor='description'>
          Personal Message
          <textarea onChange={onFormValueChange} name='description' />
        </label>
        <label htmlFor='submit'>
          <button type='submit' name='submit'>
            Submit
          </button>
        </label>
      </form>
    </div>
  );
}

export default EditProfileComponent;
