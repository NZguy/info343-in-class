"use strict";

//base URL for the Spotfiy api
//see https://developer.spotify.com/web-api/search-item/
//The ? separates the URL path from the "query string"
//A query string is a set of name/value pairs. They are
//commonly used in APIs to specify parameters.
//We are passing two parameters here: type=track (search only for tracks)
//and q=... (string to search for, which we will get from the user)
const baseURL = "https://api.spotify.com/v1/search?type=track&q=";

class TrackCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        var styles = {
            backgroundImage: "url(" + this.props.track.album.images[0].url + ")"
        };
        return(
            <div className="card">
                <div style={styles} className="card-image"></div>
                <div className="card-content">
                    <p>{this.props.track.name}</p>
                </div>
            </div>
        );
    }
}

class TrackList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.tracks.items){
            var cards = this.props.tracks.items.map(track => 
            <TrackCard key={track.id} track={track}></TrackCard>);

            return <div>{cards}</div>;
        }else{
            return <p></p>;
        }
    }
}

/**
 * SpotifyApp - main application component
 */
class SpotifyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "", 
            tracks: []
        };
    }

    handleChange(event){
        this.setState({query: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        //console.log(this.state.query);
        fetch(baseURL + this.state.query)
            .then(response => response.json())
            .then(data => this.setState({tracks: data.tracks}))
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
