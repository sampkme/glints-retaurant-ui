import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import RestaurantService from "../services/restaurant.service";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
    };
  }
  componentDidMount() {
    RestaurantService.getRetaurants().then(
      response => {
        this.setState({
          restaurants: response.data
        });
      },
      error => {
        console.log("error:" + error);
      }
    );
  }
  render() {
    return (
      <div>
        <div className="text-center">
          <h2>Restaurants</h2>
        </div>
        <div className="row">
          {Object.entries(this.state.restaurants).map(([key, value]) => (
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{value.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}