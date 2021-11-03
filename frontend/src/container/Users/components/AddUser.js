import React, { useState, useEffect } from 'react';
import Modal from '../../../components/UI/Modal/Modal';
import { Button, Checkbox, TextField } from '@material-ui/core';
import 'react-dropdown-tree-select/dist/styles.css'
import PublishIcon from '@material-ui/icons/Publish';
import { generatePublicUrl } from '../../../urlConfig';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useStyles from '../style';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const AddUser = (props) => {

    const classes = useStyles();

    const {
        open,
        handleClose,
        handleUserImageChange,
        handleTitle,
        selectedFiles,
        simpleHandleClose,
        setUserName,
        setUserEmail,
        setUserPass,
        setGender,
        setUserPhone,
        setUserStatus,
        setSelectRole,
        userRole,
        userImage,
        setEmailChecked,
        emailChecked,
        userRow,
        setUserId,
        userStatus,
        userGender
    } = props;

    const [selectOpen, setSelectOpen] = React.useState(false);

    const handleSelectClose = () => {
        setSelectOpen(false);
    };

    const handleSelectOpen = () => {
        setSelectOpen(true);
    };

    const handleSelectChange = (event) => {
        setSelectRole(event.target.value);
    };


    const renderPhotos = (source) => {
        console.log("source: ", source);
        return source.map((photo) => {
            return <div className={classes.imageControl}>
                <img className={classes.mainImage} src={photo} alt="" key={photo} />
            </div>;
        });
    };

    const handleCheckedChange = (event) => {
        setEmailChecked(event.target.checked);
    };
    console.log(userRow && userRow.gender)
    return (
        <>
            <Modal
                open={open}
                handleClose={handleClose}
                simpleHandleClose={simpleHandleClose}
                handleTitle={handleTitle}
            //  size={size}
            >
                {userRow ?
                    <div>
                        {setUserId(userRow._id)}
                        <TextField
                            id="outlined-basic"
                            className={classes.textArea}
                            label='Username'
                            placeholder={userRow.name}
                            onChange={(e) => setUserName(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.textArea}
                            placeholder={userRow.email}
                            label="Email"
                            onChange={(e) => setUserEmail(e.target.value)}
                            variant="outlined" />
                        {/* <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label={userRow.password}
                            onChange={(e) => setUserPass(e.target.value)}
                            variant="outlined" /> */}

                        <FormControl component="fieldset" >
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup value={userGender ? userGender : userRow.gender} onChange={(e) => setGender(e.target.value)} aria-label="gender" name="gender" style={{ display: 'initial' }}>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            id="outlined-basic"
                            className={classes.textArea}
                            label='Phone Number'
                            placeholder={userRow.phone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            variant="outlined" />


                        <FormControl className={classes.selectArea} >
                            <InputLabel id="demo-controlled-open-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={selectOpen}
                                onClose={handleSelectClose}
                                onOpen={handleSelectOpen}
                                value={userRole ? userRole : userRow.role}
                                onChange={handleSelectChange}
                            >
                                {/* <MenuItem value="">
                                <em>None</em>
                            </MenuItem> */}
                                <MenuItem value={'admin'}>Admin</MenuItem>
                                <MenuItem value={'editor'}>Editor</MenuItem>
                                <MenuItem value={'author'}>Author</MenuItem>
                                <MenuItem value={'contributor'}>contributor</MenuItem>
                                <MenuItem value={'user'}>User</MenuItem>
                            </Select>
                        </FormControl>


                        <FormControl component="fieldset" >
                            <FormLabel component="legend">Status</FormLabel>
                            <RadioGroup value={userStatus ? userStatus : userRow.status} onChange={(e) => setUserStatus(e.target.value)} aria-label="status" name="status" style={{ display: 'initial' }}>
                                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                                <FormControlLabel value="Blocked" control={<Radio />} label="Blocked" />
                            </RadioGroup>
                        </FormControl>

                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleUserImageChange}
                        />

                        <div className={classes.imagePreview}>{renderPhotos(selectedFiles)}</div>
                        <div className={classes.imagePreview}>
                            {
                                userRow.userImage.map((user, index) =>
                                    <div className={classes.imageControl}>
                                        <img className={classes.mainImage} src={generatePublicUrl(user.img)} alt="" key={index} />

                                    </div>
                                )
                            }
                        </div>
                        {/* <FormControlLabel className={classes.textArea}
                            control={<Checkbox name="checkedA"
                                onChange={handleCheckedChange}
                                checked={emailChecked}
                            />}
                            label="I accept the terms and conditions."
                        /> */}
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
                            label="Username"
                            onChange={(e) => setUserName(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label="Email"
                            onChange={(e) => setUserEmail(e.target.value)}
                            variant="outlined" />
                        <TextField
                            id="outlined-basic"
                            className={classes.inputSize}
                            label='password'
                            onChange={(e) => setUserPass(e.target.value)}
                            variant="outlined" />

                        <FormControl component="fieldset" >
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup onChange={(e) => setGender(e.target.value)} aria-label="gender" name="gender" style={{ display: 'initial' }}>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            id="outlined-basic"
                            className={classes.textArea}
                            label='Phone Number'
                            onChange={(e) => setUserPhone(e.target.value)}
                            variant="outlined" />


                        <FormControl className={classes.selectArea} >
                            <InputLabel id="demo-controlled-open-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={selectOpen}
                                onClose={handleSelectClose}
                                onOpen={handleSelectOpen}
                                value={userRole}
                                onChange={handleSelectChange}
                            >
                                {/* <MenuItem value="">
                                    <em>None</em>
                                </MenuItem> */}
                                <MenuItem value={'admin'}>Admin</MenuItem>
                                <MenuItem value={'editor'}>Editor</MenuItem>
                                <MenuItem value={'author'}>Author</MenuItem>
                                <MenuItem value={'contributor'}>contributor</MenuItem>
                                <MenuItem value={'user'}>User</MenuItem>
                            </Select>
                        </FormControl>


                        <FormControl component="fieldset" >
                            <FormLabel component="legend">Status</FormLabel>
                            <RadioGroup onChange={(e) => setUserStatus(e.target.value)} aria-label="status" name="status" style={{ display: 'initial' }}>
                                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                                <FormControlLabel value="Blocked" control={<Radio />} label="Blocked" />
                            </RadioGroup>
                        </FormControl>

                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleUserImageChange}
                        />

                        <div className={classes.imagePreview}>{renderPhotos(selectedFiles)}</div>

                        <FormControlLabel className={classes.textArea}
                            control={<Checkbox name="checkedA"
                                onChange={handleCheckedChange}
                                checked={emailChecked}
                            />}
                            label="I accept the terms and conditions."
                        />
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

export default AddUser


