/**
 * app.jsx
 * Main entry point for our React application
 * 
 * This example rebuilds the little app we did that
 * queries the Spotfiy API, but uses React to do it.
 * Compare this to the other app to see how React changes
 * the way we build web applications.
 * 
 * The major difference between this example and the one in
 * the `react` directory is that this shows you how to combine
 * the `fetch()` API with React's `.setState()` method. As soon
 * as the data comes back from Spotify, we call `.setState()`,
 * which automatically triggers a re-render of our component.  
 */
"use strict";

//base URL for the Spotfiy api
//see https://developer.spotify.com/web-api/search-item/
//The ? separates the URL path from the "query string"
//A query string is a set of name/value pairs. They are
//commonly used in APIs to specify parameters.
//We are passing two parameters here: type=track (search only for tracks)
//and q=... (string to search for, which we will get from the user)
const baseURL = "https://api.spotify.com/v1/search?type=track&q=";

/**
 * TrackCard renders a Spotify track object as a Material Design card
 * The track object should be passed as the `track` property
 */
class TrackCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //create a styles object to specify the background image
        //of the first <div> in the card. This will be the album
        //cover art
        var styles = {
            backgroundImage: "url(" + this.props.track.album.images[0].url + ")"
        };

        //return the markup for the card
        //note that in React JSX, you must use `className`
        //instead of `class` for style class names.
        //`class` is a reserved keywork in JavaScript, so they 
        //can't use that in JSX
        return (
            <div className="card">
                <div style={styles} className="card-image">
                </div>
                <div className="card-content">
                    <p>{this.props.track.name}</p>
                </div>
            </div>
        );
    }
}

/**
 * TrackList renders an array of Spotify tracks
 * It expects one property named `tracks` which should be an array
 * of Spotify track objects
 */
class TrackList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //create one <TrackCard> for each element in the this.props.tracks array
        //easiest way to do that is to use the .map() method on the this.props.tracks
        //array. Remember that .map() returns a new array containing the same number of
        //elements, but each element is transformed by running it through your map
        //tranformation function. In this case, our map transformation function converts
        //the track object into a <TrackCard> React component

        //The `key={track.id}` is required by React anytime we create a list of
        //the same React component. React needs a way to tell them apart, so it requires
        //us to add a `key` property set to some unique value. Since Spotify track objects
        //already have a unique `.id` property, we can use that for the key value.
        //see https://facebook.github.io/react/docs/lists-and-keys.html 
        var cards = this.props.tracks.map(track => <TrackCard key={track.id} track={track}></TrackCard>);

        //unfortunately, we can't return {cards} directly here.
        //React component must always return one root element, but that
        //root element can contain as list of other elements/components.
        //so wrap {cards} in a single <div> element, and give that div
        //a style class of `track-list` so we can apply some styling
        return <div className="track-list">{cards}</div>;
    }
}

/**
 * SpotifyApp renders the entire app, so it's the root Component
 * It will render a form the user can type into and query the
 * Spotify API when the user submits the form.
 */
class SpotifyApp extends React.Component {
    constructor(props) {
        super(props);

        //track two mutable state properties:
        // query = the search string the user types in
        // tracks = the array of track objects returned from Spotify
        this.state = {
            query: "", 
            tracks: []
        };
    }

    /**
     * handleChange() is called whenever the user types into the
     * input control. This updates the `query` state property
     */
    handleChange(event) {
        this.setState({query: event.target.value});
    }

    /**
     * handleSubmit() is called whenever the user submits
     * the form (clicks submit button, or hits enter while in the input).
     * This will query the Spotify API and call .setState() with 
     * the resulting track data
     */
    handleSubmit(event) {
        //tell the browser to prevent the default form submit
        //behavior so that we don't navigate away from the page
        event.preventDefault();
        
        //use the fetch() API to query the Spotify API
        //when the results come back, parse them as JSON 
        //and then call .setState() to update the `tracks`
        //state property
        fetch(baseURL + this.state.query)
            .then(response => response.json())
            .then(data => this.setState({tracks: data.tracks.items}))
            .catch(err => alert(err.message));
    }

    render() {
        return (
            <div>
                <form className="search-form"
                    onSubmit={event => this.handleSubmit(event)}>
                    <div className="input-group">
                        <input type="text" className="form-control"
                            value={this.state.query} 
                            placeholder="what do you want to listen to?"
                            autoFocus                              
                            required
                            onChange={event => this.handleChange(event)} />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" 
                                aria-label="search spotify">
                                <span className="glyphicon glyphicon-search" 
                                    aria-hidden="true">
                                </span>
                            </button>
                        </span>
                    </div>
                </form>

                <TrackList tracks={this.state.tracks} />


            </div>
        );
    }
}

ReactDOM.render(<SpotifyApp/>, document.getElementById("app"));

