import { sql } from './db.js'

// código em sql da tabela Musicas
sql`
    CREATE TABLE Musicas(
        id_musica SERIAL PRIMARY KEY NOT NULL,
        nome_musica VARCHAR(255) NOT NULL,
        album_musica VARCHAR(255) NOT NULL,
        artista_musica VARCHAR(255) NOT NULL,
        tempo_duracao VARCHAR(5) NOT NULL
    );
`
.then(() =>{
    console.log("tabela criada");
})