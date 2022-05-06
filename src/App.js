import React, { useState, useEffect }from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/news_cards';
import useStyles from './style.js';
import logo from './images/logo.png';
import wordsToNumbers from 'words-to-numbers';

const alanKey ='46ddc5866ce9ffbb39ef3b695c41fec52e956eca572e1d8b807a3e2338fdd0dc/stage';


const App =() =>{

    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();
    useEffect(() =>{
        alanBtn({
            key:alanKey,
            onCommand:({ command , articles , number}) =>{
                if(command === 'newHeadlines'){
                    console.log('New Headlines'+ articles.length +articles);
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle+1)
                }
                else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
          
                    if (parsedNumber > articles.length) {
                      alanBtn().playText('Please try that again...');
                    } else if (article) {
                      window.open(article.url, '_blank');
                      alanBtn().playText('Opening...');
                    } else {
                      alanBtn().playText('Please try that again...');
                    }
                  }
            },
        });
    },[]);

    return(
        <div>
            <div className="classes.logocontainer">
                <img src={logo} className={classes.alanLogo} alt="logo" />
            </div>
            <NewsCards  articles = {newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}

export default App;