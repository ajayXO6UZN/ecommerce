import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    TablePagination,
    TableFooter,
    IconButton,
} from '@material-ui/core';
import Layout from '../../components/Layout/Layout';
import { Box, Button, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import AddProduct from './components/AddProduct/AddProduct';
import useStyles from './style';
import { createProduct, getAllProduct, updateProduct, deleteProduct } from '../../actions/productAction';
import { generatePublicUrl } from '../../urlConfig';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useAlert } from "react-alert";

// let USERS = [], STATUSES = ['Active', 'Pending', 'Blocked'];
// for (let i = 0; i < 14; i++) {
//     USERS[i] = {
//         name: faker.name.findName(),
//         email: faker.internet.email(),
//         phone: faker.phone.phoneNumber(),
//         jobTitle: faker.name.jobTitle(),
//         company: faker.company.companyName(),
//         joinDate: faker.date.past().toLocaleDateString('en-US'),
//         status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
//     }
// }

function Product() {
    const alert = useAlert();

    const classes = useStyles();
    const dispatch = useDispatch();

    const category = useSelector(state => state.allCategoryList);
    // const product = useSelector((state) => state.products.products);
    const { products, error, loading } = useSelector((state) => state.products);
    const product = useSelector((state) => state.newProduct.error);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [open, setOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [productRow, setProductRow] = React.useState(false);

    const [categoryName, setCategory] = useState('');
    const [productImage, setProductImage] = useState([]);

    const [productId, setProductId] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productComparePrice, setProductComparePrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);


    useEffect(() => {
        if (product) {
            if (product.brand) {
                alert.error(product.brand);
            }
            if (product.name) {
                alert.error(product.name);
            }
            if (product.category) {
                alert.error(product.category);
            }
            if (product.description) {
                alert.error(product.description);
            }
            if (product.Stock) {
                alert.error(product.Stock);
            }
        }




        // dispatch(clearErrors());

        // dispatch(getProduct());
    }, [dispatch, product, alert]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleUpdateClickOpen = (row) => {
        //  console.log(row)
        setProductRow(row);
        setEditModalOpen(true);
    };

    const simpleHandleClose = () => {
        setEditModalOpen(false);
        setOpen(false)
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

    const handleImageChange = (e) => {
        // console.log(e.target.files[])

        if (e.target.files) {

            const allFiles = Array.from(e.target.files);
            setProductImage(allFiles);
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );

            // console.log("filesArray: ", filesArray);

            setSelectedFiles((prevImages) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };


    const handleEditClose = () => {
        // console.log(productId)
        const form = new FormData();
        form.append('_id', productId);
        form.append('name', productTitle);
        form.append('brand', productBrand);
        form.append('price', productComparePrice);
        form.append('comparePrice', productPrice);
        form.append('description', productDescription);
        form.append('Stock', productStock);
        form.append('category', categoryName);


        for (let pic of productImage) {
            form.append("productPictures", pic);
        }
        // form.append('parentId', parentCategoryId);
        // form.append('productPictures', productImage);

        dispatch(updateProduct(form));

        setCategory('');
        setProductImage('');
        setEditModalOpen(false);
    };

    //console.log(product && product.brand)
    const handleClose = () => {
        const form = new FormData();
        form.append('name', productTitle);
        form.append('brand', productBrand);
        form.append('price', productComparePrice);
        form.append('comparePrice', productPrice);
        form.append('description', productDescription);
        form.append('Stock', productStock);
        form.append('category', categoryName);


        for (let pic of productImage) {
            form.append("productPictures", pic);
        }
        // form.append('parentId', parentCategoryId);
        // form.append('productPictures', productImage);



        dispatch(createProduct(form));
        setCategory('');
        setProductImage('');
        setOpen(false);
    };



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

                </Box>

                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCell}>Product Info</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Thumbnail</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Category</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Price</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Stock</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Description</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products && products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell>

                                        <Grid container>
                                            <Grid item lg={2}>
                                                <Avatar alt={row.brand} src='.' className={classes.avatar} />
                                            </Grid>
                                            <Grid item lg={10}>
                                                <Typography className={classes.name}>{row.brand}</Typography>
                                                <Typography color="textSecondary" variant="body2">{row.name}</Typography>
                                                <Typography color="textSecondary" variant="body2">{row._id}</Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        <Box className={classes.imgStyle}>
                                            <img className={classes.innerImage} src={generatePublicUrl(row.productPictures[0].img)} />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="body2">{row.category}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="body2">{row.price}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="body2">{row.Stock}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="body2">{row.description}</Typography>
                                    </TableCell>

                                    {/* <TableCell>{row.joinDate}</TableCell> */}
                                    <TableCell>
                                        <Typography
                                            className={classes.status}
                                            style={{
                                                backgroundColor:
                                                    ((row.status === 'Active' && 'green') ||
                                                        (row.status === 'Blocked' && 'red'))
                                            }}
                                        >{row.status}</Typography>
                                    </TableCell>
                                    <TableCell >
                                        <div style={{ display: 'flex' }}>
                                            <IconButton aria-label="edit" onClick={() => handleUpdateClickOpen(row)} className={classes.margin}>
                                                <EditIcon fontSize="medium" />
                                            </IconButton>
                                            <IconButton aria-label="delete" onClick={() => {
                                                const payload = {
                                                    productId: row._id,
                                                };
                                                dispatch(deleteProduct(payload));
                                            }} className={classes.margin}>
                                                <DeleteIcon fontSize="medium" />
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={products && products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
                </TableContainer>

                <AddProduct
                    open={open}
                    handleClose={handleClose}
                    simpleHandleClose={simpleHandleClose}
                    handleTitle={'Add New Product'}
                    //size='true'
                    allCategories={categoryList}
                    productTitle={productTitle}
                    productBrand={productBrand}
                    productStock={productStock}
                    productPrice={productPrice}
                    productComparePrice={productComparePrice}
                    productDescription={productDescription}
                    setProductTitle={setProductTitle}
                    setProductBrand={setProductBrand}
                    setProductStock={setProductStock}
                    setProductPrice={setProductPrice}
                    setProductComparePrice={setProductComparePrice}
                    setProductDescription={setProductDescription}
                    handleImageChange={handleImageChange}
                    selectedFiles={selectedFiles}
                    setCategory={setCategory}
                />

                <AddProduct
                    open={editModalOpen}
                    handleClose={handleEditClose}
                    simpleHandleClose={simpleHandleClose}
                    handleTitle={'Update Product'}
                    //size='true'
                    allCategories={categoryList}
                    productTitle={productTitle}
                    productBrand={productBrand}
                    productStock={productStock}
                    productPrice={productPrice}
                    productComparePrice={productComparePrice}
                    productDescription={productDescription}
                    setProductTitle={setProductTitle}
                    setProductBrand={setProductBrand}
                    setProductStock={setProductStock}
                    setProductPrice={setProductPrice}
                    setProductComparePrice={setProductComparePrice}
                    setProductDescription={setProductDescription}
                    handleImageChange={handleImageChange}
                    selectedFiles={selectedFiles}
                    setCategory={setCategory}
                    productRow={productRow}
                    setProductId={setProductId}
                />

            </Layout>
        </>
    );
}

export default Product;





























