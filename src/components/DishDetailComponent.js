import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class Dishdetail extends Component {
  constructor(props) {
    super(props);
  }
  renderDish(dish) {
    if (dish != null)
      return (
        <div className="col-12 col-md-5 mx-1 my-1">
          <Card>
                    
            <CardImg top src={dish.image} alt={dish.name} />
                     
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>              
            </CardBody>
                         
          </Card>
        </div>
      );
    else return <div></div>;
  }
  renderComments(com) {
    if (com != null) {
      return (
        <div className="col-12 col-md-5 mx-1 my-1">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {com.map((cmt) => {
              return (
                <li key={cmt.id}>
                  <p>{cmt.comment}</p>
                  <p>
                    -- {cmt.author},
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(cmt.date)))}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else return <div></div>;
  }

  render() {
    return (
      <div className="row">
        {this.renderDish(this.props.dish)}
        {this.renderComments(this.props.comment)}
      </div>
    );
  }
}
export default Dishdetail;
