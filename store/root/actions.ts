export const LOAD_IMAGES = 'LOAD_IMAGES'

export const SET_IMAGE = 'SET_IMAGE'

export const loadImages = (data: []) => ({ type: LOAD_IMAGES, payload: data })

export const setImage = (data: string) => ({ type: SET_IMAGE, payload: data })
