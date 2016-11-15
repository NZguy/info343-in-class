/**
 * shared-state.js
 * module for declaring our shared redux store
 * and various action creation functions
 */

import {createStore} from "redux";

//action names
const ADD_FAV_ACTION = "addfav";
const REMOVE_FAV_ACTION = "removefav";

//default state for our redux store
const DEFAULT_STATE = {favorites: []};

//local storage key: this is passed to localStorage.getItem()
//and localStorage.setItem() to get/set the contents of the store.
//for more information on local storage, see 
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
const LS_KEY = "redux-store";

/**
 * reducer() is the reducer function for our redux store.
 * See above for a general description of reducer functions.
 * All reducers have the signature: (state, action) => state
 * @param {Object} state current state in the redux store
 * @param {Object} action action that was dispatched
 * @returns {Object} the new state
 */
function reducer(state, action) {
    //switch is like if/elseif/elseif/elseif/.../else
    //just more compact
    switch(action.type) {
        case ADD_FAV_ACTION:
            //return a new state object with the new favorites
            //array containing the old array concatenated with the new item 
            return Object.assign({}, state, {favorites: state.favorites.concat(action.item)});
        case REMOVE_FAV_ACTION:
            //return a new state object with a new favorites array
            //with the specified item removed; use `.filter()` to remove it
            return Object.assign({}, state, {favorites: state.favorites.filter(item => item.id != action.id)});
        default:
            //if we don't recognize the action, return the state
            //that was passed in to us; redux requires this
            return state;
    }
}

/**
 * addFavorite() returns a new add favorite action
 * In redux-speak, this is known as an "action creator" function 
 * @param {Object} item the object to add to the favorites
 * @returns {Object} an add favorite action
 */
export function addFavorite(item) {
    return {
        type: ADD_FAV_ACTION,
        item: item
    }
}

/**
 * removeFavorite() returns a new remove favorite action
 * In redux-speak, this is known as an "action creator" function 
 * @param {number|string} id the unique id of the item to remove
 * @returns {Object} a remove favorite action 
 */
export function removeFavorite(id) {
    return {
        type: REMOVE_FAV_ACTION,
        id: id
    }
}

//load any previously-saved state from local storage and
//parse it as JSON. Since local storage can only save strings
//we need to encode/decode the state as a JSON string
//if we get `undefined` from localStorage.getItem(), JSON.parse()
//will also return `undefined` (with no error).  
var savedState = JSON.parse(localStorage.getItem(LS_KEY)); 

//create the Redux store, passing a reference to our reducer function
//and the initial state (either the previously-saved state, or the 
//DEFAULT_STATE if nothing has been saved yet)
export var store = createStore(reducer, savedState || DEFAULT_STATE);

//subscribe to the store: i.e., as the store to call a function
//whenever the data in the store changes. Our function will save
//the new state to local storage, so that we can reload it again
//when the user refreshes the page, or comes back to it later.
store.subscribe(() => localStorage.setItem(LS_KEY, JSON.stringify(store.getState())));
