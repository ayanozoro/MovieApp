import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "./card.css"
import { Link } from "react-router-dom"

const Cards = ({tv}) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 
    
    return <>
    {
        isLoading
        ?
        <div className="cards">
            <div style={{color:"aqua" , textAlign:"center"}}>Loding....</div>
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
            
        </div>
        :
        <Link to={`/movie/${tv.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${tv?tv.poster_path:""}`} />
                <div className="cards__overlay">
                    
                    <div className="card__runtime">
                        {movie?movie.release_date:""}
                        <span className="card__rating"> ⭐{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                    </div>
                    <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                </div>
                <div className="card__title">{tv?tv.name:"Hello"}</div>
            </div>
        </Link>
    }
    </>
}

export default Cards