import React, {Component} from 'react';

class SortableHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            sortMethod: '',
            currentPage: null
        };
        this.onClick = props.onClick;
    }

    componentWillMount() {
        const {columns, sortMethod, currentPage} = this.props;
        this.setState({columns, sortMethod, currentPage});
    }

    componentWillReceiveProps(nextProps) {
        const {columns, sortMethod, currentPage} = nextProps;
        this.setState({columns, sortMethod, currentPage});
    }

    render() {
        let sortFlag = '';
        if (this.state.sortMethod === 'asc') {
            sortFlag = ' down';
        } else {
            sortFlag = ' up'
        }
        return (
            <thead>
            <tr>
                <th>#</th>
                {this.state.columns.map((column, index) =>
                    <th key={index}
                        onClick={() => this.onClick(column, this.state.sortMethod)}
                    >
                        {column} <i className={'arrow' + sortFlag}></i>
                    </th>
                )}
            </tr>
            </thead>
        );
    }
}

export default SortableHeader;