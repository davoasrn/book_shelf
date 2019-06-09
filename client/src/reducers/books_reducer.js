export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_BOOKS':
            return { ...state, list: action.payload }
        case 'GET_BOOK':
            return {...state, book: action.payload}
        case 'GET_BOOK_W-REVIEWER':
            return {
                ...state,
                book: action.payload.book,
                reviewer: action.payload.reviewer
            }
        case 'CLEAR_BOOK_W-REVIEWER':
            return {
                ...state,
                book: action.payload.book,
                reviewer: action.payload.reviewer
            }
        case 'CLEAR_NEWBOOK':
        case 'ADD_BOOK' :
            return {
                ...state,
                newbook: action.payload
            }
        case 'UPDATE_BOOK':
            return {
                ...state,
                 updatebook: action.payload.success,
                 book: action.payload.data
                }
        case 'DELETE_BOOK':
            return {
                ...state,
                postDeleted: action.payload
            }
        case 'CLEAR_BOOK':
            return {
                ...state,
                updatebook: action.payload.updatebook,
                book: action.payload.book,
                postDeleted: action.payload.postDeleted
            }
        case 'GET_USER_POSTS':
            return {
                ...state,
                userPosts: action.payload
            }
        default:
            return state;
    }
};