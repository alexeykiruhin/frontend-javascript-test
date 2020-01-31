import React, {Component} from 'react';

class MoreDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            toggleMoreDetails: null,
            idMoreDetails: null
        };
        this.onClick = props.onClick;
    }

    componentWillMount() {
        const {data, toggleMoreDetails} = this.props;
        this.setState({data, toggleMoreDetails});
    }

    componentWillReceiveProps(nextProps) {
        const {data, toggleMoreDetails, idMoreDetails} = nextProps;
        this.setState({data, toggleMoreDetails, idMoreDetails});
    }

    render() {
        //debugger;
        const result = this.state.data.filter(data => data.id === this.state.idMoreDetails);
        const detail = result[0];
        return (
            <div className='moreDetails'>
                {this.state.toggleMoreDetails &&
                <div>
                    Выбран пользователь <b>{detail.firstName + ' ' + detail.lastName}</b><br/>
                    Описание: <br/>
                    <textarea value={detail.description}/><br/>
                    Адрес проживания: <b>{detail.address.streetAddress}</b><br/>
                    Город: <b>{detail.address.city}</b><br/>
                    Провинция/штат: <b>{detail.address.state}</b><br/>
                    Индекс: <b>{detail.address.zip}</b><br/>
                    <p className='p' onClick={this.props.handleMoreDetails}>Закрыть</p>
                </div>
                }
            </div>

        );
    }
}

export default MoreDetails;