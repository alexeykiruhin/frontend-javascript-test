import React, {Component} from 'react';
import SortableHeader from "./SortableHeader";
import SortableBody from "./SortableBody";
import './Table.css';
import MoreDetails from "./MoreDetails";
import AddRow from "./AddRow";
import Filtration from "./Filtration";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [],
            sortMethod: 'asc',
            currentPage: 1, //Текущая страница
            totalPageCount: [], //Общее количество страниц
            toggleMoreDetails: false, //Переключатель дополнительной информации
            idMoreDetails: null //Айди элемента кототрый надо вывести в блоке доп. информации
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
        for (let i = 1; i <= data.length; i++) {
            countPages.push(i);
        }
        this.setState({data, columns, totalPageCount: countPages});
    }

    componentWillReceiveProps(nextProps) {
        const {data, columns} = nextProps;
        let countPages = [];
        for (let i = 1; i <= data.length; i++) {
            countPages.push(i);
        }
        this.setState({data, columns, totalPageCount: countPages});
    }

    //Обработчик переключения страниц
    // way - направление куда листать или номер конкретной страницы
    handlePagination(way) {
        this.setState({toggleMoreDetails: false});
        //В if контролирую границы переключения
        if (this.state.currentPage !== 1 && way === 'prev') {
            const currentPage = this.state.currentPage - 1;
            this.setState({currentPage});
        } else if (this.state.currentPage !== this.state.totalPageCount.length && way === 'next') {
            const currentPage = this.state.currentPage + 1;
            this.setState({currentPage});
        } else if (Number.isInteger(way)) {
            this.setState({currentPage: way});
        }
    }

    //Пре обработчик сортировки
    //в sort передаю данные текущей страницы
    //и меняю метод сортировки
    handleSort(column, sortMethod) {
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
        const newArr = this.sort(this.state.data[this.state.currentPage - 1], column, currentSortMethod);
        const newData = [...this.state.data];
        newData[this.state.currentPage - 1] = newArr;
        this.setState({data: newData, sortMethod: currentSortMethod});
    }

    //Обработчик блока доп. информации
    handleMoreDetails(id) {
        if (Number.isInteger(id)) {
            this.setState({idMoreDetails: id, toggleMoreDetails: true});
        } else {
            this.setState({toggleMoreDetails: false});
        }
    }

    //Добавление данных в таблицу
    addRow(addData) {
        const data = this.state.data.slice();
        data[this.state.currentPage - 1].unshift(addData);
        this.setState({data});
    }

    render() {
        return (
            <div>
                <AddRow data={this.state.data[this.state.currentPage - 1]}
                        addRow={this.addRow}/>
                <Filtration data={this.state.data}
                            columns={this.state.columns}
                            updateAfterFilter={this.props.updateAfterFilter} />
                <table>
                    <SortableHeader columns={this.state.columns}
                                    onClick={this.handleSort}
                                    sortMethod={this.state.sortMethod}
                                    currentPage={this.state.currentPage}/>
                    <SortableBody data={this.state.data[this.state.currentPage - 1]}
                                  currentPage={this.state.currentPage}
                                  handlePagination={this.handlePagination}
                                  totalPageCount={this.state.totalPageCount}
                                  handleMoreDetails={this.handleMoreDetails}/>
                    <MoreDetails data={this.state.data[this.state.currentPage - 1]}
                                 toggleMoreDetails={this.state.toggleMoreDetails}
                                 idMoreDetails={this.state.idMoreDetails}
                                 handleMoreDetails={this.handleMoreDetails}/>
                </table>
            </div>

        );
    }
}


export default Table;
