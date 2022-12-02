import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'users',
    initialState: [
        { id: '0', name: 'Tianna Jenkins' },
        { id: '1', name: 'Kevin Grant' },
        { id: '2', name: 'Madison Price' }
    ],

    reducers: {

    }
})


export default userSlice.reducer

export const { } = userSlice.actions

export const selectUser = state => state.users