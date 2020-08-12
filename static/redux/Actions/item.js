import baseURL from '../../constants/baseURL.js'
import swal from 'sweetalert'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

//action type
export const LOADING = 'ITEM_LOADING';
export const FINISH = 'ITEM_FINISH'
export const RESET = 'ITEM_RESET'

const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

const reset = () => ({
    type: RESET
})

export const register = async (dispatch, name) => {
    if (!cookies.get('user')) dispatch(finishReq(null))
    else {
        dispatch(enableLoading())
        try {
            const config = { headers: { token: `RPLGDC ${cookies.get('token')}` } }
            await baseURL.post(`/item/`, { name }, config)
            swal("Add Success", name + " added successfully!", "success");
            const { data } = await baseURL.get(`/item/`)
            dispatch(finishReq({ items: data }))
        } catch (error) {
            swal("Update Failed", error.response?.data.message, "error");
            dispatch(finishReq({ error: error.response?.data.message }))
        }
    }
}

export const getAll = async (dispatch) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/item/`)
        dispatch(finishReq({ items: data }))
    } catch (error) {
        swal("Update Failed", error.response?.data.message, "error");
        dispatch(finishReq({ error: error.response?.data.message }))
    }
}

export const updateItemInfo = async (dispatch, id, name) => {
    if (!cookies.get('user')) dispatch(finishReq(null))
    else {
        dispatch(enableLoading())
        try {
            const config = { headers: { token: `RPLGDC ${cookies.get('token')}` } }
            await baseURL.put(`/item/${id}`, { name }, config)
            swal("Edit Success", name + " updated successfully!", "success");
            const { data } = await baseURL.get(`/item/`)
            dispatch(finishReq({ items: data }))
        } catch (error) {
            swal("Update Failed", error.response?.data.message, "error");
            dispatch(finishReq({ error: error.response?.data.message }))
        }
    }
}

export const deleteItem = async (dispatch, id) => {
    if (!cookies.get('user')) dispatch(finishReq(null))
    else {
        dispatch(enableLoading())
        try {
            const config = { headers: { token: `RPLGDC ${cookies.get('token')}` } }
            await baseURL.delete(`/item/${id}`, config)
            swal("Delete Success", "item deleted successfully!", "success");
            const { data } = await baseURL.get(`/item/`)
            dispatch(finishReq({ items: data }))
        } catch (error) {
            swal("Update Failed", error.response?.data.message, "error");
            dispatch(finishReq({ error: error.response?.data.message }))
        }
    }
}

export const getItemCount = async (dispatch) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/item/count`)
        dispatch(finishReq({ count: data.itemCount }))
    } catch (error) {
        swal("Get Data Failed", error.response?.data.message, "error");
        dispatch(finishReq({ error: error.response?.data.message }))
    }
}