import styled from "styled-components"
import deleteIcon from "./delete-icon.png"
import editIcon from "./edit-icon.png"
import { useFilmesContext } from "../../context/Filmes"
import { Link } from "react-router-dom"

const StyledGameCard = styled.div`
    max-width: 390px;
    min-width: 390px;
    margin-bottom: 40px;
    @media screen and (min-width: 1024px){
        max-width: 430px;
        min-width: 430px;
    }
`
const StyledGameImage = styled.div`
    width: 100%;
    min-height: 175px;
    background: url(${(props) => props.$bgImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border: 5px solid ${(props) => props.$color};
    border-radius: 10px 10px 0 0;
    box-shadow: 0px 0px 17px 8px ${(props) => props.$color} inset;
`
const StyledParagraph = styled.p`
    text-align: center;
    background-color: #000000;
    border-left: 5px solid ${(props) => props.$color};
    border-right: 5px solid ${(props) => props.$color};
    font-family: "Roboto",sans-serif;
    font-size: 1.25rem;
    font-weight: 400;
    padding: 10px 0;
`

const StyledCardButtonsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #000000;
    border: 5px solid ${(props) => props.$color};
    border-top: none;
    border-radius: 0px 0px 10px 10px;
`
const StyledCardButton = styled.button`

    display: flex;
    align-items: center;
    gap: 20px;
    background-color: transparent;
    border: none;
    color: #FFFFFF;
    font-family: "Roboto", sans-serif;
    font-weight: 800;
    font-size: 1rem;
    cursor: pointer;
`

const VideoCard = ({color, filme}) => {
    const filmesContext = useFilmesContext()
    return(
        <StyledGameCard >
            <Link to={`/${filme.id}`}>
                <StyledGameImage $color={color} $bgImage={filme.cover}/>
                <StyledParagraph $color={color}>{filme.title}</StyledParagraph>
            </Link>
            <StyledCardButtonsContainer $color={color}>
                <StyledCardButton onClick={() => filmesContext.deleteFilme(filme)}>
                    <img src={deleteIcon} alt="botão deletar video" />
                    DELETAR
                </StyledCardButton>
                <StyledCardButton onClick={() => filmesContext.editCard(filme)}>
                    <img src={editIcon} alt="botão editar video" />
                    EDITAR
                </StyledCardButton>
            </StyledCardButtonsContainer>
        </StyledGameCard>
    )
}

export default VideoCard