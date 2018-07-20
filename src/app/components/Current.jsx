import React, {Component} from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Spotify from 'spotify-web-api-node';
const spotifyApi = new Spotify();

class Current extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired 
  };

  constructor(props) {
    super(props);
    const { cookies } = props;  

    this.state = {
      accessToken: cookies.get("access_token"),
      name: "", 
      duration: 1,
      artist: "",
      image: ""
    };
    this.getCurrentSong = this.getCurrentSong.bind(this);
  }

  componentWillMount() {
    this.getCurrentSong();
  }

  getCurrentSong = () => {
    console.log(this.state.accessToken)
    spotifyApi.setAccessToken(this.state.accessToken);

    spotifyApi.getMyCurrentPlayingTrack().then(data => {
      let item = data.body.item;
      this.setState({
          name: item.name, 
          duration: item.duration_ms,
          artist: item.album.artists[0].name,
          image: item.album.images[0].url
      })
    })
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
          <tr>
            <td>
              <img src={this.state.image} alt="Album"/>
            </td>
            <td>
              <p>{this.state.album}</p> 
              <p>{this.state.name}</p>
              <p>{this.state.duration / 1000 / 60}</p>
              {this.state.duration}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )    
  }
}

export default withCookies(Current);