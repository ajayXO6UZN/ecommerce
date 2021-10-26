import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AddCategory from './components/AddCategory';
import UpdateCategory from './components/UpdateCategory';
import { Box, Button, Typography } from '@material-ui/core';
import Modal from '../../components/UI/Modal/Modal';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
} from "react-icons/io";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import useStyles from './style';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCategory,
    addCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from '../../actions/categoryAction';


const payload = {
    "categoryList": [
        {
            "_id": "1",
            "name": "ajay",
            "children": [
                {
                    "_id": "2",
                    "name": "anuj",
                    "children": []
                }
            ]
        },
        {
            "_id": "3",
            "name": "sahu",
            "children": [
                {
                    "_id": "4",
                    "name": "don",
                    "children": []
                }
            ]
        },
    ]
};


const Test = (props) => {

    const category = useSelector(state => state.allCategoryList);
    const classes = useStyles();
    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');

    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);

    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const [open, setOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleUpdateOpen = () => {
        updateCheckedExpandedCategories();
        setUpdateOpen(true);
    };

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);

        dispatch(addCategory(form));

        setCategoryName('');
        setParentCategoryId('');
        setOpen(false);
    };
    const handleUpdateClose = () => {
        setUpdateOpen(false);
    };

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.label,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {

        for (let category of categories) {
            options.push({
                value: category._id,
                label: category.label,
                parentId: category.parentId,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }


    const updateCheckedExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];

        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }


    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
            console.log(updatedCheckedArray);

        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const updateCategoriesForm = () => {
        const form = new FormData();
        console.log(checkedArray);
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.label);
            form.append('parentId', item.parentId ? item.parentId : "");
        })
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.label);
            form.append('parentId', item.parentId ? item.parentId : "");
        })

        dispatch(updateCategories(form));
        handleUpdateClose(false);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        })
        console.log(checkedArray);
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log(checkedArray);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        console.log(checkedIdsArray);
        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray));
        }

        setDeleteCategoryModal(false);

    }
    const renderDeleteCategoryModal = () => {
        return (
            <>
                <Modal
                    open={deleteCategoryModal}
                    handleClose={deleteCategories}
                    handleTitle={'Confirm'}
                >
                    <h5>Expanded</h5>
                    {expandedArray.map((item, index) => <span key={index}>{item.label}</span>)}
                    <h5>Checked</h5>
                    {checkedArray.map((item, index) => <span key={index}>{item.label}</span>)}
                </Modal>


            </>
        );
    }


    const categoryList = renderCategories(category.categories);

    return (
        <>
            <Layout>
                <Box display="flex" p={1} flexWrap='wrap'>
                    <Box p={1} flexGrow={1} >
                        <Typography variant="h4" component="div">categories</Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleClickOpen}
                        className={classes.button}
                        startIcon={<AddCircleIcon />}
                    >
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleUpdateOpen}
                        className={classes.button}
                        startIcon={<EditIcon />}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={deleteCategory}
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </Box>

                <CheckboxTree

                    nodes={renderCategories(category.categories)}
                    checked={checked}
                    expanded={expanded}
                    onCheck={checked => setChecked(checked)}
                    onExpand={expanded => setExpanded(expanded)}
                    icons={{
                        check: <IoIosCheckbox />,
                        uncheck: <IoIosCheckboxOutline />,
                        halfCheck: <IoIosCheckboxOutline />,
                        expandClose: <IoIosArrowForward />,
                        expandOpen: <IoIosArrowDown />,
                    }}
                />
                <AddCategory
                    open={open}
                    handleClose={handleClose}
                    handleTitle={'Add New category'}
                    size='true'
                    allCategories={categoryList}
                    categoryName={categoryName}
                    setCategoryName={setCategoryName}
                    parentCategoryId={parentCategoryId}
                    setParentCategoryId={setParentCategoryId}
                />
                <UpdateCategory
                    open={updateOpen}
                    handleClose={updateCategoriesForm}
                    handleTitle={'Update Categories'}
                    allCategories={categoryList}
                    expandedArray={expandedArray}
                    checkedArray={checkedArray}
                    handleCategoryInput={handleCategoryInput}
                />
                {renderDeleteCategoryModal()}
            </Layout>

        </>
    );
}

export default Test;
