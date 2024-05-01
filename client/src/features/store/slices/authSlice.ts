import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '../../../models/api/auth/auth.user';

const { token, user } = JSON.parse(localStorage.getItem('jwt') || 'false') as IAuthState;

const initialState: IAuthState = {
    token,
    user
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<IAuthState>) => {
            const { token, user } = action.payload;
            state.user = user;
            state.token = token;
            localStorage.setItem('jwt', JSON.stringify({ ...state }));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('jwt');
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
