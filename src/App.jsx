import { useState } from 'react';

import Perfil from './components/Perfil';
import Formulario from './components/Formulario';
import ReposList from './components/ReposList';

function App() {
  const [formularioEstaVisivel, setFormularioEstaVisivel] = useState(true)
  const [nomeUsuario, setNomeUsuario] = useState('')
  
  return (
    <>
      <div className="search">
        <label>Pesquise o perfil de sua escolha:</label>
        <input className='searchBar' type="text" placeholder='Nome do perfil' onBlur={(e) => setNomeUsuario(e.target.value)}/>
        <button>Pesquisar</button>
      </div>

      {nomeUsuario.length > 4 && (
        <>
          <Perfil nomeUsuario={nomeUsuario}/>
          <ReposList nomeUsuario={nomeUsuario}/>
        </>
      )}
    </>
  )
}

export default App
