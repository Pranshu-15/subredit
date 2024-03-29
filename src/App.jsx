import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import Article from './Components/Article';

const App = () => {
  const[articles,setArticles] = useState([]);
  const[subreddit,setSubreddit] = useState('webdev');
  useEffect(()=>{
    fetch("https://www.reddit.com/r/"+subreddit+"/.json").then(res =>{
      if(res.status != 200){
        console.log("ERROORR")
        return;
      }
      res.json().then(data =>{
        if(data != null){
          setArticles(data.data.children);
        }
      })
    })
  },[subreddit])
  const handleChange = (e) => {
    setSubreddit(e.target.value)
  }
  return(
    <>
      <div className='App'>
        <header className='App-header'>
          <input type='text' className='input' value={subreddit} onChange = {handleChange}/>
        </header>
        <div className='articles'>
            {
              (articles != null) ? articles.map((article,index) => <Article key = {index} article = {article.data} />) : ''
            }
        </div>
      </div>
    </>
  )
}

export default App
