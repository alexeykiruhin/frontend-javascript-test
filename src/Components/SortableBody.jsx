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
        const {data, currentPage, totalPageCount} = nextProps;
        this.setState({data, currentPage, totalPageCount});
    }


    render() {
        return (
            <tbody>
            {this.state.data.map((element, index) =>
                <tr key={index} onClick={() => this.props.handleMoreDetails(element.id)}>
                    <td>{index + 1}</td>
                    <td>{element.id}</td>
                    <td>{element.firstName}</td>
                    <td>{element.lastName}</td>
                    <td>{element.email}</td>
                    <td>{element.phone}</td>
                </tr>
            )}
            </tbody>
        );
    }
}

export default SortableBody;