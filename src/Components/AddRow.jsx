import React, {Component} from 'react';

class AddRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            toggleAddRow: false,
            idMoreDetails: null,
            valueId: null,
            valueFirstName: null,
            valueLastName: null,
            valueEmail: null,
            valuePhone: null,
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        const {data} = this.props;
        this.setState({data});
    }

    componentWillReceiveProps(nextProps) {
        const {data, valueId, valueFirstName, valueLastName, valueEmail, valuePhone} = nextProps;
        this.setState({data, valueId, valueFirstName, valueLastName, valueEmail, valuePhone});
    }

    handleAdd() {
        const toggleAddRow = !this.state.toggleAddRow;
        this.setState({toggleAddRow: toggleAddRow});
    }

    handleSubmit(e) {
        e.preventDefault();
        let out = {
            id: this.state.valueId,
            firstName: this.state.valueFirstName,
            lastName: this.state.valueLastName,
            email: this.state.valueEmail,
            phone: this.state.valuePhone
        };
        this.props.addRow(out);
        this.setState({
            toggleAddRow: false,
            valueId: null,
            valueFirstName: null,
            valueLastName: null,
            valueEmail: null,
            valuePhone: null
        })
    }

    handleChange(event, inputName) {
        switch (inputName) {
            case 'id':
                this.setState({valueId: event.target.value});
                break;
            case 'firstName':
                this.setState({valueFirstName: event.target.value});
                break;
            case 'lastName':
                this.setState({valueLastName: event.target.value});
                break;
            case 'email':
                this.setState({valueEmail: event.target.value});
                break;
            case 'phone':
                this.setState({valuePhone: event.target.value});
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className='addRow'>
                <button onClick={this.handleAdd}>Add row</button>
                {this.state.toggleAddRow &&
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Id:
                            <input type="text" value={this.state.valueId}
                                   onChange={(event) => this.handleChange(event, 'id')}/>
                        </label>
                        <label>
                            First name:
                            <input type="text" value={this.state.valueFirstName}
                                   onChange={(event) => this.handleChange(event, 'firstName')}/>
                        </label>
                        <label>
                            Last name:
                            <input type="text" value={this.state.valueLastName}
                                   onChange={(event) => this.handleChange(event, 'lastName')}/>
                        </label>
                        <label>
                            e-mail:
                            <input type="text" value={this.state.valueEmail}
                                   onChange={(event) => this.handleChange(event, 'email')}/>
                        </label>
                        <label>
                            phone:
                            <input type="text" value={this.state.valuePhone}
                                   onChange={(event) => this.handleChange(event, 'phone')}/>
                        </label>
                        <input type="submit" value="Отправить"
                               className={(this.state.valueId &&
                                   this.state.valueFirstName &&
                                   this.state.valueLastName &&
                                   this.state.valueEmail &&
                                   this.state.valuePhone) ? '' : 'send'}/>
                    </form>
                </div>
                }
            </div>
        );
    }
}

export default AddRow;