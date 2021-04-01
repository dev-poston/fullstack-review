import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const serverURL = 'https://afternoon-atoll-48900.herokuapp.com/repos';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: serverURL,
      type: 'GET',
      // dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        console.log('COMPONENTDIDMOUNT AJAX GET REQUEST: ', data);
        this.setState({
          repos: data
        });
      },
      error: (error) => {
        console.log('COMPONENTDIDMOUNT FAILED: ', error);
      }
    });
  }

  onSearch (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: serverURL,
      type: 'POST',
      // dataType: 'json',
      data: JSON.stringify({owner: term}),
      contentType: 'application/json',
      success: (data) => {
        console.log('SUCCESSFUL POST REQUEST @ CLIENT: ', data);
        this.setState({
          repos: data
        });
      },
      error: (error) => {
        console.log('AJAX POST REQUEST FAILED: ', error);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher: HR Edition</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.onSearch}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));