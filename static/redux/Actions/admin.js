import baseURL from '../../constants/baseURL.js'
import swal from 'sweetalert'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

//action type
export const LOADING = 'ADMIN_LOADING';
export const FINISH = 'ADMIN_FINISH'
export const RESET = 'ADMIN_RESET'

const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

const reset = () => ({
    type: RESET
})

export const logoutAdmin = (dispatch) => {
    cookies.remove('user')
    cookies.remove('token')
    dispatch(reset())
}

export const register = async (dispatch, navigate, { name, email, password }) => {
    try {
        dispatch(enableLoading())
        await baseURL.post(`/admin/`, { name, email, password })
        dispatch(finishReq(null))
        navigate('/login-admin')
    } catch (error) {
        dispatch(finishReq({ error: error.response?.data.message }))
    }
}

export const login = async (dispatch, navigate, { email, password }) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.post('/admin/login', { email, password })
        cookies.set('user', { ...data.user, type: 'Admin' })
        cookies.set('token', data.token)
        dispatch(finishReq({ loggedIn: data.user }))
        navigate('/admin/dashboard')
    } catch (error) {
        dispatch(finishReq({ error: error.response?.data.message }))
    }
}

export const getAdminData = async (dispatch) => {
    if (!cookies.get('user')) dispatch(finishReq(null))
    else {
        dispatch(enableLoading())
        try {
            const config = { headers: { token: `RPLGDC ${cookies.get('token')}` } }
            const { data } = await baseURL.get(`/admin/`, config)
            dispatch(finishReq({ loggedIn: data }))
        } catch (error) {
            dispatch(finishReq({ error: error.response?.data.message }))
        }
    }
}

export const updateInfo = async (dispatch, payload) => {
    if (!cookies.get('user')) dispatch(finishReq(null))
    else {
        dispatch(enableLoading())
        try {
            const config = { headers: { token: `RPLGDC ${cookies.get('token')}` } }
            await baseURL.put(`/admin/`, payload, config)
            swal("Update Success", "Your info updated successfully!", "success");
            const { data } = await baseURL.get(`/admin/`, config)
            dispatch(finishReq({ loggedIn: data }))
        } catch (error) {
            dispatch(finishReq(error))
            swal("Update Failed", error.response?.data.message, "error");
        }
    }
}

export const changePassword = async (dispatch, { newPassword, oldPassword }) => {
    if (!cookies.get('user')) dispatch(finishReq(null))
    else {
        dispatch(enableLoading())
        try {
            const config = { headers: { token: `RPLGDC ${cookies.get('token')}` } }
            await baseURL.put(`/admin/password`, { newPassword, oldPassword }, config)
            swal("Update Success", "Your password updated successfully!", "success");
            const { data } = await baseURL.get(`/admin/`, config)
            dispatch(finishReq({ loggedIn: data }))
        } catch (error) {
            dispatch(finishReq(error))
            swal("Update Failed", error.response?.data.message, "error");
        }
    }
}

export const getAdminCount = async (dispatch) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/admin/count`)
        dispatch(finishReq({ count: data.adminCount }))
    } catch (error) {
        swal("Get Data Failed", error.response?.data.message, "error");
        dispatch(finishReq({ error: error.response?.data.message }))
    }
}