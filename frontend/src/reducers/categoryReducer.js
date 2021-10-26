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

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];
  console.log('parentId', categories)
  if (parentId == undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        label: category.name,
        slug: category.slug,
        type: category.type,
        children: []
      }
    ];
  }

  for (let cat of categories) {

    if (cat._id == parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        type: category.type,
        children: []
      };
      myCategories.push({
        ...cat,
        children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
      })
    } else {
      myCategories.push({
        ...cat,
        children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
      });
    }


  }
  return myCategories;
}


export const newCategoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        loading: false,
        // success: action.payload.success,
        categories: action.payload.categories,
      };
    case GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // addcategory reducer
    case ADD_NEW_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_NEW_CATEGORIES_SUCCESS:

      const category = action.payload.category;
      const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
      console.log('updated categoires', updatedCategories);
      return {
        ...state,
        // success: action.payload.success,
        categories: updatedCategories,
        loading: false,
      };
    case ADD_NEW_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // addcategory reducer end
    case UPDATE_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
      break;
    case UPDATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
      break;
    case UPDATE_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
      break;
    //DELETE REDUCER
    case DELETE_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true
      }
      break;
    case DELETE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false
      }
      break;
    case DELETE_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
      break;
    //   case NEW_PRODUCT_RESET:
    //     return {
    //       ...state,                                                                 
    //       success: false, 
    //     };
    //   case CLEAR_ERRORS:
    //     return {
    //       ...state,
    //       error: null,
    //     };
    default:
      return state;
  }
};

