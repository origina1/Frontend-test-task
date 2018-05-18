import React from 'react'
import {
    ListGroup,
    ListGroupItem,
    Col,
    Alert
} from "react-bootstrap";
import axios from 'axios';

class Catalog extends React.Component {

    constructor() {
        super();
        this.getCategoryList();
    }

    state = {
        message: 'Категории продуктов',
        data: [],
        products: []
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

    setProducts = (products) => {
        this.setState({
            products: products
        });
    };

    createList = () => {
        let msg = 'Продукты:,';
        this.state.products.map(item => msg += item.title + ',');
        this.setMessage(msg);
    }

    getCategoryList = () => {
        axios.get('/categories', {
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
    getAllProductList = () => {
        axios.get('/products', {
            headers: {
                sid: [window.sid]
            }
        })
            .then(response => {
                this.setProducts(response.data);
                this.createList();
            })
            .catch(error => {
                this.setMessage(error)
            });
    }

    render() {
        return (<div className={'container'}>
                    {<ListGroup>
                        <ListGroupItem header="Категории продуктов:"></ListGroupItem>
                        {
                            this.state.data.map((item) => {
                                return <ListGroupItem onClick={
                                    () => {
                                        this.props.history.push({
                                            pathname: `/sub-category/${item.id}`
                                        });
                                    }
                                }> {item.title}
                                </ListGroupItem>;
                            })
                        }
                        <ListGroupItem onClick={this.getAllProductList}>Все продукты</ListGroupItem>
                    </ListGroup>
                    } {this.state.message &&
                <Col sm={12}>
                    <Alert bsStyle="success"> {
                        this.state.message.split(",").map(i => {
                            return <div> {i}
                            </div>;
                        })
                    }
                    </Alert>
                </Col>

                }
            </div>
        );
    }
}

export default Catalog;