import React, { useEffect, useState } from "react";

export const Home = () => {

    const API_URL_FRASES = 'https://682e655d746f8ca4a47ce3de.mockapi.io/api/v1/frases'
    const API_URL_FOTOS = 'https://682e655d746f8ca4a47ce3de.mockapi.io/api/v1/fotos'
    const [frases, setFrases] = useState([])
    const [fotos, setFotos] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const [responseFrases, responseFotos] = await Promise.all([
                    fetch(API_URL_FRASES),
                    fetch(API_URL_FOTOS)
                ])

                if (!responseFrases.ok) {
                    throw new Error('Erro na requisição das frases: ' + responseFrases.status);
                }
                if (!responseFotos.ok) {
                    throw new Error('Erro na requisição das fotos: ' + responseFotos.status);
                }

                const dataFrases = await responseFrases.json()
                const dataFotos = await responseFotos.json()

                setFrases(dataFrases)
                setFotos(dataFotos)
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
        <div>

            {fotoAleatoria ? (
                <div>
                    <img 
                        src={fotoAleatoria.url || fotoAleatoria.imagem || ''} 
                        alt="Imagem aleatória" 
                    />
                </div>
            ) : (
                <p>Nenhuma foto encontrada.</p>
            )}



            <ul>
                {fraseAleatoria ? (
                    <div>
                        <strong>Frase: </strong> {fraseAleatoria.frases || fraseAleatoria.frase || JSON.stringify(fraseAleatoria)}
                    </div>
                ) : (
                    <p>Nenhuma frase encontrada.</p>
                )}
            </ul>
        </div>
    )
}