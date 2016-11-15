//for details on the expect() method from the chai module see
//http://chaijs.com/api/bdd/
import {expect} from "chai";

//import our store and action creator functions from
//our shared-state.js module (the one we wrote during our day on redux)
import {store, addFavorite, removeFavorite} from "../src/shared-state.js";

//a testing item to add as a favorite
var item = {id: 1, title: "testing item"};

/**
 * Mocha tests scripts consist of a series of functions, each of
 * which defines a single test. The `it()` function is used to
 * register a new test function, and the `describe()` function
 * is used to register a set of tests that form a full test suite.
 * Typically you register one suite using `describe()`, and the
 * suite function registers several tests using `it()`. Each 
 * test should verify that the thing you are testing conforms
 * to some specific part of the specification. Keep your tests
 * small and focused so that if it fails, you know right away
 * which part of your code is broken. 
 * 
 * For more details on Mocha, see https://mochajs.org/
 */

//register one suite to test our redux store
describe("redux store", function() {

    //register a test that verifies the store has the correct
    //default state
    it("sould initialize with a default state", function() {
        //get the current state
        //since this is the first test, the current state should
        //be the default state. The default state should be:
        // {favorites: []}
        //see shared-state.js over in the src directory
        var state = store.getState();
        
        //expect() will hold on to whatever value you pass it
        //and you can use any of its testing methods to test
        //that value. For this first one, we will verify that
        //`state.favorites` is an Array
        expect(state.favorites).to.be.instanceOf(Array);
        
        //for this one we will verify that the length of that
        //array is zero (i.e., the array is empty)
        expect(state.favorites.length).to.equal(0);

        //for a full list of testing methods, see:
        //http://chaijs.com/api/bdd/
    });

    it("should add a favorite", function() {
        //get the current state of the store
        var state1 = store.getState();

        //dispatch and addFavorite action to add a new item
        //to the favorites array
        store.dispatch(addFavorite(item));
        
        //get the new state
        var state2 = store.getState();

        //I expect the new length of the favorites array to be 1
        expect(state2.favorites.length).to.equal(1);

        //I epxect the first item in the favorites array
        //to match the item I added
        //the `deep` part of this expression will ensure
        //that the property names and values match instead of 
        //simply testing whether the two object instances are
        //in the same memory location (===) 
        expect(state2.favorites[0]).to.deep.equal(item);
        //Per the rules of redux, we also should expect that 
        //state2 is not the same object as state1. Redux 
        //requires that you return a new object instance if
        //you modify that object in any way. 
        //the following should be true: state1 !== state2
        expect(state1).to.not.equal(state2);
    });

    it("should remove a favorite", function() {
        //remove the favorite and ensure that the favorites
        //array length drops back to 0
        store.dispatch(removeFavorite(item.id));
        var state = store.getState();
        expect(state.favorites.length).to.equal(0);
    });

    it("should ignore an unknown action", function() {
        //if we dispatch an unknown action, our reducer
        //function should ignore it and return the same
        //state object. To verify this, we dispatch an
        //action with an unrecognized type, and ensure that
        //state1 === state2
        var state1 = store.getState();
        store.dispatch({type: "invalid action type"});
        var state2 = store.getState();
        expect(state1).to.equal(state2);
    });
});
