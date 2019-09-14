import React, { Component } from 'react';
import RatingInfoScreen from '../components/ratingInfoScreen';
import QuoteOverviewScreen from '../components/quoteOverviewScreen';
import { Container, Typography } from '@material-ui/core';
import { requiredFields } from '../config';

export default class extends Component {

  state = {
    first_name: "Prairie",
    last_name: "Johnson",
    address_line_1: "123 Mulberry Lane",
    address_line_2: "3B",
    address_city: "Brooklyn",
    address_region: "NY",
    address_postal: "11211",

    quote: null,
    error: null
  }

  /**
   * @return  {boolean}  false if one or more required fields are empty strings
   */
  isFormComplete = () => {
    const emptyFields = requiredFields.filter(f => !(this.state[f].trim()));

    return !emptyFields.length;
  }


  /** syncs form fields w/ state. */
  handleInputChange = ({ target: { value, name } }) => this.setState({ [name]: value });


  /** assembles & makes request, sets response (or error) in state. */
  handleQuoteRequest = (evt) => {
    evt.preventDefault();

    const { first_name, last_name, address_line_1, address_line_2, address_city, address_region, address_postal } = this.state;

    const body = JSON.stringify({
      first_name,
      last_name,
      address: {
        line_1: address_line_1,
        line_2: address_line_2,
        city: address_city,
        region: address_region,
        postal: address_postal
      }
    });

    const fetchOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body
    };

    fetch('/api/quote', fetchOpts)
      .then(d => d.json())
      .then(d => {
        const { quote, error } = d;
        if (error) throw new Error(error);

        this.setState({ quote })
      })
      .catch(error => this.setState({ error }));
  }

  /** switches screen back to <RatingInfoScreen /> */
  backToRating = (evt) => {
    evt.preventDefault();
    this.setState({ quote: null });
  }

  render() {

    const {
      quote, error, first_name, last_name, address_line_1,
      address_line_2, address_city, address_region, address_postal
    } = this.state;

    let screen;

    if (!!this.state.error) {
      screen = (<h2>Something went wrong 😰</h2>);
    }
    else {
      screen = !!quote ? (
        <QuoteOverviewScreen backToRating={this.backToRating} quote={quote} />
      ) : (
        <RatingInfoScreen
          handleInputChange={this.handleInputChange}
          formComplete={this.isFormComplete()}
          handleQuoteRequest={this.handleQuoteRequest}
          first_name={first_name}
          last_name={last_name}
          address_line_1={address_line_1}
          address_line_2={address_line_2}
          address_city={address_city}
          address_region={address_region}
          address_postal={address_postal}
        />
      );
    }

    return (
      <Container maxWidth="sm" style={{ paddingTop: 30 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Rocket Insurance
        </Typography>
        <Typography variant="caption" component="h2" align="center">
          As interplanetary travel becomes mainstream, we're excited to offer rocket
          owners comprehensive coverage options to let you fly through space worry-free.
        </Typography>
        { screen }
      </Container>
    );
  }
}