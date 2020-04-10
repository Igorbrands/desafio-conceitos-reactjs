import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]); //Estado para salvar os repositorios

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories',
    {
      title: `Novo Repositório`,
      url: 'https://github.com/igorbrands',
      techs: ['ReactJS', 'React Native']
    });

    const repository = response.data
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(
        repository => repository.id !== id));
  } 
//Lista os repositorios vindos da array de estado
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}> 
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
