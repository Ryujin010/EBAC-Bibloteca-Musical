import React, { Component } from 'react';
import './App.css';                       // # Mantenemos la importación de estilos
import Header from './components/Header'; 
import Song from './components/Song';     

class App extends Component {
  // Método del ciclo de vida
  componentDidMount() {
    console.log('La app se ha cargado correctamente');
  }

  render() {
    // Datos ficticios (al menos 3 canciones)
    const songs = [
      { title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', duration: '5:55' },
      { title: 'Imagine', artist: 'John Lennon', album: 'Imagine', duration: '3:03' },
      { title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: '4:54' }
    ];

    return (
      <div className="App">
        {/* Encabezado de la app */}
        <Header />
        
        {/* Lista de canciones */}
        <div className="song-list">
          <Song 
            title={songs[0].title} 
            artist={songs[0].artist} 
            duration={songs[0].duration} 
          />
          <Song 
            title={songs[1].title} 
            artist={songs[1].artist} 
            duration={songs[1].duration} 
          />
          <Song 
            title={songs[2].title} 
            artist={songs[2].artist} 
            duration={songs[2].duration} 
          />
        </div>
      </div>
    );
  }
}

export default App;