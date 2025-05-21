// importação do css
import './App.css'
// importação de bibliotecas
import { useState, useEffect, useRef } from 'react'
import axios from   "axios"

// icones
import { IoIosHourglass } from "react-icons/io";
import { FaMusic } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";


// função main
function App() {
// estados da aplicação
const [idMusica, setIdMusica] = useState('');
const [nomeMusica, setNomeMusica] = useState('');
const [albumMusica, setAlbumMusica] = useState('');
const [artistaMusica, setArtistaMusica] = useState('');
const [duracaoMusica, setDuracaoMusica] = useState('');
const [loading, setLoading] = useState(false);
const [musicas, setMusicas] = useState([]);
const [isEdit, setIsEdit] = useState(false);
const nomeInputRef = useRef(null);
  
// função para carregar as músicas 
  const fetchMusicas = async () => {
    // altera o estado do "loading" para true, para ativar o spinner
    setLoading(true);
    try {
      // realiza o get da rota da api
      const response = await axios.get(`http://localhost:8080/musicas`)
      console.log(response.data)
      setMusicas(response.data)
      console.log(`musicas: `,musicas)
    } catch (error){
      console.error(error)
    }
    finally {
      // altera o estado do "loading" para false, para desativar o spinner
      setLoading(false);
    }
  };
  // Sempre que inicializar a página, rodar essa função
  useEffect(() =>{
    fetchMusicas()
  },[])

// função do botão adicionar música para adicionar músicas
  const adicionarMusica = async () => {
    setLoading(false);
    try{
      // executa (não é essa palavra) a rota de post, passando o body dentro do objeto
      const response = await axios.post(`http://localhost:8080/musicas`, {
        nome_musica: nomeMusica,
        album_musica: albumMusica,
        artista_musica: artistaMusica,
        tempo_duracao: duracaoMusica,
      })

      // atualiza a lista de musica
      fetchMusicas()
      
      // limpa os campos 
      setNomeMusica('');
      setAlbumMusica('');
      setArtistaMusica('');
      setDuracaoMusica('');

    }catch (error){
      // autoexplicativo
      console.error('Erro ao adicionar música:', error);
    }finally{
      setLoading(false);
    }
  }

  
// função para formatar o input de duração da música para que seja
// inserindo apenas 4 caracteres numéricos e colocar : entre 2 caracteres
    const formatarTempo = (value) => {
    let valor = value.replace(/\D/g, '');
    if (valor.length > 4) {
      valor = valor.slice(0, 4);
    }
    if (valor.length > 2) {
      valor = valor.slice(0, 2) + ':' + valor.slice(2, 4);
    }
    return valor;
  };


// função para excluir a música
  const deletarMusica = async (id) => {
    try{
      // executa a rota para excluir, passando o id como parâmetro
      const response = await axios.delete(`http://localhost:8080/musicas/${id}`)
      fetchMusicas();
    }
    catch (erro){
      console.error("Erro ao deletar música:", erro)
    }
  }
  
// função para preencher os campos com os valores da musica
  const preencherMusica = (musica) => {
// muda o estado de edição para true, para que mude o botão do formulario e a função do botão para ser a de editar
    setIsEdit(true);

// preenche os campos com os dados da musica selecionada
    setIdMusica(musica.id_musica);
    setNomeMusica(musica.nome_musica);
    setAlbumMusica(musica.album_musica);
    setArtistaMusica(musica.artista_musica);
    setDuracaoMusica(musica.tempo_duracao); 

// da o foco para o input de nome, para automatizar a seleção do input de nome
    setTimeout(() => {
      nomeInputRef.current.focus();
    }, 0);
  }
  
// função para editar os atributos da música
  const editarMusica  = async () => {
    try{

      // executa a rota de atualizar a musica, passando o id como parametro e os dados a serem atualizados no body da requisição
      const response = await axios.put(`http://localhost:8080/musicas/${idMusica}`, {
        nome_musica: nomeMusica,
        album_musica: albumMusica,
        artista_musica: artistaMusica,
        tempo_duracao: duracaoMusica,
      })

      // limpa os inputs
      setIdMusica('');
      setNomeMusica('');
      setAlbumMusica('');
      setArtistaMusica('');
      setDuracaoMusica('');

      // muda o estado de edição para false, para voltar ao modo de adição de novas musicas
      setIsEdit(false);

      fetchMusicas();
    }
    catch (erro){
      console.error("Erro ao editar música: ", erro)
    }
  }

// 
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-4 w-[80%] m-auto '>
        <div className='mt-20 lilita-one-regular text-2xl'>
          <h1>CRUD Músicas</h1>
        </div>
        <div className='w-40 h-40 bg-black flex items-center justify-center rounded-[100%]  mb-14'>
          <div className='bg-lime-500 h-20 w-20 text-base p-1 rounded-full flex items-center justify-center'>
            <FaMusic color='white' className='text-4xl mr-1' />
          </div>
        </div>
        <div className='flex '>
        <input
            className='border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all  duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent'
            // deixa o input invisivel, para que o usuario não tente mudar o id
            type='hidden'
            disabled
            name='nome'
            // passa o valor da musica
            value={idMusica}
            // faz com que o valor do nome da musica seja possivel de mudar
            onChange={(e) => setIdMusica(e.target.value)}
            placeholder='Nome da Música'
          />
          <input
            className='border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all  duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent'
            type='text'
            name='nome'
            // passa o ref para poder dar o foco ao input depois 
            ref={nomeInputRef}
            value={nomeMusica}
            onChange={(e) => setNomeMusica(e.target.value)}
            placeholder='Nome da Música'
          />
          <input
            className='border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent'
            type='text'
            name='album'
            value={albumMusica}
            onChange={(e) => setAlbumMusica(e.target.value)}
            placeholder='Álbum' />
          <input
            className='border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent'
            type='text'
            name='artista'
            value={artistaMusica}
            onChange={(e) => setArtistaMusica(e.target.value)}
            placeholder='Artista' />
          <input
            className='text-center border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent '
            type="text"
            id="duracao"
            name="duracao"
            
            value={duracaoMusica}
            maxLength="5"
            placeholder="Tempo de Duração"
            onChange={(e) => setDuracaoMusica(formatarTempo(e.target.value))}
          />


        </div>
        <div className='flex items-end w-full justify-end '> 
          {/* 
          Faz uma verificação logica, para que se o isEdit for true,
           ele mostra o botão de editar, senao, ele mostra o botão de adicionar
          */}
          {isEdit?(
          <button onClick={editarMusica} className=' px-4 py-1 text-slate-800 font font-  bg-lime-500 mr-40 '>Editar Música</button>
          ):(
          <button onClick={adicionarMusica} className=' px-4 py-1 text-slate-800 font font-  bg-lime-500 mr-40 '>Adicionar Música</button>
          )}
        </div>

        <div className=' border-b border-0 border-lime-500 h-10 w-full'></div>
        <h1 className='font text-4xl'>Minhas Músicas</h1>
        {/* 
        faz a verificação para ver se o estado do loading é true,
         caso for verdadeiro ele faz esse spinner, senão ele mostra os cards das musicas 
        */}
        {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      ): (
        <>
        <div className='flex gap-4'>
          {/* faz a lista das musicas em seus devidos cards */}
        {musicas.map((musica) => (
          <div key={musica.id_musica} className='flex  border border-black/40 rounded-sm items-center justify-center p-4 relative'>
            <FaXmark onClick={() => deletarMusica(musica.id_musica)} title='exluir' className='absolute text-red-500 top-2 right-2' />
            <FaPen onClick={() => preencherMusica(musica)} title='editar' size={12} className='absolute text-yellow-500 top-2.5 right-7' />
            <div className='w-20 h-20 bg-black flex items-center justify-center rounded-[100%]  '>
              <div className='bg-lime-500 h-10 w-10 text-base p-1 rounded-full flex items-center justify-center'>
                <FaMusic color='white' className='text-xl ' />
              </div>
            </div>
            <div className='gap-3 ml-3 justify-center flex item-center'>
              <div className='flex flex-col justify-center  text-left'>
                <p className='text-left font text-gray-800'>{musica.nome_musica} </p>
                <p className='text-left text-xs font text-gray-500'>{musica.album_musica} </p>
              </div>
              <div className='flex flex-col justify-center '>
                <p className='font text-xs underline underline-offset-1 text-lime-700'>{musica.artista_musica}</p>
                <p className='font text-xs flex items-center'> <IoIosHourglass size={10} />{musica.tempo_duracao}</p>
              </div>
            </div>
          </div>
          ))}
        </div>
        </>   
      )}
        

      </div>
    </>
  )
}

export default App
