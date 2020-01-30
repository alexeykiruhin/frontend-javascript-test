import React, {Component} from 'react';


class SortableBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPage: null,
            totalPageCount: [],
        };
    }

    componentWillMount() {
        const {data, currentPage, totalPageCount} = this.props;
        this.setState({data, currentPage, totalPageCount});
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        console.log('body ' + nextProps.data);
        const {data, currentPage} = nextProps;
        this.setState({ data, currentPage});
    }

    render() {
        //debugger;

        console.log('2...' + this.state.data[0]);
        console.log('3...' + Object.keys(this.state.data));
        console.log('4...' + (this.state.currentPage - 1));
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

            <button onClick={this.props.handleBack}>Prev</button>
            {this.state.totalPageCount.map((p) => {
                console.log(p);
                return <span className=''>{p}</span>
            })}
            <button onClick={this.props.handleNext}>Next</button>
            </tbody>

        );
    }
}

export default SortableBody;

