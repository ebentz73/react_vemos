import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Header from '@containers/layout/Header';
import Navbar from '@containers/layout/Navbar';
import Notifier from '@containers/layout/Notifier';
import Login from '@pages/Login';
import Home from '@pages/Home';
import Transaction from '@pages/Transaction';
import AppActions, { AppSelectors } from '@redux/AppRedux';
import { AuthSelectors } from '@redux/AuthRedux';

const MainContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    startup: PropTypes.func,
    isLoggedIn: PropTypes.bool
  };

  componentDidMount() {
    const { startup } = this.props;

    startup();
  }

  renderAnonRoutes() {
    return (
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route render={() => <Redirect to="/auth/login" />} />
      </Switch>
    );
  }

  renderUserRoutes() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/transaction" component={Transaction} />
          <Route render={() => <Redirect to="/home" />} />
        </Switch>
      </React.Fragment>
    );
  }

  renderContent() {
    const { isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return this.renderAnonRoutes();
    }

    return this.renderUserRoutes();
  }

  renderLoading() {
    return (
      <Box
        width={1}
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  renderLoadingBar() {
    const { loading } = this.props;

    if (!loading) {
      return null;
    }

    return (
      <Box width={1}>
        <LinearProgress color="secondary" />
      </Box>
    );
  }

  render() {
    const { loaded, isLoggedIn } = this.props;

    return (
      <MainContainer>
        <Header isLoggedIn={isLoggedIn} />
        {this.renderLoadingBar()}
        {loaded ? this.renderContent() : this.renderLoading()}
        <Notifier />
      </MainContainer>
    );
  }
}

const mapStatesToProps = state => ({
  loading: AppSelectors.selectLoading(state),
  loaded: AppSelectors.selectLoaded(state),
  isLoggedIn: AuthSelectors.selectLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(AppActions.startup())
});

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(App);
