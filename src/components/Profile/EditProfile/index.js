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
    }).then(() => {
      appContext.currentUser = data;
      window.location.href = '/profile';
    });
  };

  const onFormValueChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className='edit_profile'>
      <form className='connectful-form' onSubmit={doEditProfile}>
        <div className='connectful-formcontrol'>
          <label htmlFor='name'>Name *</label>
          <input
            require
            onChange={onFormValueChange}
            placeholder='John Doe'
            name='name'
            type='text'
          />
        </div>
        <div className='connectful-formcontrol'>
          <label htmlFor='email'>Email *</label>
          <input
            require
            onChange={onFormValueChange}
            placeholder='john.doe@gmail.com'
            name='email'
            type='email'
          />
        </div>
        <div className='connectful-formcontrol'>
          <label htmlFor='profession'>Profession *</label>
          <select require onChange={onFormValueChange} name='profession'>
            <option value={'UI UX'}>UI UX</option>
            <option value={'Frontend Development'}>Frontend Development</option>
            <option value={'Backend Development'}>Backend Development</option>
            <option value={'Fullstack Development'}>
              Fullstack Development
            </option>
          </select>
        </div>
        <div className='connectful-formcontrol'>
          <label htmlFor='phone'>Phone</label>
          <input
            onChange={onFormValueChange}
            placeholder='805-565-4005'
            name='phone'
            type='text'
          />
        </div>
        <div className='connectful-formcontrol'>
          <label htmlFor='discord_id'>Discord ID</label>
          <input
            onChange={onFormValueChange}
            placeholder='Discord ID'
            name='discord_id'
            type='text'
          />
        </div>
        <div className='connectful-formcontrol'>
          <label htmlFor='location'>City</label>
          <input
            onChange={onFormValueChange}
            placeholder='City'
            name='location'
            type='text'
          />
        </div>
        <div className='connectful-formcontrol'>
          <label htmlFor='job_title'>Job Title</label>
          <input
            onChange={onFormValueChange}
            placeholder='Job Title'
            name='job_title'
            type='text'
          />
        </div>
        <div className='connectful-formcontrol'>
          <label htmlFor='job_company'>Company Name</label>
          <input
            onChange={onFormValueChange}
            placeholder='Company Name'
            name='job_company'
            type='text'
          />
        </div>
        <div className='connectful-formcontrol'>
          <label htmlFor='open_sessions'># of open sessions each week *</label>
          <select required onChange={onFormValueChange} name='open_sessions'>
            <option value={1}>Available for 1 session a week</option>
            <option value={2}>Available for 2 session a week</option>
            <option value={3}>Available for 3 session a week</option>
          </select>
        </div>
        <div className='connectful-formcontrol'>
          <label htmlFor='job_description'>Personal Message</label>
          <textarea onChange={onFormValueChange} name='job_description' />
        </div>
        <div className='action-button'>
          <button type='submit' name='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileComponent;
