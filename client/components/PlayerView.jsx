import React from 'react';
import SC from 'soundcloud';

SC.initialize({
  client_id: window.SCId,
});

export default class PlayerView extends React.Component {

  componentWillReceiveProps(nextProps) {
    console.log("thisprops",this.props.currentSong, "nextprops",nextProps.currentSong, nextProps.queue);
    if (nextProps.currentSong) {
      if (this.props.currentSong) {
        if (this.props.currentSong.id !== nextProps.currentSong.id) {
          if (this.props.master) {
            this.streamTrack(nextProps.currentSong);
          }
        }
      } else {
        if (this.props.master) {
          this.streamTrack(nextProps.currentSong);
        }
      }
    }
  }

  streamTrack(track) {
    return SC.stream('/tracks/' + track.id)
    .then(player => {
      let currentPlayer;
      if (currentPlayer) {
        currentPlayer.pause();
      }
      currentPlayer = player;
      currentPlayer.play();
      currentPlayer.on('play-start', () => {
        console.log('playing');
      });
      currentPlayer.on('finish', () => {
        console.log('finished');
        this.props.changeSong(track);
      });
    })
    .catch(err => {
      console.log(err);
    });
  }


  render() {
    const title = this.props.currentSong.title;
    return (
      <div>
        <h1>PLAYER</h1>
        <div>{title}</div>
      </div>
    );
  }
}
