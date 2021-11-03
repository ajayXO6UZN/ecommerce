import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const Signup = (props) => {

     const {
        handleSubmit,
        setName,
        setEmail,
        setPassword,
        setGender,
        setPhone,
      //  setConfirmPassword,
        checkValidation
    } = props;

    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    return (
      
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
              
                <form>
                    <TextField onChange={(e) => setName(e.target.value)} fullWidth label='Name' placeholder="Enter your name" />
                    <TextField fullWidth label='Email' placeholder="Enter your email" 
                         onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup  onChange={(e) => setGender(e.target.value)} aria-label="gender" name="gender"  style={{ display: 'initial' }}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth onChange={(e) => setPhone(e.target.value)} label='Phone Number' placeholder="Enter your phone number" />
                    <TextField fullWidth label='Password' onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>
                    <TextField fullWidth onChange={(e) => checkValidation(e)} label='Confirm Password' placeholder="Confirm your password"/>
                    {/* <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    /> */}
                    <Button  onClick={handleSubmit} variant='contained' color='primary'>Sign up</Button>
               </form>
            </Paper>
        </Grid>
    )
}

export default Signup;