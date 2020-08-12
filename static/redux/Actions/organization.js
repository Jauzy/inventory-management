import baseURL from '../../constants/baseURL.js'
import swal from 'sweetalert'
import { navigate } from 'gatsby'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

//action type
export const LOADING = 'ORG_LOADING';
export const FINISH = 'ORG_FINISH'
export const RESET = 'ORG_RESET'

const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

const reset = () => ({
    type: RESET
})

export const logoutOrganization = (dispatch) => {
    navigate('/')
    cookies.remove('user')
    cookies.remove('token')
    dispatch(reset())
}

export const register = async (dispatch, navigate, { organization_name, email, password }) => {
    try {
        dispatch(enableLoading())
        await baseURL.post(`/organization/`, { organization_name, email, password })
        dispatch(finishReq(null))
        navigate('/login')
    } catch (error) {
        dispatch(finishReq({ error: error.response?.data.message }))
    }
}

export const login = async (dispatch, navigate, { email, password }) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.post('/organization/login', { email, password })
        cookies.set('user', { ...data.user, type: 'Organization' })
        cookies.set('token', data.token)
        dispatch(finishReq({ loggedIn: data.user }))
        navigate('/organization/dashboard')
    } catch (error) {
        dispatch(finishReq({ error: error.response?.data.message }))
    }
}

export const getOrgData = async (dispatch) => {
    if (!cookies.get('user')) dispatch(finishReq(null))
    else {
        dispatch(enableLoading())
        try {
            const config = { headers: { token: `RPLGDC ${cookies.get('token')}` } }
            const { data } = await baseURL.get(`/organization/`, config)
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
            await baseURL.put(`/organization/`, payload, config)
            swal("Update Success", "Your info updated successfully!", "success");
            const { data } = await baseURL.get(`/organization/`, config)
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
            await baseURL.put(`/organization/password`, { newPassword, oldPassword }, config)
            swal("Update Success", "Your password updated successfully!", "success");
            const { data } = await baseURL.get(`/organization/`, config)
            dispatch(finishReq({ loggedIn: data }))
        } catch (error) {
            dispatch(finishReq(error))
            swal("Update Failed", error.response?.data.message, "error");
        }
    }
}

export const getOrganizationCount = async (dispatch) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/organization/count`)
        dispatch(finishReq({ count: data.organizationCount }))
    } catch (error) {
        swal("Get Data Failed", error.response?.data.message, "error");
        dispatch(finishReq({ error: error.response?.data.message }))
    }
}