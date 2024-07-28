import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import AliceCarousel from 'react-alice-carousel';
import { Link } from "react-router-dom";
import { TrendingCoins } from "../config/api";
import { useCrypto } from "../CryptoContext";
import { numberWithCommas } from "../Componets/CoinsTable";

// Define useStyles for styling
const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    textDecoration: "none", // Added to remove underline from links
  },
}));

export const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useCrypto();
  const classes = useStyles();

  // Fetch trending coins
  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      console.log(data);
      setTrending(data);
    } catch (error) {
      console.error("Failed to fetch trending coins:", error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // Map trending data to carousel items
  const items = trending.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`} key={coin.id}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};
