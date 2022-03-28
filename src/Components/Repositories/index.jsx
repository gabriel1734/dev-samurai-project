import { useState } from "react";

export const Repositories = ({ repositories, onDeleteRepo, onNewRepo }) => {
    const [newRepo, setNewRepo ] = useState('');

    return (
        <div className="repositories">
            <h2 className='title'>Repositórios</h2>
            <ul className='list'>

                {
                    repositories.map((repository) =>(
                        <a href={repository.url} target="_blank"> 
                            <li className='item' key={repository._id}>
                                <div className="info">
                                    <div className="owner">
                                        {repository.name.substring(0, repository.name.indexOf('/'))}
                                    </div>
                                    <div className="name">
                                        {repository.name.substring(repository.name.indexOf('/') + 1)}
                                        </div>
                                    <button className="btn" onClick={() => onDeleteRepo(repository)}>Apagar</button>
                                </div>
                            </li>
                        </a>
                    ))
                }
                
               
            </ul>
            <div className="new">
                <label htmlFor="new-repo">Novo Repo:</label>
                <input 
                    type="url" 
                    name="new-repo" 
                    id="new-repo"
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)} 
                />
                <button onClick={() => onNewRepo(newRepo)}>Adicionar</button>
            </div>
        </div>
    );
}