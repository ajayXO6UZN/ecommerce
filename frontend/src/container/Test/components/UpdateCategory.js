import React from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DropdownTreeSelect from "react-dropdown-tree-select";
import 'react-dropdown-tree-select/dist/styles.css'
import data from '../demo-data.json'



const useStyles = makeStyles((theme) => ({

    inputSize: {
        width: '100%',
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
    control: {
        width: '100%',
    }
}));



const UpdateCategory = (props) => {

    const classes = useStyles();

    const {
        open,
        handleClose,
        handleTitle,
        size,
        allCategories,
        expandedArray,
        checkedArray,
        handleCategoryInput
    } = props;

    // const onChange = (currentNode, selectedNodes,index) => {
    //     handleCategoryInput('parentId', currentNode.value, index, 'expanded');
    //   };

    //   const onChange2 = (currentNode, selectedNodes,index) => {
    //     handleCategoryInput('parentId', currentNode.value, index, 'checked');
    //   };

    return (
        <>
            <Modal
                open={open}
                handleClose={handleClose}
                handleTitle={handleTitle}
            >
                <h5>Expanded Categories</h5>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) =>
                        <Box display="flex" key={index}>
                            <TextField id="outlined-basic" size='small' className={classes.inputSize} 
                            label={item.label} 
                            variant="outlined"
                            onChange={(e) => handleCategoryInput('label', e.target.value, index, 'expanded')}
                         />
                            <DropdownTreeSelect texts={{ placeholder: 'Select Category' }} onChange={(currentNode,selectedNodes) => handleCategoryInput('parentId', currentNode.value, index, 'expanded')} className={classes.control} data={allCategories} keepTreeOnSearch />
                        </Box>
                    )
                }
                <h5>Checked Categories</h5>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <Box display="flex" key={index}>
                            <TextField id="outlined-basic" size='small' className={classes.inputSize} 
                            label={item.label} 
                            variant="outlined" 
                            onChange={(e) => handleCategoryInput('label', e.target.value, index, 'checked')}
                            />
                            <DropdownTreeSelect className={classes.control} onChange={(currentNode,selectedNodes) => handleCategoryInput('parentId', currentNode.value, index, 'checked')} texts={{ placeholder: 'Select Category' }} data={allCategories} keepTreeOnSearch />
                        </Box>
                    )
                }
            </Modal>


        </>
    );
}

export default UpdateCategory