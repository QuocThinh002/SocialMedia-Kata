import { apiGetFriends, apiGetMe, apiUpdateUser } from "../../services/user.service";
import actionTypes from "./actionTypes";

export const getMe = () => async (dispatch) => {
    try {
        console.log('apiGetMe::')
        const response = await apiGetMe();

        if (response.status) {
            dispatch({
                type: actionTypes.GET_ME,
                user: response.data?.user,
                language: response.data?.user?.language
            })
        }
    } catch (error) {
        
    }
}

export const getFriends = () => async (dispatch) => {
    try {
        console.log('apiGetFriends::')
        const response = await apiGetFriends();

        if (response.status) {
            dispatch({
                type: actionTypes.GET_FRIENDS,
                friends: response.data?.friends
            })
        }
    } catch (error) {
        
    }
}

export const updateUser = (data) => async (dispatch) => {
    try {
        console.log('apiUpdateUser::');
        const response = await apiUpdateUser(data);

        if (response.status) {
            dispatch({
                type: actionTypes.UPDATE_ME,
                user: response.data.user
            })
        }
    } catch (error) {
        
    }
}

export const updateUserNoneApi = (response) => async (dispatch) => {
    try {

        if (response.status) {
            dispatch({
                type: actionTypes.UPDATE_ME,
                user: response.data.user
            })
        }
    } catch (error) {
        
    }
}