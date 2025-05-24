import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Post = () => {

    const API_URL_FRASES = 'https://682e655d746f8ca4a47ce3de.mockapi.io/api/v1/frases'
    const API_URL_FOTOS = 'https://682e655d746f8ca4a47ce3de.mockapi.io/api/v1/fotos'

    const [frases, setFrases] = useState([])
    const [url, setUrl] = useState([])
    const [msgFrase, setMsgFrase] = useState('')
    const [msgFoto, setMsgFoto] = useState('')
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/')
    }


    const handleSubmitFrase = async(e) => {
        e.preventDefault()

        fetch(API_URL_FRASES, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({frases})
        })

            .then((response) => {
                if(!response.ok){
                    throw new Error('Erro ao enviar frase')
                }

                return response.json()
            })

            .then((data) => {
                setFrases('')
                console.log(frases)
                setMsgFrase('Frase enviada com sucesso')
            })
            .catch((error) => {
                console.error('Erro ao enviar frase: ', error)
                setMsgFrase('Erro ao enviar frase')
            })
    }


    const handleSubmitFoto = async(e) => {
        e.preventDefault()

        fetch(API_URL_FOTOS, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({url})
        })

            .then((response) => {
                if(!response.ok){
                    throw new Error('Erro ao enviar url')
                }

                return response.json()
            })

            .then((data) => {
                setUrl('')
                console.log(url)
                setMsgFoto('URL enviada com sucesso')
            })
            .catch((error) => {
                console.error('Erro ao enviar frase: ', error)
                setMsgFoto('Erro ao enviar url')
            })
    }





    return(
        <div>
            <form onSubmit={handleSubmitFoto}>
                <label htmlFor="">URL da imagem:</label>
                <input type="text" onChange={(e) => setUrl(e.target.value)} value={url}/>
                <button>enviar</button>
            </form>
            {msgFoto && <p>{msgFoto}</p>}

            <form onSubmit={handleSubmitFrase}>
                <label htmlFor="">Frase:</label>
                <input type="text" onChange={(e) => setFrases(e.target.value)} value={frases}/>
                <button>enviar</button>
            </form>
            {msgFrase && <p>{msgFrase}</p>}

            <button onClick={handleBack}>voltar</button>
        </div>
    )
}