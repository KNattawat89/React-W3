import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import DishDetail from "./DishDetailComponent";

function RenderMenuItem({ dish, onClick }) {
  return (
    <Card onClick={() => onClick(dish.id)}>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

// function renderDish(dish) {
//   if (dish != null)
//     return (
//       <Card>
//         <CardImg top src={dish.image} alt={dish.name} />
//         <CardBody>
//           <CardTitle>{dish.name}</CardTitle>
//           <CardText>{dish.description}</CardText>
//         </CardBody>
//       </Card>
//     );
//   else return <div></div>;
// }

const Menu = (props) => {
  // const [selectedDish, setSelectedDish] = useState(null);
  // const onDishSelect = (dishId) => {
  //   setSelectedDish(dishId);
  // };
  const menu = props.dishes.map((dish) => {
    return (
      <div className="col-12 col-md-5 m-1" key={dish.id}>
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{menu}</div>
      {/* <div className="row">
        <div className="col-12 col-md-5 m-1"> */}
      {/* {renderDish(props.dishes[props.selectedDish])} */}
      <DishDetail dish={props.selectedDish} comment={props.comments} />
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default Menu;
