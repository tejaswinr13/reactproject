const defaultState = {};

const reducers = (state = defaultState, action) => {
  switch(action.type) {
    case 'NUTRITION_LIST':
      return {
        ...state,
        nutritions: action.payload
      }
    case 'NUTRITION_LIST_ERROR':
      return {
        ...state,
        nutritionsError: action.payload
      }
    case 'NUTRITION_DELETE':
      return {
        ...state,
        nutritionDeleted: action.payload
      }
    case 'NUTRITION_DELETE_ERROR':
      return {
        ...state,
        nutritionDeleteError: action.payload
      }
    case 'NUTRITION_CREATE':
      return {
        ...state,
        nutritionCreated: action.payload
      }
    case 'NUTRITION_CREATE_ERROR':
      return {
        ...state,
        nutritionCreateError: action.payload
      }
    case 'NUTRITION_DELETE_MUL':
      return {
        ...state,
        nutritionsDeleted: action.payload
      }
    case 'NUTRITION_DELETE_MUL_ERROR':
      return {
        ...state,
        nutritionsDeletedError: action.payload
      }
    default: return state;
  }
}

export default reducers;