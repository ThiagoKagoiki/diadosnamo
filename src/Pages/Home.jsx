    import React, { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import './Home.css'

    export const Home = () => {

        const API_URL_FRASES = 'https://682e655d746f8ca4a47ce3de.mockapi.io/api/v1/frases'
        // const API_URL_FOTOS = 'https://682e655d746f8ca4a47ce3de.mockapi.io/api/v1/fotos'
        const [frases, setFrases] = useState([])
        // const [fotos, setFotos] = useState([])
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(true);

        const fotos = [
            '/images/1.jpeg',
            '/images/2.jpeg',
            '/images/3.jpeg',
            '/images/4.jpeg',
            '/images/5.jpeg',
            '/images/6.jpeg',
            '/images/7.jpeg',
            '/images/8.jpeg',
            '/images/9.jpeg',
            '/images/10.jpeg',
            '/images/11.jpeg',
            '/images/12.jpeg',
            '/images/13.jpeg',
            '/images/14.jpeg',
            '/images/15.jpeg',
            '/images/16.jpeg',
            '/images/17.jpeg',
            '/images/18.jpeg',
            '/images/19.jpeg',
            '/images/20.jpeg',
            '/images/21.jpeg',
            '/images/22.jpeg',
            '/images/23.jpeg',
            '/images/24.jpeg',
            '/images/25.jpeg',
            '/images/26.jpeg',
            '/images/27.jpeg',
            '/images/28.jpeg',
            '/images/29.jpeg',
            '/images/30.jpeg',
            '/images/31.jpeg',
            '/images/32.jpeg',
            '/images/33.jpeg',
            '/images/34.jpeg',
            '/images/35.jpeg',
            '/images/36.jpeg',
            '/images/37.jpeg',
            '/images/38.jpeg',
            '/images/39.jpeg',
            '/images/40.jpeg',
            '/images/41.jpeg',
            '/images/42.jpeg',
            '/images/43.jpeg',
            '/images/44.jpeg',
            '/images/45.jpeg',
            '/images/46.jpeg',
            '/images/47.jpeg',
            '/images/48.jpeg',
            '/images/49.jpeg',
            '/images/50.jpeg',
            '/images/51.jpeg',
            '/images/52.jpeg',
            '/images/53.jpeg',
            '/images/54.jpeg',
            '/images/55.jpeg',
            '/images/56.jpeg',
            '/images/57.jpeg',
            '/images/58.jpeg',
            '/images/59.jpeg',
            '/images/60.jpeg',
            '/images/61.jpeg',
            '/images/62.jpeg',
            '/images/63.jpeg',
            '/images/64.jpeg',
            '/images/65.jpeg',
            '/images/66.jpeg',
            '/images/67.jpeg',
            '/images/68.jpeg',
            '/images/69.jpeg',
            '/images/70.jpeg',
            '/images/71.jpeg',
            '/images/72.jpeg',
            '/images/73.jpeg',
            '/images/74.jpeg',
            '/images/75.jpeg',
            '/images/76.jpeg',
            '/images/77.jpeg',
            '/images/78.jpeg',
            '/images/79.jpeg',
            '/images/80.jpeg',
            '/images/81.jpeg',
            '/images/82.jpeg',
            '/images/83.jpeg',
            '/images/84.jpeg'
          ];

        const navigate = useNavigate()
        const handlePost = () => {
            navigate('/post')
        }

        const handleRefresh = () => {
            navigate('/')
        }

        useEffect(() => {
            const fetchData = async () => {
                try{
                    const [responseFrases] = await Promise.all([
                        fetch(API_URL_FRASES)
                    ])

                    if (!responseFrases.ok) {
                        throw new Error('Erro na requisição das frases: ' + responseFrases.status);
                    }
                    

                    const dataFrases = await responseFrases.json()
                    // const dataFotos = await responseFotos.json()

                    setFrases(dataFrases)
                    // setFotos(dataFotos)
                }catch(error){
                    console.error('Erro ao buscar requisição: ', error)
                    setError(error.message)
                }finally{
                    setLoading(false)
                }
            }

            fetchData()
        }, [])


        const fraseAleatoria = frases.length > 0 ? frases[Math.floor(Math.random() * frases.length)] : null;
        const fotoAleatoria = fotos.length > 0 ? fotos[Math.floor(Math.random() * fotos.length)] : null;

        if (loading) {
            return <p>Carregando...</p>;
        }

        if (error) {
            return <p>Erro: {error}</p>;
        }


        return(
            <div className="tudo">

                <button onClick={handlePost} className="botoes">Postar frase</button>

                <div className="foto-frase">

                <h1 className="title">Um "álbum de fotos" para o meu bem...</h1>
                
                {fotoAleatoria ? (
                    <div>
                    <img 
                        src={fotoAleatoria} 
                        style={{
                            width: '650px',
                            height: 'auto',
                            maxHeight: '80vh'
                        }}
                    />
                </div>
                ) : (
                    <p>Nenhuma foto encontrada.</p>
                )}  



                <ul>
                    {fraseAleatoria ? (
                        <div>
                            <strong>Isso me lembra de você...: </strong> {fraseAleatoria.frases || fraseAleatoria.frase || JSON.stringify(fraseAleatoria)}
                        </div>
                    ) : (
                        <p>Nenhuma frase encontrada.</p>
                    )}
                </ul>

                </div>

                
                <button onClick={handleRefresh} className="botoes">Troca</button>
            </div>
        )
    }