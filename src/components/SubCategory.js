import React from 'react'
import {
    ListGroup,
    ListGroupItem,
    Col,
    Alert
} from "react-bootstrap";
import axios from 'axios';

class SubCategory extends React.Component {

    constructor(props) {
        super(props);
        this.getProductList(props.match.params.id);
    }

    state = {
        message: 'Подкатегории продуктов',
        data: [],
        id: ''
    };

    setData = (data) => {
        this.setState({
            data: data
        });
    };

    setMessage = (message) => {
        this.setState({
            message: message
        });
    };

    getProductList = (id) => {
        axios.get('/categories/' + id, {
            headers: {
                sid: [window.sid]
            }
        })
            .then(response => {
                this.setData(response.data);
            })
            .catch(error => {
                this.setMessage(error)
            });
    }

    render() {
        return (<div className={'container'}> {
                <ListGroup>
                    <ListGroupItem header="Подкатегории продуктов:"></ListGroupItem>
                    {
                    this.state.data.map((item) => {
                        return <ListGroupItem onClick={
                            () => {
                                this.props.history.push({
                                    pathname: `/product/${item.id}`
                                })
                            }
                        }> {
                            item.title
                        }
                        </ListGroupItem>;
                    })
                } </ListGroup>
            } {this.state.message &&
            <Col sm={12}>
                <Alert bsStyle="success">
                     <div> {this.state.message}</div>
                </Alert>
            </Col>
            }
            </div>
        );
    }
}

export default SubCategory;
