import React, { Component } from 'react';
import { FormFeedback,Col,Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, ModalBody ,Modal,ModalHeader,Form, FormGroup, Label ,Input} from 'reactstrap';
import { Link } from 'react-router-dom';

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            isModalOpen: false,
            touched:{
                name:false
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    
    validate(name){
        const errors = {
            name:''
        }
        if(this.state.touched.name && name.length < 3){
            errors.name = ' Name should be >= 3 characters';
        }else if(this.state.touched.name && name.length > 15){
            errors.name = ' Name should be <=15 characters';
        }
        return errors;
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    render() {
        const errors = this.validate(this.state.name);
      return (
        <div>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup row>
                        <Col md={12}>
                            <Label>Rating</Label>
                            <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </Input>  
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={12}>
                            <Label>Your Name</Label>
                        <Input 
                            type='text' 
                            id="name" 
                            name="name" 
                            placeholder='Your Name'
                            value={this.state.name}
                            valid={errors.name === ''}
                            invalid={errors.name !== ''}
                            onBlur={this.handleBlur('name')}
                            onChange={this.handleInputChange}
                        > 
                        </Input>
                        <FormFeedback>{errors.name}</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col md={12}>
                            <Label>Comment</Label>
                        <Input type='textarea' rows="6">

                        </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
        </div>
      )
    }
}
class DishDetail extends Component {
    renderDish() {
        const dish = this.props.dishes[this.props.selectedDish];
        if (dish != null)
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
    }

    renderComments() {
        const dish = this.props.dishes[this.props.selectedDish];
        const comments = this.props.comments.filter( comment => comment.dishId === dish.id );
        if(dish != null)
            return (
                <div>
                   <Card>
                    <CardTitle>
                        <h4>Comments</h4>
                    </CardTitle>
                    <CardBody className="ps-0 m-0">
                        <ul className="list-group list-group-flush list-unstyled">
                            {comments.map((comment) => {
                                return (
                                    <li key={comment.id} className="list-group-item list-untiled ps-0 m-0">
                                        {comment.comment}
                                        <br />
                                        {"--" + comment.author + ", "}
                                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </li>
                                );
                                }
                            )}
                        </ul>
                    </CardBody>
                </Card> 
                <CommentForm/>
                </div>
                
            );
    }

    render() {
        const dish = this.props.dishes[this.props.selectedDish];
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish()}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments()}
                    </div>
                </div>
            </div>
        );

    }
}

export default DishDetail;