import React, { Component } from 'react';

class Song extends Component {
  render() {
    const { title, artist, duration } = this.props;
    return (
      <div>
        <p><strong>{title}</strong> - {artist} ({duration})</p>
      </div>
    );
  }
}

export default Song;