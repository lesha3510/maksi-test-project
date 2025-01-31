import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/shared/api/api';

type ExternalUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export interface User {
  id: number;
  name: string;
  userName: string;
  email: string;
  phone: string;
  zipCode?: string | null;
}

export type NewUser = Omit<User, 'id'>;
export type EditUser = Omit<User, 'id'>;

interface UserState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.get<ExternalUser[]>('/users');
  const users = response.data.map((user) => ({
    id: user.id,
    name: user.name,
    userName: user.username,
    email: user.email,
    phone: user.phone,
    zipCode: user.address.zipcode,
  }));
  return users;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
    addUser: (state, action) => {
      const newUser = action.payload;
      state.users.unshift(newUser);
      state.filteredUsers.unshift(newUser);
    },
    deleteUsers: (state, action) => {
      const userIdsToDelete = action.payload;
      state.users = state.users.filter(
        (user) => !userIdsToDelete.includes(user.id)
      );
      state.filteredUsers = state.filteredUsers.filter(
        (user) => !userIdsToDelete.includes(user.id)
      );
    },
    editUser: (state, action) => {
      const updatedUser = action.payload;
      state.users = state.users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
      state.filteredUsers = state.filteredUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователей';
      });
  },
});

export const { setFilteredUsers, addUser, deleteUsers, editUser } =
  userSlice.actions;

export default userSlice.reducer;
