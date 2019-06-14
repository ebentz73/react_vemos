import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { getAuth } from '@utils/firebase'; // eslint-disable-line

class App extends Component {
  render() {
    return (
      <h1>
        Hello world <Button variant="contained">Hello</Button>
      </h1>
    );
  }
}

export default App;
