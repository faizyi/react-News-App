import React, { useEffect, useState } from 'react'
import './news.css'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

function News() {
    // 48793f2c226b49caa31afe8b1cdd9ea0
    const [input, setInput] = useState('');
    const [newsData, setNewsData] = useState({});
    const date = new Date().getDate();
    // console.log(date);
    useEffect(()=>{
        fetch(`https://newsapi.org/v2/everything?q=world&from=${date}&sortBy=publishedAt&apiKey=48793f2c226b49caa31afe8b1cdd9ea0`)
        .then(response => response.json())
        .then(data => {
            setNewsData(data)
        })
    },[])
    async function getNews() {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${input}&from=${date}&sortBy=publishedAt&apiKey=48793f2c226b49caa31afe8b1cdd9ea0`)
            const data = await response.json();
            setNewsData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        setInput('');
    }
    // if(!newsData.length){
    //     return  <h1>Loading.....</h1>
    // }
    return (
        <div className='news-app'>

            <div className='header'>
                <div className='heading'>
                    <h1>OpenNews</h1>
                </div>
                {/* <div className='news-topics'>
                    <input type="checkbox" id='check' className='input' />
                    <ul className='ul'>
                        <li className='li'>Business</li>
                        <li>Entertainment</li>
                        <li>Sports</li>
                        <li>Education</li>
                        <li>Politics</li>
                    </ul>
                </div> */}
                <div className='search-header'>
                <div className='serach'>
                    <form onSubmit={(e) => getNews(e.preventDefault())}>
                        <input onChange={(e) => setInput(e.target.value)} placeholder='Search News' type="Search" value={input} />
                        <button className='btn' type='submit'>{<SearchIcon />}</button>
                    </form>
                </div>
                </div>
                {/* <div className='menu-icon'>
                <label  className='label' htmlFor='check'>{<MenuIcon/>}</label>
                </div> */}
            </div>

            <div className='news-container'>

                <div className='news-data'>
                    {
                        typeof newsData.articles !== 'undefined' ? (
                            <div className='firts-news'>
                                <div className='news-img'>
                                    <a target='blank' href={newsData.articles[0].url}><img src={newsData.articles[0].urlToImage} alt="" /></a>
                                </div>
                                <div className='news-text'>
                                    <div>
                                        <div className='news-header'>
                                            <p className='name'>{newsData.articles[0].source.name}</p>
                                            <h1>{newsData.articles[0].title}.</h1>
                                            <p className='desc'>{newsData.articles[0].description}</p>
                                        </div>
                                        <p className='news-date'><span>PublishedAt:</span>{newsData.articles[0].publishedAt.slice(0,10)}</p>
                                    </div>
                                </div>
                            </div>
                        ) : ('')
                    }
                    <div className='latest-news'>
                        <h1>Latest News</h1>
                            {
                                typeof newsData.articles !== 'undefined' ? (
                                    newsData.articles.map((v, i) => {
                                        return (
                                            <div className='all-news'>
                                            <div>
                                                <a target='blank' href={v.url}><img src={v.urlToImage} alt="" /></a>
                                                <p className='name'>{v.source.name}</p>
                                                <h2>{v.title.slice(0,40)}.....</h2>
                                                {/* <p>{v.description}</p> */}
                                                <p className='time'><span>PublishedAt:</span>{v.publishedAt.slice(0,10)}</p>
                                            </div>
                        </div>
                                        )
                                    })
                                ) : ('')
                            }
                    </div>






                </div>
            </div>
        </div>
    )
}

export default News