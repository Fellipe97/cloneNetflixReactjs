import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';



export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] =useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect( ()=>{
    const loadAll = async () => {
      
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegamdo o Filme em destaque (Featured)
      let originals = list.filter(i => i.slug === 'originals');
      let radomChosen = Math.floor( Math.random() * (originals[0].items.results.length - 1 ) );
      let chosen = originals[0].items.results[radomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
        if(window.scrollY > 10){
          setBlackHeader(true);
        }else{
          setBlackHeader(false);
        }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  },[]);

  return(
    <div className="page">
      
      <Header black = {blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">🧡</span> pela B7Web <br />
        Direitos de imagem para NetFlix <br />
        Dados pegos do site Themoviedb.org
      </footer>
      
      {movieList.length <=0 && 
        <div className='loading'>
            <img src="https://i.imgur.com/6L2zd2V.gif" alt="Carregando"/>
        </div>
      }
    </div>
  );
}