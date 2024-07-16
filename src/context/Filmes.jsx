import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const filmesApi = 'https://my-json-server.typicode.com/tsilfidis/aluraflix-api/filmes'
const categoriasApi = 'https://my-json-server.typicode.com/tsilfidis/aluraflix-api/categorias'
export const FilmesContext = createContext();
FilmesContext.displayName = 'Filmes'

export default function FilmesProvider({children}) {

    const [filmes, setFilmes] = useState([])
    
    useEffect(() =>{
        axios.get(filmesApi)
            .then(response => {
                setFilmes(response.data)
            })
    },[])
    
    const [categories, setCategories] = useState([])
    
    useEffect(() =>{
        axios.get(categoriasApi)
            .then(response =>{
                setCategories(response.data)
            })
    },[])
    
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    
    
    return (
        <FilmesContext.Provider value={{filmes, setFilmes, categories, setCategories, selectedVideo, setSelectedVideo,isCategoryModalOpen, setIsCategoryModalOpen}}>
            {children}
        </FilmesContext.Provider>
    )
}

export function useFilmesContext(){
    const{filmes, setFilmes} = useContext(FilmesContext)
    const{categories, setCategories} = useContext(FilmesContext)
    const{selectedVideo, setSelectedVideo} = useContext(FilmesContext)
    const{isCategoryModalOpen, setIsCategoryModalOpen} = useContext(FilmesContext)

    function editCard(filme){
        filme ? window.scrollTo(0,350): ""
        setSelectedVideo(filme)
    }

    function categoryModal(boolean){
        setIsCategoryModalOpen(boolean)
    }

    function addVideo(filme){
        axios
            .post(filmesApi,{
                "title":filme.title,
                "cover":filme.cover,
                "link":filme.link,
                "categoria":filme.categoria,
                "description":filme.description
            })
            .then((response)=>{
                setFilmes([...filmes, response.data])
                alert("Jogo Adicionado com Sucesso!")
            })
            .catch(() => alert("Houve um erro ao adicionar o jogo, tente novamente!"))
    }

    function updateGame(filme){
        axios
            .put(`${filmesApi}/${filme.id}`,{
                "title":filme.title,
                "cover":filme.cover,
                "link":filme.link,
                "categoria":filme.categoria,
                "description":filme.description
            })
            .then(()=>{
                setFilmes(filmes.map(thisfilme => thisfilme.id === filme.id ? filme : thisfilme))
                alert("Jogo editado com sucesso!")
            })
            .catch(() => alert("Houve um erro ao editar o jogo. Tente novamente"))
    }

    function deleteFilme(filme){        
        axios
            .delete(`${filmesApi}/${filme.id}`)
            .then(() =>{
                setFilmes(filmes.filter((thisGame) => thisGame.id !== filme.id))
            })
            .catch(() => alert("Houve um problema ao deletar o vídeo. Tente novamente"))
    }

    function addCategory(category){
        axios
            .post(categoriasApi,{
                "categoria":category.categoria,
                "color":category.color,
            })
            .then((response)=>{
                setCategories([...categories, response.data])
                alert("Categoria adicionada com Sucesso!")
            })
            .catch(() => alert("Houve um erro ao adicionar a categoria, tente novamente!"))
    }

    return{
        filmes,
        categories,
        selectedVideo,
        isCategoryModalOpen,
        categoryModal,
        editCard,
        addVideo,
        updateGame,
        deleteFilme,
        addCategory
    }
}

