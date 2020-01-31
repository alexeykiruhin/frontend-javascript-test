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
        const {data, currentPage} = nextProps;
        this.setState({ data, currentPage});
    }


    render() {
        return (
            <tbody>
            {this.state.data.map((element, index) =>
                <tr key={index} onClick={() => this.props.handleMoreDetails(element.id)}>
                    <td >{index + 1}</td>
                    <td >{element.id}</td>
                    <td >{element.firstName}</td>
                    <td >{element.lastName}</td>
                    <td >{element.email}</td>
                    <td >{element.phone}</td>
                </tr>
            )}

            <div>
                <button onClick={() => this.props.handlePagination('prev')}>Prev</button>
                {this.state.totalPageCount.map((p) => {
                    console.log(p);
                    return <span className={p === this.state.currentPage ? 'p toggleP' : 'p'}
                                 onClick={() => this.props.handlePagination(p)}>{p}</span>
                })}
                <button onClick={() => this.props.handlePagination('next')}>Next</button>
            </div>
            </tbody>



        );
    }
}

export default SortableBody;