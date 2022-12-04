import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: {
        userId: null,
        name: null,
        deptId: null,
        accessToken: null,
        type: null
    }
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        }
    }
});

export const { setUserData } = appSlice.actions;

export default appSlice.reducer;