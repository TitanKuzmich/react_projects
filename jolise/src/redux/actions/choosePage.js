export const choosePageActionsTypes = {
    CHOOSE_PAGE_START_ANIMATION: "CHOOSE_PAGE_START_ANIMATION"
}

export const chooseStartAnimation = () => ({
    type: choosePageActionsTypes.CHOOSE_PAGE_START_ANIMATION,
    payload: true,
})