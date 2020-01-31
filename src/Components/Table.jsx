import React, {Component} from 'react';
import SortableHeader from "./SortableHeader";
import SortableBody from "./SortableBody";
import './Table.css';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [],
            sortMethod: 'asc',
            currentPage: 1,
            totalPageCount: [],
        };
        this.handleSort = this.handleSort.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.sort = props.sort;
    }

    componentWillMount() {
        const {data, columns} = this.props;

        let countPages = [];
        for(let i = 1; i <= data.length; i++){
            countPages.push(i);
            console.log(i)
        }
        this.setState({data, columns, totalPageCount:countPages});
    }

    componentWillReceiveProps(nextProps) {
        const {data, columns} = nextProps;
        this.setState({data, columns});
    }

    handlePagination(way) {
        if (this.state.currentPage !== 1 && way === 'prev') {
            const currentPage = this.state.currentPage - 1;
            this.setState({currentPage});
        }else if(this.state.currentPage !== this.state.totalPageCount.length && way === 'next') {
            const currentPage = this.state.currentPage + 1;
            this.setState({currentPage});
        }else if(Number.isInteger(way)) {
            console.log('way === number');
            this.setState({currentPage: way});
        }
        console.log('not if');
    }

    handleSort(column, sortMethod) {
        console.log('sorted by: ' + column + ' method: ' + sortMethod);

        let currentSortMethod = 'asc';

        switch (sortMethod) {
            case 'asc':
                currentSortMethod = 'desc';
                break;
            case 'desc':
                currentSortMethod = 'asc';
                break;
            default:
                currentSortMethod = 'asc';
        }
        const newArr = this.sort(this.state.data[this.state.currentPage-1], column, currentSortMethod);
        const newData = [...this.state.data];
        newData[this.state.currentPage-1] = newArr;
        this.setState({data: newData, sortMethod: currentSortMethod});
    }

    render() {
        return (
            <table>
                <SortableHeader columns={this.state.columns}
                                onClick={this.handleSort}
                                sortMethod={this.state.sortMethod}
                                currentPage={this.state.currentPage} />
                <SortableBody data={this.state.data[this.state.currentPage-1]}
                              pageSize={this.props.pageSize}
                              currentPage={this.state.currentPage}
                              handlePagination={this.handlePagination}
                              totalPageCount={this.state.totalPageCount}/>
            </table>
        );
    }
}


export default Table;
