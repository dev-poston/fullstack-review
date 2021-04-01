import React from 'react';


const RepoItem = (props) => (
  <tr>
    <td>{props.item.owner}</td>
    <td>{props.item.watchers}</td>
    <td><a href={props.item.url}>{props.item.fullName}</a></td>
    <td>{props.item.url}</td>
  </tr>
)

export default RepoItem;