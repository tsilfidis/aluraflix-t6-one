import { Outlet } from "react-router-dom"
import GlobalStyle from "../../components/GlobalStyle/GlobalStyles"
import Header from "../../components/Header"
import FilmesProvider from "../../context/Filmes"
import Footer from "../../components/Footer"

const BasePage = () =>{
    return(
        <>
            <GlobalStyle />
            <Header />
                <FilmesProvider>
                    <Outlet />
                </FilmesProvider>
            <Footer />
        </>
    )
}

export default BasePage