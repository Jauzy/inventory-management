import baseURL from '../../constants/baseURL.js'
import swal from 'sweetalert'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

//action type
export const LOADING = 'HISTORY_LOADING';
export const FINISH = 'HISTORY_FINISH'
export const RESET = 'HISTORY_RESET'

const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

const reset = () => ({
    type: RESET
})

export const addNewHistory = async (dispatch, itemID) => {
    if (!cookies.get('user')) dispatch(finishReq(null))
    else {
        dispatch(enableLoading())
        try {
            const config = { headers: { token: `RPLGDC ${cookies.get('token')}` } }
            await baseURL.post(`/history/`, { itemID }, config)
            swal("Add Success", "item added successfully!", "success");
            const { data } = await baseURL.get(`/history/org`, config)
            dispatch(finishReq({ histories: data }))
        } catch (error) {
            swal("Add Failed", error.response?.data.message, "error");
            dispatch(finishReq({ error: error.response?.data.message }))
        }
    }
}

export const returnItem = async (dispatch, itemID) => {
    if (!cookies.get('user')) dispatch(finishReq(null))
    else {
        dispatch(enableLoading())
        try {
            const config = { headers: { token: `RPLGDC ${cookies.get('token')}` } }
            await baseURL.put(`/history/`, { itemID }, config)
            swal("Return Success", "item returned successfully!", "success");
            const { data } = await baseURL.get(`/history/`)
            dispatch(finishReq({ histories: data }))
        } catch (error) {
            swal("Return Failed", error.response?.data.message, "error");
            dispatch(finishReq({ error: error.response?.data.message }))
        }
    }
}

export const getOrgHistory = async (dispatch) => {
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `RPLGDC ${cookies.get('token')}` } }
        const { data } = await baseURL.get(`/history/org`, config)
        dispatch(finishReq({ histories: data }))
    } catch (error) {
        swal("Get Data Failed", error.response?.data.message, "error");
        dispatch(finishReq({ error: error.response?.data.message }))
    }
}

export const getAllHistory = async (dispatch) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/history/`)
        dispatch(finishReq({ histories: data }))
    } catch (error) {
        swal("Get Data Failed", error.response?.data.message, "error");
        dispatch(finishReq({ error: error.response?.data.message }))
    }
}

export const getHistoryCount = async (dispatch) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/history/count`)
        dispatch(finishReq({ count: data.historyCount }))
    } catch (error) {
        swal("Get Data Failed", error.response?.data.message, "error");
        dispatch(finishReq({ error: error.response?.data.message }))
    }
}