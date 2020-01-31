import React, {Component} from 'react';
import SortableHeader from "./SortableHeader";
import SortableBody from "./SortableBody";
import './Table.css';
import MoreDetails from "./MoreDetails";
import AddRow from "./AddRow";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [],
            sortMethod: 'asc',
            currentPage: 1,
            totalPageCount: [],
            toggleMoreDetails: false,
            idMoreDetails: null
        };
        this.handleSort = this.handleSort.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
        this.handleMoreDetails = this.handleMoreDetails.bind(this);
        this.addRow = this.addRow.bind(this);
        this.sort = props.sort;
    }

    componentWillMount() {
        const {data, columns} = this.props;
        let countPages = [];
        for(let i = 1; i <= data.length; i++){
            countPages.push(i);
        }
        this.setState({data, columns, totalPageCount:countPages});
    }

    componentWillReceiveProps(nextProps) {
        const {data, columns} = nextProps;
        this.setState({data, columns});
    }

    handlePagination(way) {
        this.setState({toggleMoreDetails: false});
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

    handleMoreDetails(id) {
        if (Number.isInteger(id)) {
            this.setState({idMoreDetails: id, toggleMoreDetails: true});
        }else {
            this.setState({toggleMoreDetails: false});
        }
    }


    addRow(addData) {
        const data = this.state.data.slice();
        data[this.state.currentPage-1].unshift(addData);
        this.setState({data});
    }

    render() {
        return (
            <div>
                <AddRow data={this.state.data[this.state.currentPage-1]}
                        addRow={this.addRow}/>
                <table>
                    <SortableHeader columns={this.state.columns}
                                    onClick={this.handleSort}
                                    sortMethod={this.state.sortMethod}
                                    currentPage={this.state.currentPage} />
                    <SortableBody data={this.state.data[this.state.currentPage-1]}
                                  currentPage={this.state.currentPage}
                                  handlePagination={this.handlePagination}
                                  totalPageCount={this.state.totalPageCount}
                                  handleMoreDetails={this.handleMoreDetails}/>
                    <MoreDetails data={this.state.data[this.state.currentPage-1]}
                                 toggleMoreDetails={this.state.toggleMoreDetails}
                                 idMoreDetails={this.state.idMoreDetails}
                                 handleMoreDetails={this.handleMoreDetails}/>
                </table>
            </div>

        );
    }
}


export default Table;
