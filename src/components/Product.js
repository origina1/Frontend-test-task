import React from 'react'
import {
    ListGroup,
    ListGroupItem,
    Col,
    Alert
} from "react-bootstrap";
import axios from 'axios';

class Product extends React.Component {

    constructor(props) {
        super(props);
        this.getProductList(props.match.params.id);
    }

    state = {
        message: 'Продукты',
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

    createList = () => {
        let msg = '';
        this.state.data.map(item => msg += item.title + ',');
        this.setMessage(msg);
    }

    getProductList = (id) => {
        axios.get('/products/' + id, {
            headers: {
                sid: [window.sid]
            }
        })
            .then(response => {
                this.setData(response.data);
                this.createList();
            })
            .catch(error => {
                this.setMessage(error)
            });
    }

    render() {
        return (<div className={'container'}> {
                <ListGroup>
                    <ListGroupItem onClick={() => {
                        this.props.history.push("/catalog")
                    }}>
                        Категории
                    </ListGroupItem>
                </ListGroup>
            } {this.state.message &&
            <Col sm={12}>
                <Alert bsStyle="success"> {

                    this.state.message.split(",").map(i => {
                        return <div> {
                            i
                        }
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

export default Product;
