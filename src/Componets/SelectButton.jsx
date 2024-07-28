// import React from 'react'
// import { makeStyles } from "@material-ui/core";



// export const SelectButton = ({ children, selected, onClick }) => {

//     const useStyles = makeStyles({
//         selectbutton: {
//           border: "1px solid gold",
//           borderRadius: 5,
//           padding: 10,
//           paddingLeft: 20,
//           paddingRight: 20,
//           fontFamily: "Montserrat",
//           cursor: "pointer",
//           backgroundColor: selected ? "gold" : "",
//           color: selected ? "black" : "",
//           fontWeight: selected ? 700 : 500,
//           "&:hover": {
//             backgroundColor: "gold",
//             color: "black",
//           },
//           width: "22%",
//           //   margin: 5,
//         },
//       });
    
//   return (
//     <span onClick={onClick} className={classes.selectbutton}>
//       {children}
//     </span>
//   )
// }
import React from 'react';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  selectbutton: {
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected => (selected ? "gold" : ""),
    color: selected => (selected ? "black" : ""),
    fontWeight: selected => (selected ? 700 : 500),
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
    //   margin: 5,
  },
});

export const SelectButton = ({ children, selected, onClick }) => {
  const classes = useStyles(selected);

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};
