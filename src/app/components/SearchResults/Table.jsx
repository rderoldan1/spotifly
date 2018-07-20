import React, {Component} from 'react';

class Table extends Component {
  render(){
    return (
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Artist</th>
            <th>Album</th>
          </tr>
          {this.props.tracks.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.artists[0].name}</td>
                <td>{item.album.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Table;