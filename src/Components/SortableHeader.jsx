import React, {Component} from 'react';
// import { block } from 'bem-cn';
//
// const cn = block('table');

class SortableHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            sortMethod: ''
        };
        this.onClick = props.onClick;
    }

    componentWillMount() {
        const {columns, sortMethod} = this.props;
        this.setState({columns: columns, sortMethod: sortMethod});
        window.col = this.state.columns;
    }

    componentWillReceiveProps(nextProps) {
        const {columns , sortMethod} = nextProps;
        this.setState({columns: columns, sortMethod: sortMethod});
    }

    render() {
        //debugger;
        let sortFlag ='';
        if (this.state.sortMethod === 'asc') {
            sortFlag = ' down';
        }else{
            sortFlag = ' up'
        }
        return (
            <thead>
            <tr>
                <th>#</th>
                {this.state.columns.map((element, index) =>
                    <th key={index}
                        onClick={() => this.onClick(index, element, this.state.sortMethod)}
                    >
                        {element} <i className={'arrow' + sortFlag}></i>
                    </th>
                )}
            </tr>
            </thead>
        );
    }
}

export default SortableHeader;