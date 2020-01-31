import React, {Component} from 'react';


class Pagination extends Component {
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

            <div>
                <button onClick={() => this.props.handlePagination('prev')}>Prev</button>
                {this.state.totalPageCount.map((p) => {
                    return <span className={p === this.state.currentPage ? 'p toggleP' : 'p'}
                                 onClick={() => this.props.handlePagination(p)}>{p} </span>
                })}
                <button onClick={() => this.props.handlePagination('next')}>Next</button>
            </div>)
    }
}

export default Pagination;