import { makeStyles, useTheme } from '@material-ui/core/styles';



export default makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
      },

      // modal box css

      closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },

      addInput:{
        width:"100%",
        marginBottom:'20px'
      },
      dialogCustomizedWidth: {
        'width': '60%',
        height:'50%'
      },
      checkboxFont:{
        fontSize:'40px'
      }

}));
