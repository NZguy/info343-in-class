"use strict";

// All the same, shorthand for anonymous functions
// var females = BABYNAMES.filter(function(record){
//     return "F" == record.sex;
// });
// var females = BABYNAMES.filter((record) => {
//     return "F" == record.sex;
// });
// var females = BABYNAMES.filter(record => {
//     return "F" == record.sex;
// });
var females = BABYNAMES.filter(record => "F" == record.sex);
var topFemNames = females.sort((rec1, rec2) => rec2.count - rec1.count).slice(0, 100);
console.log(topFemNames.length);

//main application React component
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var colMeta = {
            count: {
                type: columnTypes.numeric,
                caption: "Number of Babies"
            }
        }
        return (
            <div className="container">
                <h1>Most Popular Female Baby Names from 1996</h1>
                <DataTable records={this.props.records} columnMeta={colMeta}/>
            </div>
        );
    }
}

//render the App component to the element with id="app"
ReactDOM.render(<App records={topFemNames}/>, document.getElementById("app"));

// Example of react stuff
// <ul>
//     {
//         // Key must be some unique id so that react can compare which 
//         // elements were changed in each render
//         this.props.records.map(record => <li key={record.name}>{record.name} {record.count}</li>)
//     }
// </ul>