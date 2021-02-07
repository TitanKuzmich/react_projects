export const preloaderActionsTypes = {
    PRELOADER_COMPLETED_ANIMATION: "PRELOADER_COMPLETED_ANIMATION",
    NEED_PRELOADER: "NEED_PRELOADER"
}

export const preloaderFinish = () => ({
    type: preloaderActionsTypes.PRELOADER_COMPLETED_ANIMATION,
    payload: true,
})

export const needPreloader = () => ({
    type: preloaderActionsTypes.NEED_PRELOADER,
    payload: false,
})