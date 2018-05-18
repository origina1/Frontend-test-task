import React from 'react'
import { Button, Form, FormGroup, Col, FormControl, ControlLabel, Panel, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
    state = {
        login: '',
        password: '',
        message: ''
    };

    requestLogin = () => {
        axios.post('/login', {login: this.state.login, password: this.state.password})
            .then((response) => {
                if (response.data.sid) {
                this.setMessage("SID получен: " + response.data.sid);
                    window.sid = response.data.sid;
                this.props.history.push("/catalog");
                }
            })
        .catch((e) => this.setMessage("Ошибка: пользователь не существует или введён неправильный пароль"));
    };

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

    setPassword = (password) => {
        this.setState({
            password: password
        });
    };

    render() {
        return (
            <div className={'container'}>
                <div className={'page'}>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Вход</Panel.Title>
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
                                        <FormControl type="password" placeholder="Пароль" value={this.state.password} onChange={(e) => (this.setPassword(e.target.value))} />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button onClick={this.requestLogin}>Вход</Button>&nbsp;
                                        <Link to={'/registration'}><Button>Регистрация</Button></Link>
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

export default Login;