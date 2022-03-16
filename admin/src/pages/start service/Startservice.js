import React,{useState,useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import SendIcon from '@material-ui/icons/Send';
import LoadingButton from '@material-ui/core/Button';
import {useParams } from 'react-router';
import "./Startservice.css"
import axios from'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '400px',
      },
    },
  }));

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
export default function Startservice(){

    const {id}=useParams();

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const [cname,setcname] =useState('');
    const [cnic,setcnic] =useState('');
    const [cemail,setcemail] =useState('');
    const [vnumber,setvnumber] =useState('');
    const [stype,setstype] =useState('');
    const [ename,setename] =useState('');
    
    const classes = useStyles();

    React.useEffect(() => {
        let active = true;
    
        if (!loading) {
          return undefined;
        }
    
        (async () => {
          await sleep(1e3); 
    
          if (active) {
          fetch("http://localhost:8070/service/")
          .then((response)=> response.json())
          .then((data)=>{
            setOptions(data);
              })
          }
        })();
    
        return () => {
          active = false;
        };
      }, [loading]);
    
      React.useEffect(() => {
        if (!open) {
          setOptions([]);
        }
      }, [open]);

      useEffect(()=>{
        getUsers();
      },[])

      function getUsers(){
        // useEffect(()=>{
        let mounted = true;
        fetch(`http://localhost:8070/service/inprogress/${id}`)
        .then(res=> res.json())
        .then((result)=>{
          if(mounted){
            setcname(result.name)
            setcnic(result.nic)
            setcemail(result.cemail)
            setvnumber(result.vnumber)
            setstype(result.stype)
          }
        })
         return () => mounted = false;
      }

      const submithandler =(event)=>{
        event.preventDefault();
      
        const data ={cname,cnic,cemail,vnumber,stype,ename}
        axios.post(`http://localhost:8070/service/inprogress/add`,data)
      .then(res=>{
        alert("Employee added Successfully");
        axios.delete(`http://localhost:8070/service/pending/delete/${id}`)
        .then(res=>{
          alert("tata");
        })
      })
      .catch(err=>{
        alert("Database Error");
      })

      // axios.delete(`http://localhost:8070/service/pending/delete/${id}`)
      // .then(res=>{
      //   alert("Pending Service Delete Successfully");
      // })
      // .catch(err=>{
      //   alert("Database Error");
      // })

      }
    return(
        <div className="home">
            <h1 className="heading">Assign Employee</h1>
            <form className={classes.root} autoComplete="off">
            <TextField id="Customer Name" name="cname" value={cname} label="Customer Name" InputProps={{readOnly: true,}} variant="outlined"/>
            <TextField id="Customer NIC" name="cnic" value={cnic} label="Customer NIC" InputProps={{readOnly: true,}} variant="outlined"/>
            <TextField id="Customer Email" name="cemail" value={cemail} label="Customer Email" InputProps={{readOnly: true,}} variant="outlined"/>
            <TextField id="Vehicle Number" name="cnumber" value={vnumber} label="Vehicle Number" InputProps={{readOnly: true,}} variant="outlined"/>
            <div className="feild">
            <Autocomplete open={open} onOpen={() => {setOpen(true); }} onClose={() => {setOpen(false);}} getOptionLabel={(option) => option.name} onChange={(e,value) => {setename(value.name);} } 
                options={options} loading={loading}
                renderInput={(params) => (
                    <TextField {...params}  label="Enter the Employee Name" value={ename} variant="outlined" name="fname"
                    InputProps={{...params.InputProps,endAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                        ),
                    }}
                    />
                )}
                />
                <TextField id="Service Type" name="stype" value={stype} label="Service Type" InputProps={{readOnly: true,}} variant="outlined"/>
                </div>
                <div className="addbtn">
                    <LoadingButton onClick={submithandler} color="primary" endIcon={<SendIcon />} variant="contained">Start Service</LoadingButton>
                </div>
            </form>
        </div>
    )
}