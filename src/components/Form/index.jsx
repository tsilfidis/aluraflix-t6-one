import styled from "styled-components"
import FormInput from "./FormInput"
import FormSelect from "./FormSelect"
import FormTextArea from "./FormTextArea"
import { useFilmesContext } from "../../context/Filmes"
import { useEffect, useState } from "react"

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    max-width:575px;
    margin: 0 auto;
`

const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    max-width: 525px;
    @media screen and (min-width: 1024px){
        flex-direction: row;
        justify-content: space-between;
    }
    `

const StyledFormButton = styled.button`
    width: 180px;
    height: 54px;
    background-color: transparent;
    font-size: 1.25rem;
    font-weight: 900;
    color:#FFFFFF;
    border: 3px solid #2271D1;
    border-radius: 15px;
    &.white{
        border: 3px solid #FFFFFF;
    }
    &:hover{
        background-color:#000000E5;
        border: 2px solid #2271D1;
        box-shadow: 0px 0px 12px 4px #2271D1 inset;
        color: #2271D1;
    }
    `

const Form = ({method, filme}) =>{
    const filmeContext = useFilmesContext()
    const [filmeTitle, setFilmeTitle] = useState('')
    const [filmeCategoria, setFilmegCategoria] = useState('')
    const [filmeCover, setFilmeCover] = useState('')
    const [filmeVideo, setFilmeVideo] = useState('')
    const [filmeDescription, setFilmeDescription] = useState('')

    useEffect(() =>{
        if(filme){
            setFilmeTitle(filme.title)
            setFilmegCategoria(filme.categoria)
            setFilmeCover(filme.cover)
            setFilmeVideo(filme.link)
            setFilmeDescription(filme.description)
        }
    },([]))

    function formSubmit(event){
        event.preventDefault()
        filmeContext.editCard(null)
        const newVideo = {
            "title":filmeTitle,
            "cover":filmeCover,
            "link":filmeVideo,
            "categoria":filmeCategoria,
            "description":filmeDescription
        }
        
        if (filme){
            newVideo.id = filme.id
            filmeContext.updateGame(newVideo)
        }else{
            filmeContext.addVideo(newVideo)

        }
        clearFields()
    }

    function clearFields(){
        setFilmeTitle("")
        setFilmegCategoria("")
        setFilmeCover("")
        setFilmeVideo("")
        setFilmeDescription("")
    }

    return(
        <StyledForm onSubmit={(event)=>formSubmit(event)}>
            <FormInput 
                className=""
                color={method ? '#6BD1FF' : '#696969'}
                label="Título"
                id="title"
                type="text"
                value={filmeTitle ? filmeTitle : ""}
                placeholder="Insira o título do vídeo"
                handleChange={(value) => setFilmeTitle(value)}
            />
            <FormSelect 
                className=""
                color={method ? '#6BD1FF' : '#696969'}
                label="Categoria"
                id="categoria"
                categories={filmeContext.categories}
                value={filmeCategoria ? filmeCategoria : ""}
                handleChange={(value) => setFilmegCategoria(value)}
            />
            <FormInput
                color={method ? '#6BD1FF' : '#696969'}
                label="Capa"
                id="cover"
                type="url"
                value={filmeCover ? filmeCover : ""}
                placeholder="Insira o link da imagem da capa do vídeo"
                handleChange={(value) => setFilmeCover(value)}
            />
            <FormInput 
                color={method ? '#6BD1FF' : '#696969'}
                label="Vídeo"
                id="video"
                type="url"
                value={filmeVideo ? filmeVideo : ""}
                placeholder="Insira o link do vídeo"
                handleChange={(value) => setFilmeVideo(value)}
            />
            <FormTextArea  
                color={method ? '#6BD1FF' : '#696969'}
                label="Descrição"
                id="description"
                value={filmeDescription ? filmeDescription : ""}
                placeholder="Insira a descrição do vídeo"
                handleChange={(value) => setFilmeDescription(value)}
            />
            <StyledButtonContainer>
                <StyledFormButton type="submit">
                    Gravar
                </StyledFormButton>
                <StyledFormButton className="white" type="reset" onClick={()=>clearFields()}>
                    Limpar
                </StyledFormButton>
            </StyledButtonContainer>
        </StyledForm>
    )
}

export default Form