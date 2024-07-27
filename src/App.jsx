import { useState } from 'react'
import './App.css'
import { HomePage } from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'
import {Header} from './Componets/Header'
import { BrowserRouter, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));


function App() {
  const classes = useStyles();

  return (
    <>
        <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={HomePage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
    </BrowserRouter>

    </>
  )
}

export default App
