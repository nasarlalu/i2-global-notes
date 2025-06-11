import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
            const { token } = action.payload;
            document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
        },

        removeUserdata: (state, action) => {
            state.userData = null
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    },
})

export const { setUserData, removeUserdata } = authSlice.actions
export default authSlice.reducer;