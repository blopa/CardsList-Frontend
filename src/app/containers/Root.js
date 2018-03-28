import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Header} from './Header';
import {Home} from './routes/Home';
import '../styles/Root.css';
import PropTypes from 'prop-types';
import {CreateList} from './routes/CreateList';
import {DisplayList} from './routes/DisplayList';

class Root extends React.Component {
  componentDidMount() {
    // TODO
  }
  constructor(props) {
    super(props);
    this.updateList = this.updateList.bind(this);
    this.loadList = this.loadList.bind(this);
    this.addNewList = this.addNewList.bind(this);
    this.removeList = this.removeList.bind(this);
    this.state = {
      storeData: {},
      requestFailed: false,
      loadedData: false
    };
  }
  updateList(list) {
    this.props.updateList(list);
  }
  loadList(list) {
    this.props.loadList(list);
  }
  addNewList(list) {
    this.props.addNewList(list);
  }
  removeList(list) {
    this.props.removeList(list);
  }
  renderHome(props) {
    return (<Home
      lists={this.props.storeData.lists} {...props}
      addNewList={this.addNewList}
      removeList={this.removeList}
      loadedData={this.state.loadedData}
    />);
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" render={props => this.renderHome(props)}/>
          <Route exact path="/create" component={CreateList}/>
          <Route exact path="/list/:hash" component={DisplayList}/>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({storeData: state});
const mapDispatchToProps = dispatch => (
  {
    addNewList: list => (
      dispatch(
        {
          type: 'ADD',
          payload: {
            list: list
          }
        }
      )
    ),
    updateList: list => (
      dispatch(
        {
          type: 'UPDATE',
          payload: {
            list: list
          }
        }
      )
    ),
    loadList: lists => (
      dispatch(
        {
          type: 'LOAD',
          payload: {
            lists: lists
          }
        }
      )
    ),
    removeList: list => (
      dispatch(
        {
          type: 'REMOVE',
          payload: {
            list: list
          }
        }
      )
    )
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Root);

Root.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  storeData: PropTypes.object,
  removeList: PropTypes.func,
  addNewList: PropTypes.func,
  updateList: PropTypes.func,
  loadList: PropTypes.func
};
