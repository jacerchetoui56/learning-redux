import { createSlice, nanoid } from '@reduxjs/toolkit'


export const postSlice = createSlice({
    name: 'posts',
    initialState: [
        { id: '1', title: 'First Post!', content: 'Hello!', user: '2', date: '2022-12-01T09:15:30.144Z', reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } },
        { id: '2', title: 'Second Post', content: 'More text', user: '0', date: '2022-12-02T09:15:44.144Z', reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 } }
    ],
    reducers: {
        postAdded: {
            reducer: (state, action) => { state.push(action.payload) },
            prepare: (title, content, userId) => ({
                payload: {
                    id: nanoid(),
                    title,
                    content,
                    user: userId,
                    date: new Date().toISOString(),
                    reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
                }
            })
        },
        postUpdated: (state, action) => {
            const { id, title, content } = action.payload
            const targetedPost = state.find(post => post.id === id)
            if (targetedPost) {
                targetedPost.title = title
                targetedPost.content = content
            }
        },
        reactionAdded: (state, action) => {
            const { postId, reaction } = action.payload
            const targetedPost = state.find(post => post.id === postId)
            if (targetedPost) {
                targetedPost.reactions[reaction] += 1
            }
        }
    }
})


export default postSlice.reducer
export const { postAdded, postUpdated, reactionAdded } = postSlice.actions

export const selectPosts = state => state.posts