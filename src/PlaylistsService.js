const { Pool } = require('pg');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongsById(playlistId) {
    const queryPlaylistDetail = {
      text: `SELECT p.id, p.name
      FROM playlists as p
      WHERE p.id = $1`,
      values: [playlistId],
    };

    const queryPlaylistSongs = {
      text: `SELECT s.id, s.title, s.performer
      FROM songs as s
      LEFT JOIN playlist_songs as ps
      ON ps.song_id = s.id
      WHERE ps.playlist_id = $1`,
      values: [playlistId],
    };

    const result1 = await this._pool.query(queryPlaylistDetail);
    const result2 = await this._pool.query(queryPlaylistSongs);

    let finalResult = {};
    if (result2.rows.length) {
      finalResult = {
        playlist: {
          ...result1.rows[0],
          songs: [...result2.rows],
        }
      };
    } else {
      finalResult = {
        playlist: {
          ...result1.rows[0],
          songs: [''],
        }
      };
    }

    return finalResult;
  }
}

module.exports = PlaylistsService;
