import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from "../../types/users";

const initialState: IUser = {
  email: '',
  firstName: '',
  id: '',
  isVerified: false,
  lastName: '',
  role: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<IUser>) => {
      const { email, firstName, id, isVerified, lastName, role } = action.payload;

      state.id = id;
      state.email = email;
      state.firstName = firstName;
      state.isVerified = isVerified;
      state.lastName = lastName;
      state.role = role;
    },
    resetUserInfo: (state) => {
      state = initialState;
    }
  }
});

export const { updateUserInfo, resetUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;