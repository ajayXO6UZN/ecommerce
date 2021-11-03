import faker from 'faker';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    Typography,
    TablePagination,
    TableFooter,
    Box, Button, IconButton,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Layout from '../../components/Layout/Layout';
import useStyles from './style';
import AddUser from './components/AddUser';
import { register, updateUser } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import { generatePublicUrl } from '../../urlConfig';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



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

function Users() {
    const classes = useStyles();
    const alert = useAlert();

    const dispatch = useDispatch();

    const userError = useSelector((state) => state.user.error);
    const { users, error, loading } = useSelector((state) => state.allUsers);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [open, setOpen] = React.useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userGender, setGender] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [userRole, setSelectRole] = useState('');
    const [userImage, setUserImage] = useState([]);
    const [emailChecked, setEmailChecked] = React.useState(false);
    const [userImageChange, setUserImageChange] = React.useState(false);


    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [userRow, setUserRow] = React.useState(false);
    const [userId, setUserId] = React.useState(false);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    console.log(userName)

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (userError) {
            if (userError.name) {
                alert.error(userError.name);
            }
            if (userError.email) {
                alert.error(userError.email);
            }
            if (userError.gender) {
                alert.error(userError.gender);
            }
            if (userError.password) {
                alert.error(userError.password);
            }

            if (typeof userError === 'string') {
                alert.error(userError);
            }
        }
        if (error) {
            alert.error(error);
        }
        // dispatch(clearErrors());

    }, [dispatch, userError, alert]);



    const handleClose = () => {

        const form = new FormData();
        form.append('name', userName);
        form.append('email', userEmail);
        form.append('password', userPass);
        form.append('gender', userGender);
        form.append('phone', userPhone);
        form.append('role', userRole);
        form.append('status', userStatus);
        form.append('checked', emailChecked);

        for (let pic of userImage) {

            form.append("userImage", pic);
        }

        dispatch(register(form));
        setOpen(false);
    };

    const handleEditClose = () => {
        console.log(userName)
        const form = new FormData();
        form.append('_id', userId);
        form.append('name', userName);
        form.append('email', userEmail);
        form.append('password', userPass);
        form.append('gender', userGender);
        form.append('phone', userPhone);
        form.append('role', userRole);
        form.append('status', userStatus);
        form.append('checked', emailChecked);
        form.append('change', userImageChange);
        
        for (let pic of userImage) {

            form.append("userImage", pic);
        }

        dispatch(updateUser(form));
        setUserImage('');
        setEditModalOpen(false);
    };


    const simpleHandleClose = () => {
        setEditModalOpen(false);
        setOpen(false)
    }

    const handleUserImageChange = (e) => {
        // console.log(e.target.files[])

        if (e.target.files) {
            setUserImageChange('change');
            const allFiles = Array.from(e.target.files);
            setUserImage(allFiles);
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
   
    const handleUpdateClickOpen = (row) => {
        console.log(row)
        setUserRow(row);
        setUserName(row.name);
        setUserEmail(row.email);
        setGender(row.gender);
        setUserPhone(row.phone);
        setUserStatus(row.status);
        setSelectRole(row.role);
       // setUserImage(row.userImage);

        setEditModalOpen(true);
    };

    return (
        <>
            <Layout>

                <Box display="flex" p={1} flexWrap='wrap'>
                    <Box p={1} flexGrow={1} >
                        <Typography variant="h4" component="div">User Details</Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleClickOpen}
                        className={classes.addUser}
                        startIcon={<AddCircleIcon />}
                    >
                        Add
                    </Button>

                </Box>

                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeaderCell}>User Info</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Thumbnail</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Role</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Joining Date</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                                <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (

                                <TableRow key={row.name}>
                                    <TableCell>
                                        <Grid container>
                                            <Grid item lg={2}>
                                                <Avatar alt={row.name} src='.' className={classes.avatar} />
                                            </Grid>
                                            <Grid item lg={10}>
                                                <Typography className={classes.name}>{row.name}</Typography>
                                                <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                                                <Typography color="textSecondary" variant="body2">{row.phone}</Typography>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                    <TableCell>
                                        <Box className={classes.imgStyle}>
                                            <img className={classes.innerImage} src={generatePublicUrl(row.userImage[0] && row.userImage[0].img)} />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="primary" variant="subtitle2">{row.role}</Typography>
                                        {/* <Typography color="textSecondary" variant="body2">{row.company}</Typography> */}
                                    </TableCell>
                                    <TableCell>{'2/31/2020'}</TableCell>
                                    <TableCell>
                                        <Typography
                                            className={classes.status}
                                            style={{
                                                backgroundColor:
                                                    ((row.status === 'Active' && 'green') ||
                                                        (row.status === 'Pending' && 'blue') ||
                                                        (row.status === 'Blocked' && 'orange'))

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
                                                //  dispatch(deleteProduct(payload));
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
                                count={users && users.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
                </TableContainer>
                <AddUser
                    open={open}
                    handleClose={handleClose}
                    handleTitle={'Add New User'}
                    handleUserImageChange={handleUserImageChange}

                    selectedFiles={selectedFiles}
                    simpleHandleClose={simpleHandleClose}
                    setUserName={setUserName}
                    setUserEmail={setUserEmail}
                    setUserPass={setUserPass}
                    setGender={setGender}
                    setUserPhone={setUserPhone}
                    setUserStatus={setUserStatus}
                    setSelectRole={setSelectRole}
                    userRole={userRole}
                    userImage={userImage}
                    setEmailChecked={setEmailChecked}
                    emailChecked={emailChecked}
                />
                <AddUser
                    open={editModalOpen}
                    handleClose={handleEditClose}
                    handleTitle={'Update User detail'}
                    handleUserImageChange={handleUserImageChange}
                    userRow={userRow}
                    selectedFiles={selectedFiles}
                    simpleHandleClose={simpleHandleClose}
                    setUserName={setUserName}
                    setUserEmail={setUserEmail}
                    setUserPass={setUserPass}
                    setGender={setGender}
                    setUserPhone={setUserPhone}
                    setUserStatus={setUserStatus}
                    setSelectRole={setSelectRole}
                    userRole={userRole}
                    userImage={userImage}
                    setEmailChecked={setEmailChecked}
                    emailChecked={emailChecked}
                    setUserId={setUserId}
                    userStatus={userStatus}
                    userGender={userGender}
                />
            </Layout>
        </>
    );
}

export default Users;