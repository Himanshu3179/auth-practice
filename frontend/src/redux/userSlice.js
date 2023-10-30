import { createSlice } from "@reduxjs/toolkit";

const inititalState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const userSlice = createSlice({
    name: 'user',
    initialState: inititalState,
    reducers: {
        setCredentials(state, action) {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        removeCredentials(state) {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }

    }
})

export const { setCredentials, removeCredentials } = userSlice.actions;

export default userSlice.reducer;