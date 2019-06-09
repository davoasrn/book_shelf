import axios from 'axios';

export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = []
) {
    const request = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            } else {
                return response.data;
            }
        });
    return {
        type: 'GET_BOOKS',
        payload: request
    }


}

export function getBookWithReviewer(id) {
    const request = axios.get(`/api/getBook?id=${id}`);
    return (dispatch) => {
        request.then(({ data }) => {
            let book = data;
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
                .then(({ data }) => {
                    const response = {
                        book,
                        reviewer: data
                    }
                    dispatch({
                        type: 'GET_BOOK_W-REVIEWER',
                        payload: response
                    });
                })

        })
    }
}

/** google chrome Network fast3G, erb vor naxord statena bacum minchev nory load lini */
export function clearBookWithReviewer() {
    return {
        type: 'CLEAR_BOOK_W-REVIEWER',
        payload: {
            book: {},
            reviewer: {}
        }
    }
}

export async function addBook(book) {
    const request = await axios.post(`/api/book`, book);

    return {
        type: 'ADD_BOOK',
        payload: request.data
    }
}

export function clearNewBook() {
    return {
        type: 'CLEAR_NEWBOOK',
        payload: null
    }
}

export async function getUserPosts(userId) {
    const request = await axios(`/api/userPosts?user=${userId}`);
    return {
        type: 'GET_USER_POSTS',
        payload: request.data
    }
}

export async function getBook(id) {
    const request = await axios.get(`/api/getBook?id=${id}`);
    return {
        type: 'GET_BOOK',
        payload: request.data
    }
}

export async function updateBook(data) {
    const request = await axios.post(`/api/book_update`, data);
    return {
        type: 'UPDATE_BOOK',
        payload: request.data
    }
}

export async function deleteBook(id) {
    const request = await axios.delete(`/api/delete_book?id=${id}`);
    return {
        type: 'DELETE_BOOK',
        payload: request.data
    }
}

export function clearBook(){
    return {
        type: 'CLEAR_BOOK',
        payload: {
            book: null,
            updatebook: false,
            postDeleted: false
        }
    }
}


/*==============User=============*/

export async function loginUser({ email, password }) {
    const request = await axios.post(`/api/login`, { email, password });

    return {
        type: 'USER_LOGIN',
        payload: request.data
    }
}

export async function auth() {
    const request = await axios.get(`/api/auth`);
    if (request) {
        return {
            type: 'USER_AUTH',
            payload: request.data
        }
    }
}

export async function getUsers() {
    const request = await axios.get(`/api/users`);
    return {
        type: 'GET_USERS',
        payload: request.data
    }
}

export function userRegsiter(user, userList) {
    return async dispatch => {
        try {
            const request = await axios.post(`/api/register`, user);
            let users = request.data.success ? [...userList, request.data.user] : userList
            dispatch({
                type: 'USER_REGISTER',
                payload: {
                    success: request.data.success,
                    users: users
                }
            })
        } catch (error) {
            dispatch({
                type: 'USER_REGISTER',
                payload: {
                    success: false,
                    users: userList
                }
            })
        }
    }
}