import React, { useEffect, useState } from "react";
import "./tv.css";
import { useParams } from "react-router-dom";
import Stream from "../src/components/stream/Stream";

const Tv = () => {
  const [currentTvDetail, setTvDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      const data = await response.json();
      setTvDetail(data);
    } catch (error) {
      console.error("Failed to fetch TV details", error);
    }
  };

  const handleDownload = () => {
    const fileContent =
      "This is the content of the text file.\nYou can add more lines here.\nEnjoy your download!";
    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "example.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getYoutubeSearchUrl = (showName) => {
    const query = encodeURIComponent(`${showName} trailer`);
    return `https://www.youtube.com/results?search_query=${query}`;
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentTvDetail ? currentTvDetail.backdrop_path : ""
          }`}
          alt="Backdrop"
        />
      </div>

      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentTvDetail ? currentTvDetail.poster_path : ""
              }`}
              alt="Poster"
            />
          </div>
        </div>

        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentTvDetail ? currentTvDetail.name : ""}
            </div>
            <div className="movie__tagline">
              {currentTvDetail ? currentTvDetail.tagline : ""}
            </div>
            <div className="movie__rating">
              {currentTvDetail ? currentTvDetail.vote_average : ""} <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentTvDetail ? `(${currentTvDetail.vote_count} votes)` : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentTvDetail
                ? `${currentTvDetail.episode_run_time?.[0] || "-"} mins per episode`
                : ""}
            </div>
            <div className="movie__releaseDate">
              {currentTvDetail ? `First air date: ${currentTvDetail.first_air_date}` : ""}
            </div>
            <div className="movie__genres">
              {currentTvDetail?.genres &&
                currentTvDetail.genres.map((genre) => (
                  <span className="movie__genre" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
            </div>
            <div className="quality">
              <h3>360p | 480p | 720p | 1080p | 2K</h3>
            </div>
            <div className="movie__detailRightBottom">
              <div className="synopsisText">Description</div>
              <div>{currentTvDetail ? currentTvDetail.overview : "hell"}</div>
            </div>

            {currentTvDetail && (
              <>
                <h3>Watch Trailer</h3>
                <button
                  className="btn"
                  onClick={() => window.open(getYoutubeSearchUrl(currentTvDetail.name), "_blank")}
                >
                  Watch Trailer on YouTube
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div>
        {[...Array(3)].map((_, index) => (
          <React.Fragment key={index}>
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentTvDetail ? currentTvDetail.poster_path : ""
              }`}
              alt={`Poster ${index + 1}`}
            />
            <br />
          </React.Fragment>
        ))}
      </div>

      <div>
        <button className="btn" onClick={handleDownload}>
          Download Now
        </button>
      </div>
    </div>
  );
};

export default Tv;
