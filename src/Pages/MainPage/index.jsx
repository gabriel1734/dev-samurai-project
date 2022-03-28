import './styles.css';
import { Nav } from '../../Components/NavBar';
import { Search } from '../../Components/Search';
import { Repositories } from '../../Components/Repositories';
import { getRepositories, createRepository, destroyRepository } from '../../Services/api';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/auth';



export const MainPage = () => {
    const { user, logout } = useContext(AuthContext);
    const [repo, setRepo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);

    const loadData = async (query = '') => {
       try{
           setLoading(true);
            const response = await getRepositories(user?.id, query);
            setRepo(response.data);
            setLoading(false);
       } catch (err) {
           console.error(err);
           setLoadingError(true);
       }
    }

    useEffect(() => {
        (async () => await loadData())();
    }, [])

    if(loadingError){
        return(
            <div className="loading">
                Erro ao carregar os dados de repositório. <Link to='/login'>Voltar</Link>
            </div>
        );
    }

    if(loading){
        return (
            <div className='loading'>
                Carregando...
            </div>
        );
    }

   

    const handleLogout = () => {
        console.log("logout");
        logout();
    }

    const handleSearch = (query) => {
        loadData(query);
    }

    const handleDeleteRepo = async (repository) => {
        await destroyRepository(user?.id,repository._id);
        await loadData();
    }
    const handleNewRepo = async (url) => {
        console.log('new repo', url);
        try {
            await createRepository(user?.id, url);
            await loadData();
        } catch (err) {
            console.error(err);
            setLoadingError(true);
        }
    }

    return (
        <div id="main">
            <Nav onLogout={handleLogout} />
            <Search 
                onSearch={handleSearch}
             />
             <Repositories 
                repositories={repo}
                onDeleteRepo={handleDeleteRepo}
                onNewRepo={handleNewRepo}
             />
           
        </div>
    );
}