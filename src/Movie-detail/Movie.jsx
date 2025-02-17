import React, {useEffect, useState} from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
import Stream from "../components/stream/Stream"


const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const { id } = useParams()

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])
    

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => setMovie(data))
        // console.log(data);
    }

    const handleDownload = () => {
        const fileContent = "This is the content of the text file.\nYou can add more lines here.\nEnjoy your download!";
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); 
        link.download = 'example.txt'; 

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="movie">
            <h1 className="top_view" style={{textAlign:'left'}}><span style={{color:'red'} }>{currentMovieDetail ? currentMovieDetail.original_title : ""}</span> Download in <span style={{color:'aquamarine'}}>480p||720p||1080P</span></h1>
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Discription</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>

            
            </div>
            
            <div>
            <Stream movieId={id} />
            {[...Array(3)].map((_, index) => (
    <React.Fragment key={index}>
      <img
        className="movie__poster"
        src={`https://image.tmdb.org/t/p/original${
          currentMovieDetail ? currentMovieDetail.poster_path : ""
        }` }
      />
      <br />
    </React.Fragment>
  ))}
</div>

        <div style={{textAlign:'center'}}>
        <h2 className="dow_view">Download {currentMovieDetail ? currentMovieDetail.original_title : ""} in 480p</h2>
            <button className="btn" onClick={handleDownload}>Download Now</button>
        </div>
        <div style={{textAlign:'center'}}>
        <h2 className="dow_view" >Download {currentMovieDetail ? currentMovieDetail.original_title : ""} in 720p</h2>
            <button className="btn" onClick={handleDownload}>Download Now</button>
        </div>
        <div style={{textAlign:'center'}}>
        <h2 className="dow_view" >Download {currentMovieDetail ? currentMovieDetail.original_title : ""} in 1080p</h2>
            <button className="btn" onClick={handleDownload}>Download Now</button>
        </div>
</div>
    )
}

export default Movie;
