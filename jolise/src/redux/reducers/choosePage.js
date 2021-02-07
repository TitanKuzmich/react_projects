const initialState = {
    startAnimation: false
}

const choosePage = (state = initialState, action) => {
    if (action.type === 'CHOOSE_PAGE_START_ANIMATION') {
        return {
            ...state,
            startAnimation: action.payload,
        }
    }

    return state;
}

export default choosePage