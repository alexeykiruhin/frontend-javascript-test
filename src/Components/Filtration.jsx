import React, {Component} from 'react';

class Filtration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: null,
            value: '',
            notice: '',
            filter: false,
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount() {
        const {data, columns} = this.props;
        this.setState({data, columns});
    }

    componentWillReceiveProps(nextProps) {
        const {data, value, columns, filter} = nextProps;
        this.setState({data, value, columns, filter});
    }

    handleSearch() {
        if (!this.state.value){
            this.setState({
                notice: 'Введите данные для поиска'
            });
        }else{
            //массив данных разделен на подмассив страниц
            //прохожу по каждому массиву и ищу подстроку
            const out = [];
            this.state.data.map((arr) => {
                this.state.columns.map((element) => {
                    out.push(arr.filter(d => d[element] == this.state.value));
                });
            });
            //выходные данные получились в массиве
            //отфильтровываю пустые массивы
            const out1 = out.filter(e => e !== false);
            //если что то нашлось вызываю функцию апдейта данных
            if (out1.length !== 0) {
                this.props.updateAfterFilter(out1);
            }
            this.setState({value: '', notice: ''});
        }
        //const result = this.state.data.filter(data => data.id === this.state.idMoreDetails);
        this.setState({value: ''});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className='filter'>
                <label>
                    Поиск:
                    <input type="text"
                           value={this.state.value}
                           onChange={(event) => this.handleChange(event)}/>
                </label>
                <button onClick={this.handleSearch}>Поиск</button>
                {this.state.notice && <span>{this.state.notice}</span>}
            </div>
        );
    }
}

export default Filtration;