// import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Pagination from '@mui/lab/Pagination';

// import {
//   Container,
//   createTheme,
//   TableCell,
//   LinearProgress,
//   ThemeProvider,
//   Typography,
//   TextField,
//   TableBody,
//   TableRow,
//   TableHead,
//   TableContainer,
//   Table,
//   Paper,
// } from "@material-ui/core";
// import axios from "axios";
// import { CoinList } from "../config/api";
// import { useNavigate } from "react-router-dom";
// import { useCrypto } from "../CryptoContext";

// // Function to format numbers with commas
// export function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// // Main component
// export default function CoinsTable() {
//   const [coins, setCoins] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);

//   // Retrieve currency and symbol from context
//   const { currency, symbol } = useCrypto();
//   const navigate = useNavigate(); // Use navigate instead of history

//   const useStyles = makeStyles({
//     row: {
//       backgroundColor: "#16171a",
//       cursor: "pointer",
//       "&:hover": {
//         backgroundColor: "#131111",
//       },
//       fontFamily: "Montserrat",
//     },
//     pagination: {
//       "& .MuiPaginationItem-root": {
//         color: "gold",
//       },
//     },
//   });

//   const classes = useStyles();

//   // Create dark theme
//   const darkTheme = createTheme({
//     palette: {
//       primary: {
//         main: "#fff",
//       },
//       type: "dark",
//     },
//   });

//   // Fetch coins data
//   const fetchCoins = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(CoinList(currency));
//       setCoins(data);
//     } catch (error) {
//       console.error("Failed to fetch coins:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch coins when currency changes
//   useEffect(() => {
//     fetchCoins();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currency]);

//   // Handle search functionality
//   const handleSearch = () => {
//     return coins.filter(
//       (coin) =>
//         coin.name.toLowerCase().includes(search.toLowerCase()) ||
//         coin.symbol.toLowerCase().includes(search.toLowerCase())
//     );
//   };

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <Container style={{ textAlign: "center" }}>
//         <Typography
//           variant="h4"
//           style={{ margin: 18, fontFamily: "Montserrat" }}
//         >
//           Cryptocurrency Prices by Market Cap
//         </Typography>
//         <TextField
//           label="Search For a Crypto Currency.."
//           variant="outlined"
//           style={{ marginBottom: 20, width: "100%" }}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <TableContainer component={Paper}>
//           {loading ? (
//             <LinearProgress style={{ backgroundColor: "gold" }} />
//           ) : (
//             <Table aria-label="simple table">
//               <TableHead style={{ backgroundColor: "#EEBC1D" }}>
//                 <TableRow>
//                   {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
//                     <TableCell
//                       style={{
//                         color: "black",
//                         fontWeight: "700",
//                         fontFamily: "Montserrat",
//                       }}
//                       key={head}
//                       align={head === "Coin" ? "center" : "left"}
//                     >
//                       {head}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {handleSearch()
//                   .slice((page - 1) * 10, (page - 1) * 10 + 10)
//                   .map((row) => {
//                     const profit = row.price_change_percentage_24h > 0;
//                     return (
//                       <TableRow
//                       onClick={() => {
//                         if (row.id) {
//                           navigate(`/coins/${row.id}`);
//                         }
//                       }}
//                         className={classes.row}
//                         key={row.id}
//                       >
//                         <TableCell
//                           component="th"
//                           scope="row"
//                           style={{
//                             display: "flex",
//                             gap: 15,
//                           }}
//                         >
//                           <img
//                             src={row?.image}
//                             alt={row.name}
//                             height="50"
//                             style={{ marginBottom: 10 }}
//                           />
//                           <div
//                             style={{ display: "flex", flexDirection: "column" }}
//                           >
//                             <span
//                               style={{
//                                 textTransform: "uppercase",
//                                 fontSize: 22,
//                               }}
//                             >
//                               {row.symbol}
//                             </span>
//                             <span style={{ color: "darkgrey" }}>
//                               {row.name}
//                             </span>
//                           </div>
//                         </TableCell>
//                         <TableCell align="right">
//                           {symbol} {numberWithCommas(row.current_price.toFixed(2))}
//                         </TableCell>
//                         <TableCell
//                           align="left"
//                           style={{
//                             color: profit ? "rgb(14, 203, 129)" : "red",
//                             fontWeight: 500,
//                           }}
//                         >
//                           {profit && "+"}
//                           {row.price_change_percentage_24h.toFixed(2)}%
//                         </TableCell>
//                         <TableCell align="left">
//                           {symbol}{" "}
//                           {numberWithCommas(
//                             row.market_cap.toString().slice(0, -6)
//                           )}
                        
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })}
//               </TableBody>
//             </Table>
//           )}
//         </TableContainer>

//         {/* Pagination */}
//         <Pagination
//           count={Math.ceil(handleSearch()?.length / 10)}
//           style={{
//             padding: 20,
//             width: "100%",
//             display: "flex",
//             justifyContent: "center",
//           }}
//           classes={{ ul: classes.pagination }}
//           onChange={(_, value) => {
//             setPage(value);
//             window.scroll(0, 450);
//           }}
//         />
//       </Container>
//     </ThemeProvider>
//   );
// }
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from '@mui/material/Pagination';
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../CryptoContext"; // Corrected path

const useStyles = makeStyles({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = useCrypto();
  const navigate = useNavigate();
  const classes = useStyles();

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "center" : "left"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.id}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="left">
                          {symbol}{" "}
                          {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={Math.ceil(handleSearch().length / 10)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
