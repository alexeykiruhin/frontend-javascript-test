import React, {Component} from 'react';
import SortableHeader from "./SortableHeader";
import SortableBody from "./SortableBody";
import sortMultidimensionalArrayFunc from 'sort-multidimensional-array-func';
import './Table.css';
import { block } from 'bem-cn';
const cn = block('table');


class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [],
            sortMethod: 'asc'
        };
        this.handleSort = this.handleSort.bind(this);
        this.sort = props.sort;
    }

    componentWillMount() {
        const {data, columns} = this.props;
        this.setState({data, columns});
    }

    componentWillReceiveProps(nextProps) {
        const {data, columns} = nextProps;
        this.setState({data, columns});
    }

    handleSort(id, element, sortMethod) {
        console.log('sorted by: ' + element + ' method: ' + sortMethod);

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

        const newArr = this.sort(this.props.data, element, currentSortMethod);
        this.setState({data: newArr, sortMethod: currentSortMethod});
    }

    render() {
        return (
            <table className={cn}>
                <SortableHeader columns={this.state.columns}
                                onClick={this.handleSort}
                                sortMethod={this.state.sortMethod}/>
                <SortableBody data={this.state.data} />
            </table>
        );
    }
}




export default Table;
