import Stack from '@mui/material/Stack';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { InputBaseComponentProps } from '@mui/material';
import { useRef } from 'react';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Home from './home-system'

import systemStore from '../../data/system';
import managerStore from '../../data/manager';
import { observer } from 'mobx-react';
import UserStore from '../../data/user';

function FormDialog() {
    
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    
    const _auth= getAuth();
    const [user,loading,error]=useAuthState(_auth);
    // const [manager, setManager]= React.useState("");

    const isManager=async ()=>{
      if(user?.uid){
        const userCome= UserStore.getById(user?.uid); 
        const _id=(await userCome)._id;
        if(_id)  return _id;
     }
    }

    const inputSubject              =useRef<HTMLInputElement>();
    const inputName                 =useRef<HTMLInputElement>();
    const inputUrlImage              =useRef<HTMLInputElement>();
    // const inputAdmin_id             =useRef<HTMLInputElement>();
    const inputDescription          =useRef<HTMLInputElement>();
    const inputCommunicationDetails =useRef<HTMLInputElement>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addSystem= async()=>{
            const dataSystem={
                subject:inputSubject.current?.value,
                urlName:inputName.current?.value,              
                urlImage:inputUrlImage.current?.value  ,          
                manager_id:await isManager(),          
                description:inputDescription.current?.value ,        
                communicationDetails:inputCommunicationDetails.current?.value,}
            console.log(dataSystem)
        try {     
            const sss= await systemStore.addNewSystem(dataSystem);
            // console.log(`_id: ${sss._id},manager_id: ${sss.manager_id}`);
            const systemAdd= await systemStore.getAllSystemFromServer();
            const ssAdd=systemAdd[systemAdd.length-1];
            const newManager={
                user_id:ssAdd.manager_id,
                // String(sss?.manager_id)
                system_id:ssAdd._id,
                active:true,
                display_name:ssAdd.subject ,
                role: "MANAGER",
            }
            const mmm= await managerStore.createManager(newManager);
            console.log(mmm);
            alert(`add ${sss} successfully`);
            
            } 
        
        catch (error) { console.log(error); }
    
        finally{setOpen(false);}
        
    }   


    return (
        <div>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={() => { handleClickOpen() }}>Click to Add system </Button>
            </Stack>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new system</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        please enter your system details here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' },}}
                        noValidate
                        autoComplete="off">
                        
                        <div>
                            <TextField inputRef={inputSubject}             label="enter Subject system"               placeholder="Subject system"                variant="standard" />
                            <TextField inputRef={inputName }            label="enter Name system"             placeholder="Name system "             variant="standard" />
                            <TextField inputRef={inputUrlImage}            label="enter UrlImage "            placeholder="UrlImage system"             variant="standard" />
                            {/* <TextField inputRef={inputAdmin_id}     label="Admin_id"  placeholder=" Admin_id"  variant="standard" /> */}
                            <TextField inputRef={inputDescription}         label="enter Description system"         placeholder="Description system"          variant="standard" />
                            <TextField inputRef={inputCommunicationDetails}label="enter CommunicationDetails "placeholder="CommunicationDetails system" variant="standard" />
                        {/* כשלוחצים על הוספת סיסטם=
                         נוסף סיסטם וגם נוצר מנג'ר דש שמכיל פרטי יוזר מחובר ופרטי הסיסטם */}
                        </div>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addSystem}>enter to add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default observer(FormDialog);
