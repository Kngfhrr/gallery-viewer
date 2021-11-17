export const LOAD_SHIPMENTS = "LOAD_SHIPMENTS"

export const SET_SHIPMENTS = "SET_SHIPMENTS"

export const SET_LOADING = "SET_LOADING"

export const loadShipments = () => ({type: LOAD_SHIPMENTS})

export const setShipments = (data) => ({type: SET_SHIPMENTS, payload: data})

export const setLoading = (data) => ({type: SET_LOADING, payload: data})
