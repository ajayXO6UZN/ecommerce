import { makeStyles, useTheme } from '@material-ui/core/styles';



export default makeStyles((theme) => ({

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
    }
}));
