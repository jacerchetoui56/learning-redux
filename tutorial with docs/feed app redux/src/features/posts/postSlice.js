import { createSlice } from '@reduxjs/toolkit'


export const postSlice = createSlice({
    name: 'posts',
    initialState: [
        { id: '1', title: 'First Post!', content: 'Hello!' },
        { id: '2', title: 'Second Post', content: 'More text' }
    ],
    reducers: {
        postAdded: (state, action) => { state.push(action.payload) },
    }
})


export default postSlice.reducer
export const { postAdded } = postSlice.actions

export const selectPosts = state => state.posts