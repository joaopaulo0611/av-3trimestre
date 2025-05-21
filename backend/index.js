// controller do back-end

// importação 
import express from 'express';
import cors from 'cors';
import DatabaseMusicas  from './database-postgres.js';

const app = express();

// importa a classe de musica, para pegar as funções da classe
const database = new DatabaseMusicas();

// configura o cors para não brecar meu front-end
app.use(cors({
     origin: '*',
     methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

// inicia o servidor na porta 8080
app.listen(8080, () => {
     console.log('Servidor rodando na porta 8080');
});


//----------------ROTAS---DO---CRUD---------------------//

//teste 

app.get("/", (req, res) => {
     return res.send("teste");
});


// Criar (rota POST)
app.post('/musicas', async (req, res) => {
     try {
          const body = req.body;
          await database.createMusica(body);
          res.status(201).send("Musica criada com sucesso!");
     } catch (error) {
          console.error("Erro ao criar musica!", error);
          res.status(500).send("Erro ao criar musica.");
     }
});


// Mostrar as musicas (rota GET)
app.get('/musicas', async (req, res) => {
     try {
          const musicas = await database.listMusicas();
          res.status(200).json(musicas);
     } catch (error) {
          console.error("Erro ao buscar musica!", error);
          res.status(500).send("Erro ao buscar musica.");
     }
});


// Deletar musica (rota DELETE)

app.delete("/musicas/:id", async (req, res) => {
     try {
          const musicaId = req.params.id;
          console.log(musicaId);
          await database.deleteMusica(musicaId);
          res.status(200).send("Musica deletada com sucesso.");
     } catch (error) {
          if (error.message === 'Musica não encontrada') {
               res.status(404).send("Musica não encontrada.");
          } else {
               console.error("Erro ao deletar Musica!", error);
               res.status(500).send("Erro ao deletar Musica.");
          }
     }
});


// Atualizar musica (rota PUT)
app.put('/musicas/:id', async (req, res) => {
     try {
          const id_musica = req.params.id;
          const { nome_musica, album_musica, artista_musica, tempo_duracao } = req.body;

          const alteracoes = {
               nome_musica,
               album_musica,
               artista_musica,
               tempo_duracao,
          };

          console.log('Atualizando musica:', alteracoes, id_musica);
          await database.updateMusica(id_musica, alteracoes);
          res.status(200).send("Musica atualizada com sucesso.");
     } catch (error) {
          if (error.message === 'Musica não encontrada') {
               res.status(404).send("Musica não encontrada.");
          } else {
               console.error("Erro ao atualizar musica!", error);
               res.status(500).send("Erro ao atualizar musica.");
          }
     }
});