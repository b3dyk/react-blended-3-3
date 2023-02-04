import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from 'redux/users/users.selector';
import { toggleStatus } from 'redux/users/users.slice';
import { Button, Status } from './HomePage.styled';

const HomePage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const users = useSelector(getUsers);

  const handleDelete = id => {
    setIsModalOpen(true);
    setCurrentId(id);
  };

  const toggleUserStatus = id => {
    dispatch(toggleStatus(id));
  };

  return (
    <>
      {users.length !== 0 && (
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Age</th>
              <th>Status</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id}>
                <td>{idx + 1}</td>
                <td>
                  <Avatar name={user.name} size="40" round={true} />
                </td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <Status onClick={() => toggleUserStatus(user.id)}>
                    {user.status}
                  </Status>
                </td>
                <td>
                  <Button type="button" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && <Modal id={currentId} onClose={setIsModalOpen} />}
    </>
  );
};

export default HomePage;
