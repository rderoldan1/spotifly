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
      image: "",
      album: ""
    };
    this.getCurrentSong = this.getCurrentSong.bind(this);
  }

  componentWillMount() {
    this.getCurrentSong();
  }

  getCurrentSong = () => {
    spotifyApi.setAccessToken(this.state.accessToken);

    spotifyApi.getMyCurrentPlayingTrack().then(data => {
      let item = data.body.item;
      this.setState({
          name: item.name, 
          duration: item.duration_ms,
          artist: item.album.artists[0].name,
          image: item.album.images[0].url,
          album: item.album.name
      })
    })
  }

  msToTime = (duration) => {
    var seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60);
  
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return minutes + ":" + seconds;
  }

  render() {
    return (
      <div className="currentSong">
        <div className="cover pull-left col-md-2">
        <img src={this.state.image} alt="Album"/>
        </div>
        <div className="info pull-left col-md-2">
          <p>{this.state.name}</p>
          <p>Artist: {this.state.artist}</p>
          <p>Album: {this.state.album}</p> 
          <p>{this.msToTime(this.state.duration)}</p>
        </div>
      </div>
    )    
  }
}

export default withCookies(Current);