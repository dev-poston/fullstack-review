import React from 'react';
import RepoItem from './RepoItem.jsx';


const RepoList = (props) => (
  <div>
    Viewing {props.repos.length} repos:
    <table>
      <thead>
        <tr>
          <th>Owner</th>
          <th>Stars</th>
          <th>Repo Name</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
      {
        Array.isArray(props.repos) ?
        props.repos.map((item, index) => (
          <RepoItem
          key={index}
          item={item}
          />
        )) :
        <tr></tr>
      }
      </tbody>
    </table>
  </div>
)

export default RepoList;