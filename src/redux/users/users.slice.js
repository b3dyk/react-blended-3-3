import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    addUser(state, { payload }) {
      state.users.push(payload);
    },

    deleteUser(state, { payload }) {
      state.users = state.users.filter(user => user.id !== payload);
    },

    toggleStatus(state, { payload }) {
      const idx = state.users.findIndex(user => user.id === payload);
      state.users[idx].status =
        state.users[idx].status === 'online' ? 'offline' : 'online';
    },
  },
});

export const { addUser, deleteUser, toggleStatus } = usersSlice.actions;
const persistConfig = {
  key: 'users',
  storage,

  whitelist: ['users'],
};
export const usersReducer = persistReducer(persistConfig, usersSlice.reducer);
