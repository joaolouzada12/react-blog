import blogFetch from '../axios/config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Newpost.css'

const Newpost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)

  const [titleError, setTitleError] = useState("")
  const [bodyError, setBodyError] = useState("")

  const createPost = async (e) => {
    e.preventDefault()

    
    setTitleError("")
    setBodyError("")

    let hasError = false
    if (title.trim() === "") {
      setTitleError("O título é obrigatório.")
      hasError = true
    }
    if (body.trim() === "") {
      setBodyError("O conteúdo é obrigatório.")
      hasError = true
    }
    if (hasError) return

    setLoading(true)

    const post = { title, body, userId: 1 }

    try {
      await blogFetch.post("/posts", post)
      navigate("/")
    } catch (error) {
      console.error("Erro ao criar o post:", error)
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="new-post">
      <h2>Inserir novo Post:</h2>
      <form onSubmit={createPost}>
        <div className="form-control">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Digite o título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          {titleError && <p className="error">{titleError}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="body">Conteúdo:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={loading}
          />
          {bodyError && <p className="error">{bodyError}</p>}
        </div>
        <input
          type="submit"
          value={loading ? "Carregando..." : "Criar Post"}
          className="btn"
          disabled={loading}
        />
      </form>
    </div>
  )
}

export default Newpost
