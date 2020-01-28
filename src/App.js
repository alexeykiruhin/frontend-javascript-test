import React, {Component} from 'react';
import './Components/Table.css';
import Table from "./Components/Table";
import axios from "axios";

const url = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
const url1 = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: []
        };
        this.sort = this.sort.bind(this);
    }

    sort(arr, column, sortMethod) {
        switch (sortMethod) {
            case 'asc':
                return arr.sort((a, b) => a[column] > b[column] ? 1 : -1);
            case 'desc':
                return arr.sort((a, b) => a[column] > b[column] ? -1 : 1);
            default:
                return arr.sort((a, b) => a[column] > b[column] ? 1 : -1);
        }

    }

    componentDidMount() {
        axios.get(url1)
            .then(res => {
                const data = this.sort(res.data, 'id');
                const columns = Object.keys(data[0]).splice(0,5);
                this.setState({data, columns});
            });
    }


    render() {
        return (
            <Table data={this.state.data}
                   columns={this.state.columns}
                   sort={this.sort} />
        );
    }
}

export default App;
