import { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function App() {
  const newsApi = ""
  const [authors, setAuthors] = useState([]);
  const [titles, setTitle] = useState([]);
  const [descriptions, setDiscription] = useState([])
  const [urls, setUrl] = useState([])



  useEffect(() => {
    fetchNews();

  })

  const fetchNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApi}`)
      console.log(response)
      const NewsComponents = response.data.articles;
      console.log(NewsComponents)

      const authorsList = NewsComponents.map(NewsComponent => NewsComponent.author || 'unknown author')
      setAuthors(authorsList)
      console.log(authors)

      const titleList = NewsComponents.map(NewsComponent => NewsComponent.title || 'unknown title')
      setTitle(titleList);
      console.log(titles)

      const descriptionList = NewsComponents.map(NewsComponent => NewsComponent.description || 'unknown description')
      setDiscription(descriptionList);
      console.log(descriptions)

      const urlList = NewsComponents.map(NewsComponent => NewsComponent.url || 'unknown url')
      setUrl(urlList);
      console.log(urls)



    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>

      <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>Simple News Reader</Navbar.Brand>
          </Container>
        </Navbar>
      </Container>

      {authors.length > 0 ? (
        authors.map((article, index) => (
          <Card key={index} style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Card Title - {article.title} {index + 1} </Card.Title>
              <Card.Text>
                {article.description} -
                {article.author}
              </Card.Text>
              <Button variant="primary" href={article.url}>More info</Button>
            </Card.Body>
          </Card>
        )
        )) : (
        <p>Loading News...</p>
      )}

    </>
  )
}

export default App
