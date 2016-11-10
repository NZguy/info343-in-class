import React from "react";

//import our CSS file so it gets included in the bundle
import "./css/main.css";

import {Link, IndexLink} from "react-router";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li>
                            <IndexLink to="/" activeClassName="active">
                                Users
                            </IndexLink>
                        </li>
                        <li>
                            <Link to="/favorites" activeClassName="active">
                                Favorites
                            </Link>
                        </li>
                    </ul>
                </nav>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}
