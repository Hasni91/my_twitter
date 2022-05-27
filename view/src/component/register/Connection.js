import React, {useState}from 'react';
import {Navigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {Button,Form} from 'react-bootstrap';
import { makeStyles } from '@mui/styles';
import {connect} from 'react-redux';

import luffy from "../../luffy.PNG";
import logo from "../../bleu.png";

function Connection(props){
    
    const useStyles = makeStyles({
        form: {
            border:"2px rgb(29, 155, 240) solid",
            margin:"0 auto",borderRadius:"10px",
            marginBottom:"2%",
        },
    });
    const classes = useStyles();
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [smShow, setSmShow] = useState(true);
    const [mdp,setMdp] = useState(false);
    const [goHome,setgoHome] = useState(false);
    const [error,setError] = useState(false);
    const [errorEmail,setErrorEmail] = useState(false);
    const directionHome = async ()=>{
        if(email != "" && password !=""){
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(email)){
                let url = 'http://localhost:3000/controller/connection.php';
                const response = await fetch(url,{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password                        
                    })
                });
                const data = await response.json();
                console.log("here"+data.id);
                if(data.status == "success"){
                    console.log(typeof(data.id));
                    props.sendToRedux(data.id);
                    setgoHome(true);
                }else{
                    alert("faut s'inscrire");
                }
            }else{
                setError(false);
                setErrorEmail(true);
            }
        }else{
            setError(true);
        }
    }
    if(smShow == true){
        if(mdp == false){
            if(goHome == false){
                
                return(
                    <div>
                    <Modal size="lg" show={smShow} style={{marginTop:"100px"}} onHide={() => setSmShow(false)} >
                    <Modal.Header closeButton>
                    <div style={{width:"900px",textAlign:"center"}}>
                    <img src={logo} alt="Logo" style={{height:"40px",width: "40px",marginBottom:"20px"}}/>
                    <h4 style={{fontWeight:"bold"}}>Monte à bord<img src={luffy} alt="Logo" style={{height:"40px",width: "40px"}}/></h4>
                    {error ? <p style={{fontWeight:"bold",color:"red"}}>Remplis tous les champs pirate 😅</p> : null}
                    {errorEmail ? <p style={{fontWeight:"bold",color:"red"}}>Format email invalide ＠❌</p> : null}
                    </div>
                    </Modal.Header>
                    <Modal.Body style={{textAlign:"center"}}>
                    <Form style={{marginBottom:"5%"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{width:"80%",margin:"0 auto"}}>
                    <Form.Control 
                    style={{borderColor:`${errorEmail ? "red" : ""}`}}
                    className={classes.form} 
                    type="email" placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    />
                    <Form.Control 
                    className={classes.form} 
                    type="password" 
                    placeholder="*************"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    />
                    </Form.Group>
                    </Form>
                    <Button 
                    variant="dark" 
                    style={{width:"80%",borderRadius:"100px",marginBottom:"2%"}}
                    onClick = {()=> directionHome()}
                    >Se connecter</Button>
                    <Button 
                    variant="outline-secondary" 
                    style={{width:"80%",borderRadius:"100px",marginBottom:"2%",color:"black"}}
                    onClick={()=> setMdp(true)}
                    >Mot de passe oublié ?
                    </Button>
                    <p style={{color:"rgb(83, 100, 113)",fontFamily:"inherit",marginTop:"5%"}}>Vous n'avez pas de compte ? 
                    <strong style={{color:"rgb(29, 155, 240)",cursor:"pointer"}}
                    onClick={()=> setSmShow(false)}
                    > Inscrivez-vous</strong>
                    </p>
                    </Modal.Body>
                    </Modal>
                    </div>
                    );
                }else{
                    return(
                        <Navigate to="/HomePage" />
                        );
                    }
                }else{
                    return(
                        <Navigate to="/Password" />
                        );
                    }
    }else{
        return(
            <Navigate to="/" />
            );
    }
}
function mapDispatchToProps(dispatch){
    return{
        sendToRedux : function(id){
            dispatch({type:"id",getId:id})
        }
    }
}
export default connect(null,mapDispatchToProps)(Connection);