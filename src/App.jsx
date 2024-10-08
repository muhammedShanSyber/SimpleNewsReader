import { useEffect } from 'react'
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
  useEffect(() => {
    fetchNews();
  })

  const fetchNews = async () => {
    // console.log('This text is working');
    console.log(newsApi)
    const Data = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=0f5722122ab7419ab5f71db0233c7fda`)
    const NewsComponents = Data.data.articles;
    console.log(NewsComponents)

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
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </>
  )
}

export default App
