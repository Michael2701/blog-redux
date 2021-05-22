import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => {
    return async (dispatch, getState) => {
        await dispatch(fetchPosts());

        _.chain(getState().posts)
            .map('userId')
            .uniq()
            .forEach(id => dispatch(fetchUser(id)))
            .value();
    }
}

export const fetchPosts = () => {
    return async (dispatch, getState) => {
        const response = await jsonPlaceholder.get('/posts');
        dispatch({ type: 'FETCH_POSTS', payload: response.data });
    };
};

export const fetchUser = (userId) => {
    return async (dispatch, getState) => {
        const response = await jsonPlaceholder.get(`/users/${userId}`);
        dispatch({ type: 'FETCH_USER', payload: response.data})
    }
}

// export const fetchUser = (userId) => {
//     return (dispatch, getState) => {
//         _fetchUser(userId, dispatch)
//     }
// }

// const _fetchUser = _.memoize(async (userId, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${userId}`);
//     dispatch({ type: 'FETCH_USER', payload: response.data})
// });