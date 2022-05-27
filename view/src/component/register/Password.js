import React, {useState}from 'react';
import {Navigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { GiHummingbird } from "react-icons/gi";
import {Button,Form} from 'react-bootstrap';
import { makeStyles } from '@mui/styles';

export default function Password(){

    const [smShow, setSmShow] = useState(true);
    const [email,setEmail] = useState("");
    const [change,setChange] = useState(false);

    const useStyles = makeStyles({
        form: {
            border:"2px rgb(29, 155, 240) solid",
            margin:"0 auto",borderRadius:"10px",
            marginBottom:"2%",
        },
    });
    const classes = useStyles();
    
    const verifectEmail = ()=>{
        if(email != ''){
            setChange(true);
        }
    }

    if(smShow === true){
        return (
            <div>
            <Modal size="lg" show={true} style={{marginTop:"100px"}} onHide={() => setSmShow(false)}>
                <Modal.Header closeButton>
                    <div style={{width:"900px",textAlign:"center"}}>
                        <GiHummingbird style={{color:"rgb(29, 155, 240)",fontSize:"40px",marginBottom:"2%"}}/>
                        <h4 style={{fontWeight:"bold"}}>Réinitialiser mon mot de passe</h4>
                    </div>
                </Modal.Header>
            <Modal.Body style={{textAlign:"center"}}>
                <Form style={{marginBottom:"5%"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{width:"80%",margin:"0 auto"}}>
                        <Form.Control className={classes.form} type="email" placeholder="Entrez votre email"
                        onChange={(e)=> setEmail(e.target.value)}
                        value={email}
                        />
                    </Form.Group>
                </Form>
                <Button 
                    variant="dark" 
                    style={{width:"80%",borderRadius:"100px",marginBottom:"2%"}}
                    onClick={()=>verifectEmail()}
                    >Chercher
                </Button>
            </Modal.Body>
        </Modal>
        </div>
        );
    }else{
        return(
            <Navigate to="/" />
        );
    }
}