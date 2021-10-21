import { makeStyles, useTheme } from '@material-ui/core/styles';
import aj from "../../assets/img/sidebar1.jpg";


const drawerWidth = 259;

export default makeStyles((theme) => ({
        root: {
            display: 'flex',
        },


    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.down('sm')]: {
            width: open => (open ? '' : drawerWidth - 174),
        },
        backgroundImage: `url(${aj})`,
        top: 0,
        left: 0,
        height: '100%',
        zIndex: 1,
        position: 'absolute',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        '&::after': {
            width: '100%',
            height: '100%',
            content: '""',
            // display: 'block',
            opacity: '.8',
            zIndex: 3,
            position: 'absolute',
            background: '#000',
        }
    },
    // necessary for content to be below app bar
    toolbar: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(0, 1),
        zIndex: 5,
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    imgWidth: {
        width: '40px',
        marginRight: '9px'
    },
    itemCenter: {
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            textDecoration: 'none',
        },
        fontFamily: `"Roboto", "Helvetica", "Arial", 'sans-serif'`,
        fontWeight: 500,
        fontSize: '19px',
        lineHeight: '2.1',
        padding: '18px',
        color: '#fff'
    },
    listBox: {
        zIndex: 5,
        color: '#fff',
        padding: '15px',
    },
    listIcon: {
        color: 'white',
    },
    divider: {
        zIndex: 5,
        background: 'rgba(180, 180, 180, 0.3)',
    },
    listItem: {
        '&:hover': {
            backgroundColor: '#00acc1',
            borderRadius: '5px',
        },
        margin: '14px 0px 14px 0px'
    },
    active: {
        backgroundColor: '#00acc1',
        borderRadius: '5px',
    },
    ecom: {
        display: 'block',
        [theme.breakpoints.down('sm')]: {
            display: open => (open ? 'block' : 'none'),
        },
    }
}));
