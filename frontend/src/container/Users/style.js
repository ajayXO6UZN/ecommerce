import { makeStyles, useTheme } from '@material-ui/core/styles';



export default makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    },
    imgStyle: {
        width: '75px',
        height: '64px',
        // backgroundColor:'#eee'
    },
    innerImage: {
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%',
        backgroundSize: 'contain',
        objectFit: 'contain'
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      inputSize: {
        width: '47%',
        marginBottom: '15px',
        marginRight: '15px'
    },
    input: {
        display: 'none',
    },
    PublishIcon: {
        marginRight: '15px'
    },
    PublishBtn: {
        marginTop: '15px'
    },
    selectArea:{
        width: '50%',
        marginBottom: '10px'
    },
    textArea: {
        width: '97%',
        marginBottom: '10px'
    },
    imagePreview: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    imageControl: {
        width: '65px',
        height: '65px',
        border: '1px solid #eee'
    },
    mainImage: {
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50%',
        backgroundSize: 'contain',
        objectFit: 'contain'
    },
    addUser:{
        display:'flex'
    }
}));
