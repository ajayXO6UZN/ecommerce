import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    dialogCustomizedWidth: {
        width: props => (props.size ? '60%' : ''),
        height: props => (props.size ? '50%' : '')
    }

}));

// MODAL BOX

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },

});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const Modal = (props) => {
    const classes = useStyles(props);
    return (
        <>
            <Dialog onClose={props.simpleHandleClose} aria-labelledby="customized-dialog-title"
                classes={{ paperWidthSm: classes.dialogCustomizedWidth }}
                open={props.open}>
                <DialogTitle id="customized-dialog-title" onClose={props.simpleHandleClose}>
                    {props.handleTitle}
                </DialogTitle>
                <DialogContent dividers>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.handleClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Modal