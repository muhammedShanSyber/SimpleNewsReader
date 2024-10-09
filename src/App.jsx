import { useEffect, useState } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import './App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {
  const newsApi = import.meta.env.VITE_NEWS_API_KEY;
  const [articles, setArticles] = useState([]);
  const [show, setShow] = useState(false);

  const CACHE_KEY = 'cachedArticles';
  const CACHE_EXPIRATION = 10 * 60 * 1000;

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const cachedData = getCachedData();
    if (cachedData) {
      setArticles(cachedData);
    } else {
      // const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApi}`)
        // console.log(response)
        const NewsComponents = response.data.articles;
        console.log(NewsComponents)

        const articlesData = NewsComponents.map(news => ({
          author: news.author || 'unknown author',
          title: news.title || 'title unknown',
          description: news.description || 'description unavailable',
          url: news.url || 'url unavailable',
          Image: news.urlToImage || 'Image unavailable'
        }));

        setArticles(articlesData);
        cacheData(articlesData);

      } catch (error) {
        console.error(error)
        setShow(true)
      }
    }
  }

  const getCachedData = () => {
    const cachedArticles = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(`${CACHE_KEY}_time`);

    if (cachedArticles && cachedTime) {
      const now = Date.now();
      if (now - cachedTime < CACHE_EXPIRATION) {
        return JSON.parse(cachedArticles);
      } else {
        // If cache is expired, clear it
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_time`);
      }
    }
    return null;
  };

  const cacheData = (data) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(`${CACHE_KEY}_time`, Date.now());
  };

  return (
    <>

      <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand><h2>Simple News Reader</h2> </Navbar.Brand>
          </Container>
        </Navbar>
      </Container>

      <div className='main-container'>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <Card className='cards' key={index} >
              <Card.Img variant="top" src={article.Image || 'defaultImage.jpg'} className='image' />
              <Card.Body className='card'>
                <Card.Title> <h3>{article.title}</h3></Card.Title>
                <Card.Text>
                  {article.description} <br /> - {article.author}
                </Card.Text>
                <Button variant="primary" href={article.url}>More info</Button>
              </Card.Body>
            </Card>



          ))
        ) : (
          <Alert show={show} variant="danger" className='alert'>
            <Alert.Heading>Error</Alert.Heading>
            <p>Unable to fetch the news</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => (setShow(false), window.location.reload(true))} variant="outline-success">
                Retry
              </Button>
            </div>
          </Alert>
        )}

      </div>

    </>
  )
}

export default App