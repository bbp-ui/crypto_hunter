import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCryptoNews = async () => {
    try {
      const response = await axios.get(
        "https://newsdata.io/api/1/news?apikey=pub_5513163454e5a684eeb727bf815fe5366c5a2&q=crypto%20news%20api"
      );
      setNewsItems(response.data.results);
    } catch (error) {
      console.error("Error fetching crypto news data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const limitedNewsItems = newsItems.slice(0, 6);

  return (
    <div>
      <div className="crypto-news-container">
        <header className="crypto-header">
        
        </header>

        <div className="news-grid">
          {limitedNewsItems.map((item) => (
            <NewsCard key={item.title} title={item.title} image={item.image_url} link={item.link} />
          ))}
        </div>
      </div>
    </div>
  );
};

const NewsCard = ({ title, image, link }) => {
  return (
    <div className="news-card">
      {image && <img src={image} alt="news" className="news-image" />}
      <a href={link} className="news-title" target="_blank" rel="noopener noreferrer">
        <p>{title}</p>
      </a>
    </div>
  );
};

export default NewsPage;
