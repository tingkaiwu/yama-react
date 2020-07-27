import React from 'react';
import { Main } from './Main';
// import { TOKEN_KEY } from '../constants';

import './assets/css/App.css';

class App extends React.Component {
  state = {
    isLoggedIn: Boolean(localStorage.getItem('TOKEN_KEY')),
  }

  handleLoginSucceed = (token) => {
    console.log('TOKEN', token)
    localStorage.setItem('TOKEN_KEY', token)
    this.setState({ isLoggedIn: true });
  }

  handleLogout = () => {
    localStorage.removeItem('TOKEN_KEY');
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <div className="App">
        <Main handleLoginSucceed={this.handleLoginSucceed} isLoggedIn={this.state.isLoggedIn} />
      </div>
    );
  }
}

export default App;
