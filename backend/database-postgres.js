import { sql } from './db.js';


// classe que atua como service do backend onde ficam as funções para os controladores
export default class DatabaseMusicas { 

   // função de listar musicas
   async listMusicas() {
      return await sql`SELECT * FROM Musicas`;
  }

  // função de criar musicas, passando musica como um parametro
  async createMusica(musica) {

   // cria as variaveis para utilizar em um script sql 
    const nome_musica = musica.nome_musica;
    const album_musica = musica.album_musica;
    const artista_musica = musica.artista_musica;
    const tempo_duracao = musica.tempo_duracao;

    // script sql para inserir a musica na tabela Musica
    await sql`INSERT INTO Musicas( nome_musica, album_musica, artista_musica, tempo_duracao) 
              values ( ${nome_musica}, ${album_musica}, ${artista_musica}, ${tempo_duracao})`;
  }

  // função de atualizar musica, passando o id e musica como parametro
  async updateMusica(id, musica) {
   
    const nome_musica = musica.nome_musica;
    const album_musica = musica.album_musica;
    const artista_musica = musica.artista_musica;
    const tempo_duracao = musica.tempo_duracao;

// script sql para atualizar a musica na tabela Musica onde o id é o mesmo id passado como parametro
     await sql`UPDATE Musicas SET
      nome_musica = ${nome_musica},
      album_musica = ${album_musica},
      artista_musica = ${artista_musica},
      tempo_duracao = ${tempo_duracao}
      where id_musica = ${id} 
     `;
  }


  // funçãp de deletar a musica, passando o id como parametro
  async deleteMusica(id) {
   // script sql para deletar a musica onde o id é igual ao id passado como parametro
     await sql`DELETE FROM Musicas WHERE id_musica = ${id}`
  }

}