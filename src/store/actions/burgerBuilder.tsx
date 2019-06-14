import axios from '../../axios';
import { DispatchProp } from 'react-redux';

export const initIngredients = () => {
    return (dispatch: DispatchProp['dispatch']) => {
        axios
            .get('/ingredients.json')
            .then(response =>
                dispatch({
                    type: 'SET_INGREDIENTS',
                    ingredients: response.data
                })
            )
            .catch(error => dispatch({ type: 'FETCH_INGREDIENTS_FAILED' }));
    };
};
