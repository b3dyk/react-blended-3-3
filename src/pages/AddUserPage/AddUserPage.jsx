import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from 'redux/users/users.slice';
import { getStatus } from 'services/statusApi.service';

const AddUserPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState(() => localStorage.getItem('name') ?? '');
  const [age, setAge] = useState(() => localStorage.getItem('age') ?? '');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        localStorage.setItem('name', value);
        setName(value);
        break;

      case 'age':
        localStorage.setItem('age', value);
        setAge(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    const status = (await getStatus()) === 'yes' ? 'online' : 'offline';

    const user = { id: nanoid(), name, age, status };

    dispatch(addUser(user));

    localStorage.removeItem('name');
    localStorage.removeItem('age');

    setName('');
    setAge('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input type="text" name="name" value={name} onChange={handleChange} />
      </label>
      <label>
        <span>Age</span>
        <input type="number" name="age" value={age} onChange={handleChange} />
      </label>
      <button>Save</button>
    </form>
  );
};

export default AddUserPage;
