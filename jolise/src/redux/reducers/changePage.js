const initialState = {
    changingPage: false
}

const changePage = (state = initialState, action) => {
    if (action.type === 'CHANGE_PAGE') {
        return {
            ...state,
            changingPage: action.payload,
        }
    }

    return state;
}

export default changePage;