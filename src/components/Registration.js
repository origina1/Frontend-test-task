import React from 'react'
import { Button, Form, FormGroup, Col, FormControl, ControlLabel, Panel, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends React.Component {
    
    state = {
        login: '',
        password1: '',
        password2: '',
        message: ''
    };
    
    requestRegistration = () => {
        axios.post('/signup', {login: this.state.login, password: this.state.password1})
            .then((response) => {
                this.props.history.push("/");
            });     
    };
    
    checkPasswords = () => {
        if (this.state.password1 === this.state.password2) {
        this.requestRegistration();
        } else this.setMessage("Ошибка: введённые пароли не совпадают");
    }
    
    setMessage = (message) => {
        this.setState({
            message: message
        });
    };

    setLogin = (login) => {
        this.setState({
            login: login
        });
    };

    setPassword1 = (password) => {
        this.setState({
            password1: password
        });
    };
    
    setPassword2 = (password) => {
        this.setState({
            password2: password
        });
    };

    render() {
        return (
            <div className={'container'}>
                <div className={'page'}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Регистрация</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Form horizontal>
                                
                                {
                                    this.state.message &&
                                    <Col sm={12}>
                                        <Alert bsStyle="warning">
                                            {this.state.message}
                                        </Alert>
                                    </Col>
                                }
            
                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Login
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="login" placeholder="Login" value={this.state.login} onChange={(e) => (this.setLogin(e.target.value))} />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Пароль
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="password" placeholder="Пароль" value={this.state.password1} onChange={(e) => (this.setPassword1(e.target.value))} />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Пароль повторно
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="password" placeholder="Пароль повторно" value={this.state.password2} onChange={(e) => (this.setPassword2(e.target.value))} />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button onClick={this.checkPasswords}>Создать пользователя</Button>&nbsp;
                                        <Link to={'/'}><Button>Вход</Button></Link>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Panel.Body>
                    </Panel>
                </div>
            </div>
        );
    }
}

export default Registration;