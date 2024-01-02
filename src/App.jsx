import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState("");
  const [dados, setDados] = useState();
  const [dataUser, setDataUser] = useState();
  const [dataUserRepos, setDataUserRepos] = useState();

  function handlelimpar() {
    setUsuario("");
    setDataUser(null);
    setDataUserRepos(null)


  }

  async function buscaRepo() {
    const dataRepos = await axios
      .get(`https://api.github.com/users/${usuario}/repos`)
      .then((response) => response.data);
    setDataUserRepos(dataRepos);
    console.log(dataUserRepos);
  }

  async function handleBuscar() {
    const data = await axios
      .get(`https://api.github.com/users/${usuario}`)
      .then((response) => response.data);

    const { avatar_url, name, location } = data;
    setDataUser({ avatar_url, name, location });
    console.log(dataUser);

    buscaRepo();
  }

  return (
    <>
      <div>
        <header>
          <h1>GITFIND</h1>
        </header>
        <div className="search-container">
          <input
            type="text"
            id="texto-input"
            placeholder="@user"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <button className="btn" onClick={handleBuscar}>
            Procurar
          </button>
          <button className="btn" onClick={handlelimpar}>
            Limpar
          </button>
        </div>
        
        {dataUser && (
          <div className="git-container">
            <img id="foto" src={dataUser.avatar_url} alt="" />
            <h3>
              {dataUser.name}
              <br />
              {dataUser.location}
            </h3>
          </div>
        )}
        <div className="repos-content">
        {dataUserRepos &&
          dataUserRepos.map((element) => <a className="link" href={element.url}>{element.name}</a>)}
          </div>
      </div>
    </>
  );
}

export default App;     
