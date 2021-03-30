import React from 'react';
import RepoItem from './RepoItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
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