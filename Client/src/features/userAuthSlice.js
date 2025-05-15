import { createSlice } from '@reduxjs/toolkit';

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: {
        user: null,
        userType: null,
        isAuthenticated: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.userType = action.payload.userType;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.userType = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;