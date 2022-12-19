import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns/esm";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle", // idle, loading, succeeded, failed
  error: null,
  count: 0,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialProps) => {
    try {
      const response = await axios.post(POST_URL, initialProps);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialProps) => {
    try {
      const response = await axios.put(
        `${POST_URL}/${initialProps.id}`,
        initialProps
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;

    const response = await axios.delete(`${POST_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const targetedPost = state.entities[postId];
      if (targetedPost) {
        targetedPost.reactions[reaction] += 1;
      }
    },
    increaseCount: (state, action) => {
      state.count += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // adding date and reactions
        let min = 1;
        action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        // state.posts.push(...action.payload);
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        // state.posts.push(action.payload);
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("update is not completed");
          console.log(action.payload);
          return;
        }
        action.payload.date = new Date().toISOString();
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        postsAdapter.removeOne(state, id);
      });
  },
});

export const { increaseCount, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;
// ! notice with the createSelector : it is a memoized selector
// * - this selector will check if the posts or the user have changed and then decides to return either the old value or the new one.
// * - the first argument is the dependency array and they are SELECTORS
// * - the second argument is the function that returns the value
// ? - the output of the selectors of the dependancy array will be passed to the function as arguments
// ?==> posts and userId will be passed to the output selector function
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);
