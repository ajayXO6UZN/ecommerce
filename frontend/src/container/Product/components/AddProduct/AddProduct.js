import React, { useState,useEffect } from 'react';
import Modal from '../../../../components/UI/Modal/Modal';
import { Button, TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DropdownTreeSelect from "react-dropdown-tree-select";
import 'react-dropdown-tree-select/dist/styles.css'
import PublishIcon from '@material-ui/icons/Publish';
import useStyles from './style';
import { generatePublicUrl } from '../../../../urlConfig';
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from 'react-redux';

const AddProduct = (props) => {
    const alert = useAlert();
    const classes = useStyles();
    const dispatch = useDispatch();

  //  const {error,loading} = useSelector((state) => state.newProduct);


    const {
        open,
        handleClose,
        allCategories,
        setProductTitle,
        setProductBrand,
        setProductStock,
        setProductPrice,
        setProductComparePrice,
        setProductDescription,
        handleImageChange,
        setCategory,
        handleTitle,
        selectedFiles,
        productRow,
        setProductId,
        simpleHandleClose
    } = props;


    const onChange = (currentNode, selectedNodes) => {
        console.log(setCategory(currentNode.label));
    };

    // useEffect(() => {
    //     if (error) {
    //       alert.error(error);
    //      // dispatch(clearErrors());
    //     }
    //    // dispatch(getProduct());
    //   }, [dispatch, error, alert]);

    const renderPhotos = (source) => {
        console.log("source: ", source);
        return source.map((photo) => {
            return <div className={classes.imageControl}>
                <img className={classes.mainImage} src={photo} alt="" key={photo} />
            </div>;
        });
    };
    console.log(productRow)
    return (
        <>
            <Modal
                open={open}
                handleClose={handleClose}
                simpleHandleClose={simpleHandleClose}
                handleTitle={handleTitle}
            //  size={size}
            >
                {productRow ?
                    <div>
                        {setProductId(productRow._id)}
                        <TextField
                            id="outlined-basic"
                            className={classes.textArea}
                            label={productRow.name}
                            onChange={(e) => setProductTitle(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label={productRow.brand}
                            onChange={(e) => setProductBrand(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label={productRow.Stock}
                            onChange={(e) => setProductStock(e.target.value)}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label={productRow.price}
                            onChange={(e) => setProductPrice(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label={productRow.comparePrice}
                            onChange={(e) => setProductComparePrice(e.target.value)}
                            variant="outlined" />

                        <TextField
                            id="outlined-multiline-static"
                            label={productRow.description}
                            multiline
                            rows={2}
                            className={classes.textArea}
                            onChange={(e) => setProductDescription(e.target.value)}
                            variant="outlined"
                        />
                        <DropdownTreeSelect data={allCategories} texts={{ placeholder: productRow.category }} onChange={onChange} keepTreeOnSearch />


                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleImageChange}
                        />

                        <div className={classes.imagePreview}>{renderPhotos(selectedFiles)}</div>
                        <div className={classes.imagePreview}>
                            {
                                productRow.productPictures.map((product, index) =>
                                    <div className={classes.imageControl}>
                                        <img className={classes.mainImage} src={generatePublicUrl(product.img)} alt="" key={index} />

                                    </div>
                                )
                            }
                        </div>

                        <label htmlFor="contained-button-file">
                            <Button variant="contained" className={classes.PublishBtn} color="primary" component="span">
                                <PublishIcon className={classes.PublishIcon} />
                                Upload
                            </Button>
                        </label></div>
                    :
                    <div>
                        <TextField
                            id="outlined-basic"
                            className={classes.textArea}
                            label="Product Title"
                            onChange={(e) => setProductTitle(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label="Brand Name"
                            onChange={(e) => setProductBrand(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label="Stock"
                            onChange={(e) => setProductStock(e.target.value)}
                            variant="outlined" />

                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label="Price"
                            onChange={(e) => setProductPrice(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label="Compare at Price"
                            onChange={(e) => setProductComparePrice(e.target.value)}
                            variant="outlined" />

                        <TextField
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows={2}
                            className={classes.textArea}
                            onChange={(e) => setProductDescription(e.target.value)}
                            variant="outlined"
                        />
                        <DropdownTreeSelect data={allCategories} texts={{ placeholder: 'Select Category' }} onChange={onChange} keepTreeOnSearch />


                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleImageChange}
                        />

                        <div className={classes.imagePreview}>{renderPhotos(selectedFiles)}</div>


                        <label htmlFor="contained-button-file">
                            <Button variant="contained" className={classes.PublishBtn} color="primary" component="span">
                                <PublishIcon className={classes.PublishIcon} />
                                Upload
                            </Button>
                        </label></div>

                }
            </Modal>


        </>
    );
}

export default AddProduct






























