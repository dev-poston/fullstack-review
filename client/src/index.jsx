import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const server = 'https://connect-oregon.heroku.com/api/v3/repos';

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
      url: server + '/repos',
      type: 'GET',
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
      url: server + '/repos',
      type: 'POST',
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