import { LOGIN, LOGOUT, REGISTER } from "./Actions"
const initialState = {
    isLoading: true,
    id: null,
    userToken: null,
    isLogin: false
}
const reducer = (state, action) =>{
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                id: action.id,
                userToken: action.token,
                isLoading: false,
                isLogin: true,
            }
        case REGISTER:
            return{
                ...state,
                id: action.id,
                isLoading: false,
            }
        case LOGOUT:
            return{
                ...state,
                id: null,
                userToken: null,
                isLoading: false,
                isLogin: false
            }
    }
}

export {initialState}
export default reducer;