/**
 * shared-state.js
 * module for declaring our shared redux store
 * and various action creation functions
 */
import {createStore} from "redux";

const ADD_FAV_ACTION = "addfav";
const REMOVE_FAV_ACTION = "removefav";
const DEFAULT_STATE = {favorites: []};
const LS_KEY = "redux-store";

function reducer(state, action) {
    switch(action.type) {
        case ADD_FAV_ACTION:
            return Object.assign({}, {favorites: state.favorites.concat(action.item)});
        case REMOVE_FAV_ACTION:
            return Object.assign({}, {favorites: state.favorites.filter(item => item.id != action.id)});
        default:
            return state;
    }
}

export function addFavorite(item) {
    return {
        type: ADD_FAV_ACTION,
        item: item
    }
}

export function removeFavorite(id) {
    return {
        type: REMOVE_FAV_ACTION,
        id: id
    }
}

var savedState = JSON.parse(localStorage.getItem(LS_KEY));
export var store = createStore(reducer, savedState || DEFAULT_STATE);

store.subscribe(() => localStorage.setItem(LS_KEY, JSON.stringify(store.getState())));