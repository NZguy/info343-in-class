/**
 * shared-state.js
 * module for declaring our shared redux store
 * and various action creation functions
 */

/**
 * Redux is a shared state manager. It allows us to 
 * share some state data between multiple React components. 
 * This is very handy especially in cases where those
 * components are not in memory at the same time: for example
 * when we use react-router to show different components based
 * on the bookmark part of the URL (the part after the #).
 * React router instantiates and renders only the component 
 * registered for the current bookmark path, but that
 * component might need to add some data to a list that
 * the other component can read when the user switches to it.
 * The easiest way to support that is to use a Redux store.
 * 
 * A redux store is actually really simple: it just tracks a 
 * single JavaScript value, which can be an object with lots
 * of properties and sub-properites. Changing the data in 
 * that store is done by "dispatching" an "action". An action
 * is just a plain-old JavaScript object with at least a `type`
 * property indicating the type of action, but actions may also
 * have other properties set to values that are relevant for the
 * action. For example, an "add favorite" action might have an
 * `item` property set to the item you want to add to the favorites
 * list in the redux store.
 * 
 * The redux store has a `.dispatch()` method that takes one of 
 * these actions. Calling that method will cause redux to call 
 * your "reducer" function, which you provide a reference to 
 * when you create the redux store. The reducer function must 
 * accept two parameters: the current state of the redux store,
 * and the action that was dispatched. If the reducer doesn't
 * know how to handle the action, it must return the `state`
 * that was passed into it. If the reducer does know how to handle 
 * the action, it should construct a new state object from the 
 * current one, apply the necessary changes to that new copy
 * of the state, and return that new state object.
 * 
 * By always returning a new state object, redux can very quickly
 * determine if the state has changed or not. It simply compares
 * the previous state object to the one that was returned by your
 * reducer function. If they are the same object, it knows nothing
 * has changed. If they are different, it knows the data has changed.
 * 
 * You can also ask the redux store to call a function whenever the
 * data in the store changes. You can add one of these functions using
 * the store's `.subscribe()` method. That method returns a function 
 * that you can use to unsubscribe later. See the code in 
 * favorite-list.jsx for an example.
 * 
 * See the assigned readings for more details on Redux.
 */

//since we installed the "redux" module to the 
//node_modules directory using:
//  npm install --save redux
//we can import the createStore() function from that 
//module simply by referring to the module's name. If 
//the source string doesn't start with `./` the module 
//importer will look for the module by name in the 
//node_modules directory
import {createStore} from "redux";

//action names
//the values for these names just need to be unique.
//using constants for these allows us to change the
//names over time if we have to, and helps us avoid
//mistyping the name in our code
const ADD_FAV_ACTION = "addfav";
const REMOVE_FAV_ACTION = "removefav";

//default state for our redux store
//just a simple object with one property named `favorites`,
//which is set to an empty array.
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
            //create a new state object (see above as to why)
            var newState = Object.assign({}, state);
            //use concat to generate a new array with the new item
            //concatenated on the end; this preserves state.favorites.
            //using `.push()` here would mutate state.favorites, which you 
            //shouldn't do in redux. Always use `.concat()` instead.
            newState.favorites = newState.favorites.concat(action.item);
            return newState;            
            //the above lines could be shortened to a single line like this:
            //return Object.assign({}, {favorites: state.favorites.concat(action.item)}, state);
        case REMOVE_FAV_ACTION:
            //return a new state object with a new favorites array
            //with the specified item removed; use `.filter()` to remove it
            return Object.assign({}, {favorites: state.favorites.filter(item => item.id != action.id)}, state);
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
