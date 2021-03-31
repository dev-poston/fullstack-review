import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

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
      url: 'repos',
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
      url: '/repos',
      type: 'POST',
      data: JSON.stringify({owner: term}),
      contentType: 'application/json',
      success: (data) => {
        console.log('SUCCESSFUL POST REQUEST @ CLIENT: ', data);
        // gonna circle back after BMR to find a less hacky way of refreshing DOM after user query
        $.ajax({
          url: 'repos',
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
      },
      error: (error) => {
        console.log('AJAX POST REQUEST FAILED: ', error);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.onSearch}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));