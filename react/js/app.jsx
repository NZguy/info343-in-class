/**
 * app.jsx
 * main entry point for our React application
 * 
 * In this example, we are loading the React and ReactDOM
 * libraries from a CDN, and we also loaded a library called
 * Babel from its CDN location. The Babel library knows how to
 * "transpile" (translate) the new ES6 JavaScript syntax into
 * JavaScript that older browsers know how to understand. So we
 * can use all the new ES6 syntax in this file, because the
 * browser won't try to execute this file: instead, Babel will
 * transpile it into a new <script> element that it dynamically
 * adds to the page's <head> element. Use the Developer Tools to
 * see the new <script> element in the <head> section. 
 */

//technically, ES6 files are always run in strict mode,
//but it doesn't hurt to explicitly include the strict
//directive here
"use strict";

/*
 * React Components
 * A React "Component" is a JavaScript class (or simple function)
 * that can render HTML markup given some data. That data can be 
 * passed to the component as "props" (properties), or it can
 * be state that is maintained by the component itself. The props
 * are immutable, meaning you should never change them: the
 * component that creates your component passes in the props and
 * your component can read them, but it should never change them.
 * 
 * State data on the other hand is data that your component tracks
 * and it can change. Whenver the state of component changes,
 * React will re-render that component by calling the component's
 * `render()` method. The HTML markup your component returns can
 * refer to both the props and the state data. You can update the
 * state of your component by calling your component's `.setState()`
 * method. That method is provided by React, and it's what enables
 * React to know that state has changed, and that your component
 * needs to be re-rendered. 
 * 
 * Components can be implemented either as JavaScript class
 * or as a simple JavaScript function(). The former can accept
 * props and have changable state. The latter can only accept
 * props, and can't have any changeable state. If you use the
 * function form, the function is essentially the render() method,
 * so it needs to return the HTML markup for the component.
 * 
 * If you use a JavaScript class, it must extend React.Component.
 */


/**
 * NameForm component
 * Represents a form with a single input control for a person's name.
 * Components who create this component can pass an `onChange`
 * property, set to a function that you want called when
 * the user types into the input control. That function will
 * be passed one parameter, which is the current contents of
 * the name input.
 */
class NameForm extends React.Component {
    /**
     * JavaScript classes can have contstructors, just like
     * Java classes. All React components will be passed a 
     * `props` parameter, which will be a JavaScript object
     * containing any properties defined on the component.
     * To create one of these, you use JSX like this:
     * 
     * <NameForm onChange={...function to call when name changes...} />
     */
    constructor(props) {
        //pass the props to the superclass, which is React.Component
        super(props);
        //initialize our state to be an object with one property
        //named `name`, which is set to an empty string
        this.state = {name: ""};
    }

    /**
     * handleChange() is called from the markup below whenever the
     * input control's `change` event happens. All React events are 
     * passed a React.SyntheticEvent object, which is a normalized
     * version of the browser's native event object. We can use this
     * to get the current value of the input control
     */
    handleChange(event) {
        //`event.target` is the input control, and it has a `.value`
        //property, which will be the current value of the input 
        var newName = event.target.value;
        
        //update our own state, setting the new value for `name`
        this.setState({name: newName});

        //if the creator of this component wants to be notified
        //of the new name, call the function they passed to us 
        //in the `onChange` property.
        if (this.props.onChange) {
            this.props.onChange(newName);
        }
    }

    /**
     * render() renders the HTML markup for this component
     * This will be a form with an input 
     */
    render() {
        //the `value` attribute on the input is set to the
        //current value of this.state.name, which will be updated
        //whenever the user types into the input. The onChange 
        //attribute is set to a function that will be called by
        //the browser (via React) whenever the user types into 
        //the input element.
        //Here we use the new ES6 "big arrow" notation for inline
        //functions. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions.
        //
        //   event => this.handleChange(event)
        // 
        // is equivalent to:
        //
        //   var self = this;
        //   function(event) {
        //     //in a callback function `this` is reset to `window`
        //     //so we can't use it directly
        //     self.handleChange(event)
        //   }
        //
        // but the big arrow notation is much simpler and more compact,
        // so most everyone tends to use it.
        //
        return (
            <form>                 
                <input type="text" 
                    className="form-control"
                    value={this.state.name}
                    onChange={event => this.handleChange(event)} />
            </form>
        );
    }
}

/**
 * Hello is a simple component that renders an h2
 * that says hello to whatever name is passed in as a property
 */
class Hello extends React.Component {
    constructor(props) {
        super(props);        
    } 

    render() {
        //return an h2 that says hello to whatever name
        //was passed in the `name` property
        return (
            <h2>Hello {this.props.name}!</h2>
        );
    }    
}

/**
 * App is a component that acts as the root
 * of our React application. It will create the 
 * other two components, and update its state
 * whenever the NameInput is updated by the user
 */
class App extends React.Component {
    constructor(props) {
        super(props);

        //this component will track a state value
        //with the name of `name`. Every time that changes
        //React will re-render this component, and all 
        //sub-components this component creates when it renders 
        this.state = {name: ""}
    }

    /**
     * This will be called whenver the <NameForm> needs to notify
     * us that the input's value has changed. The <NameForm> will
     * pass us the new name as the first and only parameter
     */
    handleNameChange(name) {
        this.setState({name: name});
    }

    render() {
        //render a <div> containing a <NameForm/> and a <Hello/> component
        //the <Hello/> component will be passed the current value of 
        //`this.state.name` as its `name` property. The <NameForm> is
        //passed via its `onChange` property a function to call whenever 
        //the name changes. This is our `handleNameChange` method   
        return (
            <div>
                <NameForm 
                    onChange={name => this.handleNameChange(name)}></NameForm>
                <Hello name={this.state.name}></Hello>
            </div>
        );
    }
}

//this line of code is executed when the page first loads
//and it starts the entire rendering process
//the first parameter is the root React Component you want to 
//render, and the second parameter is the HTML element inside
//of which you want to render your React Components
ReactDOM.render(<App/>, document.getElementById("app"));
