import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [items, setItems] = useState([])

  // IMPORTANTE: Cambia esta URL por la que te dé Railway cuando despliegues el backend
  // Si estás probando localmente, usualmente es http://localhost:8000
  let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  if (API_URL && !API_URL.startsWith('http')) {
    API_URL = 'https://' + API_URL;
  }

  useEffect(() => {
    // Llama a la raíz del backend para obtener el mensaje de bienvenida
    fetch(`${API_URL}/`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Error conectando al backend:", err))

    // Llama a la ruta /items/ para obtener los items de la base de datos
    fetch(`${API_URL}/items/`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Error obteniendo items:", err))
  }, [])

  return (
    <div className="App">
      <h1>Frontend Vercel + Backend Railway</h1>
      <div className="card">
        <h2>Mensaje del Backend:</h2>
        <p>{message ? message : 'Cargando mensaje...'}</p>
      </div>
      
      <div className="card">
        <h2>Items de la Base de Datos (PostgreSQL):</h2>
        {items.length === 0 ? (
          <p>No hay items o cargando...</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item.name} - {item.description}</li>
            ))}
          </ul>
        )}
      </div>
      <p className="read-the-docs">
        Revisa el código para ver cómo conectar ambos proyectos. 
        Recuerda configurar la variable de entorno VITE_API_URL en Vercel.
      </p>
    </div>
  )
}

export default App
