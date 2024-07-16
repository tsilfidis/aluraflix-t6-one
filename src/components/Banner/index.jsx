import styled from "styled-components";
import { useFilmesContext } from "../../context/Filmes";
import CategoryTitle from "../CategoryTitle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const StyledBanner = styled.div`
    display: none;
    @media screen and (min-width: 1024px){ 
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        width: 100%;
        height: 500px;
        margin: 20px 0;
        padding: 0 40px;
        background:linear-gradient(#0012338F,#0012338F),url(${(props) => props.$cover});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border: 4px solid ${(props) => props.$bdColor};
        box-shadow: 0px 0px 10px 6px ${(props) => props.$bdColor} inset;
        cursor: pointer;
        div{
            display: flex;
            flex-direction: column;
            width: 100%;

        }
        h3{
            font-family: "Roboto", sans-serif;
            font-size: 3rem;
            margin: 20px 0;
        }
        p{
            font-family: "Roboto", sans-serif;
            font-size: 1.125rem;
            font-weight: 300;
            color: #F5F5F5;
            text-align: justify;
        }
        .div_img {
            max-width: 400px;
            box-shadow: 0px 0px 10px 6px ${(props) => props.$bdColor};
        }
        img{
            width: 100%;
            max-width: 400px;
            align-self: center;
        }
    }
`

const Banner = () =>{
    const filmes = useFilmesContext().filmes;
    const categories = useFilmesContext().categories;
    
    if (filmes.length === 0 || categories.length === 0) {
        return null; 
    }
    
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const sortearVideo = filmes.sort(() => Math.random() - 0.5)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sortearVideo.length);
        }, 5000)

        return () => clearInterval(interval)
    }, [sortearVideo])

    const bannerFilme = filmes[currentIndex]
    const bannerFilmeCategory = categories.filter((category) => category.categoria === bannerFilme.categoria)
    const categoryColor = bannerFilmeCategory[0].color
    
    return(
        <Link to={`/${bannerFilme.id}`}>
            <StyledBanner $bdColor={categoryColor} $cover={bannerFilme.cover}>
                <div >
                        <CategoryTitle color={categoryColor}>{bannerFilme.categoria}</CategoryTitle>
                        <h3>{bannerFilme.title}</h3>
                        <p>{bannerFilme.description}</p>
                </div>
                <div className="div_img">
                    <img src={bannerFilme.cover} alt={bannerFilme.title} />
                </div>
            </StyledBanner>
        </Link>
    )
}



export default Banner