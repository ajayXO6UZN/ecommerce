import axios from "../helpers/axios";
import {
  GET_ALL_CATEGORIES_REQUEST,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
  ADD_NEW_CATEGORIES_REQUEST,
  ADD_NEW_CATEGORIES_SUCCESS,
  ADD_NEW_CATEGORIES_FAILURE,
  UPDATE_CATEGORIES_REQUEST,
  UPDATE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_FAILURE,
  DELETE_CATEGORIES_REQUEST,
  DELETE_CATEGORIES_SUCCESS,
  DELETE_CATEGORIES_FAILURE
} from "../constants/categoryConstants";


// Get All category
export const getAllCategory = () => {
  return async dispatch => {
      dispatch({ type: GET_ALL_CATEGORIES_REQUEST });
      const res = await axios.get(`/api/getCategory`);
    
      if (res.status === 200) {
          const { categoryList } = res.data;

          
          dispatch({
              type: GET_ALL_CATEGORIES_SUCCESS,
              payload: { categories: categoryList }
          });
      } else {
          dispatch({
              type: GET_ALL_CATEGORIES_FAILURE,
              payload: res.data.error 
          });
      }

  }
}


export const addCategory = (form) => {
    return async dispatch => {
        console.log(form);
        dispatch({ type: ADD_NEW_CATEGORIES_REQUEST });
        try {
            const res = await axios.post('/api/addCategory', form);
            if (res.status === 201) {
                dispatch({
                    type: ADD_NEW_CATEGORIES_SUCCESS,
                    payload: { category: res.data.category }
                });
            } else {
                dispatch({
                    type: ADD_NEW_CATEGORIES_FAILURE,
                    payload: res.data.error
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        dispatch({ type: UPDATE_CATEGORIES_REQUEST });
        const res = await axios.post(`/api/updateCategory`, form);
        if (res.status === 201) {
            dispatch({ type: UPDATE_CATEGORIES_SUCCESS });
            dispatch(getAllCategory());
        } else {
            const { error } = res;
            dispatch({
                type: UPDATE_CATEGORIES_FAILURE,
                payload: { error }
            });
        }
    }
}

export const deleteCategories = (ids) => {
    return async dispatch => {
        dispatch({ type: DELETE_CATEGORIES_REQUEST });

        const res = await axios.post(`/api/category/delete`, {
            payload: {
                ids
            }
        });
  
        if (res.status == 201) {
            dispatch(getAllCategory());
            dispatch({ type: DELETE_CATEGORIES_SUCCESS });
        } else {
            const { error } = res.data;
            dispatch({
                type: DELETE_CATEGORIES_FAILURE,
                payload: { error }
            });
        }
    }
}