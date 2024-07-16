import styled from "styled-components"
import { useFilmesContext } from "../../context/Filmes"
import CategoryContainer from "../CategoryContainer"


const StyledFilmesContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin: 40px 0;
    padding: 0 10px;
`

const FilmesContainer = () =>{
    const categories = useFilmesContext().categories
    const filmes = useFilmesContext().filmes

    if (filmes.length === 0 || categories.length === 0) {
        return null; 
    }

    return(
        <StyledFilmesContainer>
            {categories.map((category) => (
                <CategoryContainer 
                    key={category.categoria} 
                    categories={category} 
                    filmes={filmes.filter((filme) => filme.categoria === category.categoria)}
                />)
            )}
        </StyledFilmesContainer>
    )
}

export default FilmesContainer