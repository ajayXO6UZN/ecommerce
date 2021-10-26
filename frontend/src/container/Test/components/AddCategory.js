import React from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import { Button, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DropdownTreeSelect from "react-dropdown-tree-select";
import 'react-dropdown-tree-select/dist/styles.css'
import data from '../demo-data.json'
import PublishIcon from '@material-ui/icons/Publish';


const useStyles = makeStyles((theme) => ({

    inputSize: {
        width: '100%',
        marginBottom: '15px'
    },
    input: {
        display: 'none',
    },
    PublishIcon: {
        marginRight: '15px'
    },
    PublishBtn: {
        marginTop: '15px'
    }
}));
const AddCategory = (props) => {

    const classes = useStyles();

    const {
        open,
        handleClose,
        allCategories,
        setCategoryName,
        handleCategoryImage,
        setParentCategoryId,
        parentCategoryId,
        handleTitle,
        size 
    } = props;

    
    const onChange = (currentNode, selectedNodes) => {
        console.log(setParentCategoryId(currentNode.value));
      };



    return (
        <>
            <Modal
                open={open}
                handleClose={handleClose}
                handleTitle={handleTitle}
                size={size}
            >
                <TextField 
                id="outlined-basic" 
                className={classes.inputSize} 
                label="Add Category" 
                onChange={(e) => setCategoryName(e.target.value)}
                variant="outlined" />
                <DropdownTreeSelect data={allCategories} onChange={onChange}  keepTreeOnSearch />
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" className={classes.PublishBtn} color="primary" component="span">
                        <PublishIcon className={classes.PublishIcon} />
                        Upload
                    </Button>
                </label>
            </Modal>


        </>
    );
}

export default AddCategory