import React from 'react';

const RepoItem = (props) => (
  <tr>
    <td>{props.item.owner}</td>
    <td>{props.item.watchers}</td>
    <td href={props.item.url}>{props.item.fullName}</td>
    <td>{props.item.url}</td>
  </tr>
)

export default RepoItem;