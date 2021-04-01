import React from 'react';
import RepoItem from './RepoItem.jsx';


const RepoList = (props) => (
  <div>
    Viewing {props.repos.length} repos:
    <table>
      <thead>
        <tr>
          <th>Owner</th>
          <th>Watchers</th>
          <th>Repo Name</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
      {props.repos.map((item, index) => (
        <RepoItem
        key={index}
        item={item}
        />
      ))}
      </tbody>
    </table>
  </div>
)

export default RepoList;