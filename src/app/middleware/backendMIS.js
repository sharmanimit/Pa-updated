import {normalize, schema} from "normalizr";
import {camelizeKeys} from "humps";

const API_ROOT = '/misApplication2';

const callApi1 = (endpoint, settings = {}) => {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

    return fetch(fullUrl, settings).then(response => response.json().then((res)=> {
        console.log(res);
        return res;
    }));

};

export const BACKEND_API_MISS = 'BACKEND_API_MISS';

export default store => next => action => {

    const callAPI = action[BACKEND_API_MISS]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint } = callAPI;
    const {  types, settings } = callAPI;
    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[BACKEND_API_MISS]
        return finalAction
    }

    const [ requestType, successType, failureType ] = types
    next(actionWith({ type: requestType }))
    return  callApi1(endpoint, settings).then(response => {return response},
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened'
        })));

}



