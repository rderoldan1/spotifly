import React, {Component} from 'react';

class Table extends Component {
  render(){
    return (
      <div className="searchResults">
        <table>
          <thead>
            <tr>
                <th>Name</th>
                <th>Artist</th>
                <th>Album</th>
              </tr>
          </thead>
          <tbody>
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
      </div> 
    )
  }
}

export default Table;