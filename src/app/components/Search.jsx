import React, {Component} from 'react'; 
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Spotify from 'spotify-web-api-node';

import Table from './SearchResults/Table.jsx'
import Empty from './SearchResults/Empty.jsx'

const spotifyApi = new Spotify();

class Search extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired 
  };

  constructor(props) {
    super(props);
    const { cookies } = props;  

    this.state = {
      accessToken: cookies.get("access_token"),
      tracks: [], 
      term: ""
    };
  }

  handleChange = (event) => {    
    this.setState({term: event.target.value}, () => {
      if(this.state.term.length !== 0){
        spotifyApi.setAccessToken(this.state.accessToken);
        spotifyApi.searchTracks(this.state.term, {limit: 10})
          .then((data) => {
            this.setState({tracks: data.body.tracks.items});
          });
      } else {
        this.setState({tracks: []});
      }
    });
  }

  render() {
    return (
      <div>
        <div className="searchInput">
          <label>Spotify Search:</label>
          <input type="text" value={this.state.term} onChange={this.handleChange} />
        </div>
        {this.state.tracks.length === 0 ? (<Empty />) : (<Table tracks={this.state.tracks}/>) }
        
      </div>
    )
  }
}

export default withCookies(Search);