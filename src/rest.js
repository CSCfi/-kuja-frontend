import React, { Component } from 'react';

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      jeba: '?'
    }

    const numbers = [1, 2, 3, 4, 5];

  }

  componentDidMount() {
    return fetch('http://localhost:8099/api/luvat/')
      .then((response) => response.json())
      .then((responseJson) => {
        
        this.setState({
          isLoading: false,
          jeba: responseJson
          }, function() {

          console.log(responseJson.jarjestajaOid)
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    const joo = this.state.jeba;

    return (
      <div>
        <h2>It is {this.state.jeba.id}.</h2>
      </div>
    );
  }
}