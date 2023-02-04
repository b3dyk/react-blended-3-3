import { useDispatch } from 'react-redux';
import { deleteUser } from 'redux/users/users.slice';
import { Backdrop, ModalWindow, Wrapper } from './Modal.styled';

export const Modal = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const handleClose = evt => {
    if (evt.target === evt.currentTarget) {
      onClose(false);
    }
  };

  const handleDelete = () => {
    dispatch(deleteUser(id));
    onClose(false);
  };
  return (
    <Backdrop onClick={handleClose}>
      <ModalWindow>
        <h3>Are you shure you want to delete this item?</h3>
        <Wrapper>
          <button type="button" onClick={handleDelete}>
            Yes
          </button>
          <button type="button" onClick={handleClose}>
            No
          </button>
        </Wrapper>
      </ModalWindow>
    </Backdrop>
  );
};
