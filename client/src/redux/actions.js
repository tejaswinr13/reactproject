import axios from "axios";

export const fetchNutritions = (page = 0, limit = 0, sortKey = '', sortDir = '') => {
  return function (dispatch) {
    const query = `
      query Nutritions($skip: Int, $take: Int, $sortKey: String, $sortDir: String) {
        nutritions(skip: $skip, take: $take, sortKey: $sortKey, sortDir: $sortDir) {
          total
          nutritions {
            id,
            Dessert,
            nutritionInfo {
              calories,
              fat,
              carb,
              protein
            }
          }
        }
      }
    `;

    axios.post('http://localhost:4000/graphql', {query, variables: { skip: page, take: limit, sortKey: sortKey, sortDir: sortDir }})
      .then(data => {
        return dispatch({type: 'NUTRITION_LIST', payload: data.data.data.nutritions})
      })
      .catch(error => {
        return dispatch({type: 'NUTRITION_LIST_ERROR', payload: error})
      })
  };
};

export const deleteNutritions = (id) => {

  return function (dispatch) {
    const query = `
      mutation RemoveNutrition($id: Int!) {
        removeNutrition(id: $id)
      }
    `;

    axios.post('http://localhost:4000/graphql', {query, variables: { id }})
      .then(data => {
        return dispatch({type: 'NUTRITION_DELETE', payload: data.data})
      })
      .catch(error => {
        return dispatch({type: 'NUTRITION_DELETE_ERROR', payload: error})
      })
  };
};

export const createNutritions = (nutrition) => {
  return function (dispatch) {
    const query = `
      mutation CreateNutrition($dessert: String!, $calories: Int!, $fat: Int!, $carb: Int!, $protein: Int!) {
        createNutrition(dessert: $dessert, calories: $calories, fat: $fat, carb: $carb, protein: $protein)
      }
    `;

    axios.post('http://localhost:4000/graphql', {query, variables: { dessert: nutrition.dessert, calories: nutrition.calories, fat: nutrition.fat, carb: nutrition.carb, protein: nutrition.protein }})
      .then(data => {
        return dispatch({type: 'NUTRITION_CREATE', payload: data.data})
      })
      .catch(error => {
        return dispatch({type: 'NUTRITION_CREATE_ERROR', payload: error})
      })
  };
};

export const deleteMultipleNutritions = (ids) => {

  return function (dispatch) {
    const query = `
      mutation RemoveNutritions($ids: [Int!]!) {
        removeNutritions(ids: $ids)
      }
    `;

    axios.post('http://localhost:4000/graphql', {query, variables: { ids }})
      .then(data => {
        return dispatch({type: 'NUTRITION_DELETE_MUL', payload: data.data})
      })
      .catch(error => {
        return dispatch({type: 'NUTRITION_DELETE_MUL_ERROR', payload: error})
      })
  };
};