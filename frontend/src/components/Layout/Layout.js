import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

const drawerWidth = 259;

const useStyles = makeStyles((theme) => ({
 
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,

    [theme.breakpoints.down('sm')]: {
      marginLeft: drawerWidth - 190,
  },
  },


}));

export default function Layout(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  return (

    <>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </>

  );
}