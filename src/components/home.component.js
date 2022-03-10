import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import RestaurantService from "../services/restaurant.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import moment from 'moment';
import SimpleModal from "./simple-modal.component";

export default class Home extends Component {
  weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      name: "",
      dateTime: ""
    };
    this.onChangeDateTime = this.onChangeDateTime.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeDateTime(e) {
    this.setState({
      dateTime: e._d
    });
  }

  handleFilter(e) {
    e.preventDefault();
    this.getRestaurantData();
  }

  componentDidMount() {
    this.getRestaurantData();
  }

  getRestaurantData() {
    this.setState({
      loading: true
    });
    let day, time = "";
    let date = new Date(this.state.dateTime);
    if (this.state.dateTime) {
      day = this.weekDays[date.getDay()];
      time = date.toLocaleTimeString('it-IT');
    }
    const params = {
      name: this.state.name,
      date_time: this.state.dateTime,
      day: day,
      time: time
    };
    try {
      RestaurantService.getRetaurants(params).then(
        response => {
          this.setState({
            restaurants: response.data
          });
        }
      );
    }
    catch (error) {
      console.log(error);
    }
    finally {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    return (
      <div>
        <div className="text-center">
          <h2>Restaurants</h2>
        </div>
        <div>
          <Form onSubmit={this.handleFilter}
          >
            <div className="row">
              <div className="col-5 form-group">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="col-5 form-group">
                <label htmlFor="dateTime">Date Time</label>
                <Datetime
                  name="dateTime"
                  value={this.state.dateTime}
                  onChange={this.onChangeDateTime}
                />
              </div>
              <div className="col-2">
                <div className="align-middle">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={this.state.loading}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div className="row">
          {Object.entries(this.state.restaurants).map(([key, value]) => (
            <Card style={{ width: '22rem' }} key={value.id}>
              <Card.Body>
                <Card.Title>{value.name}</Card.Title>
                <Card.Text>
                  {Object.entries(value.restaurant_days).map(([key, dayValue]) => (
                    <div>
                      <b>{dayValue.day}</b> - {moment(dayValue.time_from, [moment.ISO_8601, 'HH:mm']).format('h:mm a')} to {moment(dayValue.time_to, [moment.ISO_8601, 'HH:mm']).format('h:mm a')}
                    </div>
                  ))}

                </Card.Text>
                <SimpleModal restaurant={value}/>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}