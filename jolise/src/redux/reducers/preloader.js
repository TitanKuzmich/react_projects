const initialState = {
    isLoaded: false,
    needPreloader: true
}

const preloader = (state = initialState, action) => {
    if (action.type === 'PRELOADER_COMPLETED_ANIMATION') {
        return {
            ...state,
            isLoaded: action.payload,
        }
    }
    if (action.type === 'NEED_PRELOADER') {
        return {
            ...state,
            needPreloader: action.payload,
        }
    }
    return state
}

export default preloader