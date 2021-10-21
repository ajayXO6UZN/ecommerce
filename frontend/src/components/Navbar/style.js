import { makeStyles, useTheme } from '@material-ui/core/styles';
import aj from "../../assets/img/sidebar1.jpg";

const drawerWidth = 259;

export default makeStyles((theme) => ({

  appBar: {

    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${drawerWidth - 190}px)`,
      marginLeft: drawerWidth - 190,
    },

    backgroundImage: `url(${aj})`,

    zIndex: 1,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    '&::after': {
      width: `calc(100% - ${drawerWidth}px)`,
      height: '65px',

      [theme.breakpoints.down('sm')]: {
        width: `calc(100% - ${drawerWidth - 190}px)`,
      
        marginLeft: open => (open ? '' :drawerWidth-174 ),
      },
      marginLeft: drawerWidth,
      top: 0,
      left: 0,
      content: '""',
      opacity: '.8',
      zIndex: 3,
      position: 'absolute',
      background: '#000',
    }

  },


  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {

  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    zIndex: 4,
    marginLeft: theme.spacing(1),
  },

  sectionDesktop: {
    zIndex: 4,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    zIndex: 5,
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

