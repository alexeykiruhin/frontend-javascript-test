import React, {Component} from 'react';
import './Components/Table.css';
import Table from "./Components/Table";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], //полученные данные
            columns: [], //название колонок
            question: true, //вопрос по объёму данных
            toggleTable: false, //видимость таблицы до выбора данных
            pageSize: 30, //количество строк на странице
        };
        this.sort = this.sort.bind(this);
        this.loadData = this.loadData.bind(this);
        this.updateAfterFilter = this.updateAfterFilter.bind(this);
    }

    //сортировка данных
    //arr - массив данных
    //column - название колонки по которой сортируем
    //sortMethod - метод сортировки
    sort(arr, column, sortMethod) {
        switch (sortMethod) {
            case 'asc':
                return arr.sort((a, b) => a[column] > b[column] ? 1 : -1);
            case 'desc':
                return arr.sort((a, b) => a[column] > b[column] ? -1 : 1);
            default:
                return arr.sort((a, b) => a[column] > b[column] ? 1 : -1);
        }
    }


    //Обновление данных после фильтрации
    updateAfterFilter(arr) {
        this.setState({data: arr});
    }

    // загрузка данных
    loadData(cnt) {
        const url1 = `http://www.filltext.com/?rows=${cnt}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`;
        axios.get(url1)
            .then(res => {
                const data = res.data;
                //из данных берем названия колонок
                const columns = Object.keys(data[0]).splice(0, 5);
                //делим полученные данные на страницы, каждая страница в отдельном массиве
                //На сколько я понимаю, у сервера должно быть апи для выбора количества подгружаемых страниц
                //Т.е. пагинация должна быть на стороне сервера, а мы должны только указывать сколько данных мы хотим подгрузить в запросе
                const pagesData = [];
                for (let i = 0; i <= (data.length); i++) {
                    pagesData.push(data.splice(0, this.state.pageSize));
                }
                this.setState({data: pagesData, columns, question: false, toggleTable: true});
            });
    }

    render() {

        return (
            <div>
                {this.state.question &&
                <div>
                    <span>Выбор набора данных: </span>
                    <br/>
                    <button onClick={() => this.loadData(1000)}>Большой</button>
                    <button onClick={() => this.loadData(32)}>Малый</button>
                </div>}
                {this.state.toggleTable &&
                <Table data={this.state.data}
                       columns={this.state.columns}
                       sort={this.sort}
                       loadData={this.loadData}
                       pageSize={this.state.pageSize}
                       updateAfterFilter={this.updateAfterFilter}/>
                }
            </div>

        );
    }
}

export default App;
