import Banner from "../../components/Banner"
import EditModal from "../../components/EditModal"
import FilmesContainer from "../../components/FilmesContainer"
import { useFilmesContext } from "../../context/Filmes"


const HomePage = () =>{
    const selectedVideo = useFilmesContext().selectedVideo
    return(
        <>
            <Banner />
            <FilmesContainer />  
            <EditModal selectedCard={selectedVideo} /> 
        </>
    )
}

export default HomePage