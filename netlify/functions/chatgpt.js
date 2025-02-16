require('dotenv').config();  // Cargar el archivo .env

const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { description } = JSON.parse(event.body);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST', 
        headers: {  // Corregir 'Headers' a 'headers' y 'content-Type' a 'Content-Type'
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,  // Usar la clave desde .env
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: `Recomienda un gabinete gamer basado en esta descripción: ${description}`}],
        }),
    });

    const data = await response.json();
    const recommendation = data.choices[0].message.content;  // Corregir a 'message.content'

    return {
        statusCode: 200,  // Corregir 'statuscode' a 'statusCode'
        body: JSON.stringify({ recommendation }),
    };
};
