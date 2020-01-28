import React, {Component} from 'react';


class SortableBody extends Component {
    constructor(props) {
        super(props);
        this.cnt = 50;
        this.state = {
            data: []
        };
        this.handleNext = this.handleNext.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {data, cnt} = nextProps;
        console.log(nextProps.cnt);
        const splData = data.slice(0, cnt);
        //splData.map((e) => {console.log(e.id)});
        this.setState({data: splData});
    }

    handleNext() {
        console.log('Next');
        this.cnt = 10;
        console.log(this.cnt);
    }

    render() {
        //debugger;
        return (
            <tbody>
            {this.state.data.map((element, index) =>
                <tr key={index}>
                    <td >{index + 1}</td>
                    <td >{element['id']}</td>
                    <td >{element['firstName']}</td>
                    <td >{element['lastName']}</td>
                    <td >{element['email']}</td>
                    <td >{element['phone']}</td>
                </tr>
            )}

            <button>Prev</button>
            <button onClick={this.handleNext}>Next</button>
            </tbody>

        );
    }
}

export default SortableBody;
