import React , {useState} from 'react';
import {Navigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import twitter from "../../twitter.png";
import {Button,Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '@mui/styles';
import logo from "../../bleu.png";
import logo2 from "../../blanc.png";

const Inscription = () => {
    
    const [nav,setNav] = useState(false);
    const [smShow, setSmShow] = useState(false);
    const [username,setUsername] = useState("");
    const [pseudo,setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // state Error
    const [error,setError] = useState(false);
    const [errorEmail,setErrorEmail] = useState(false);
    
    const useStyles = makeStyles({
        form: {
            border:"2px rgb(29, 155, 240) solid",
            margin:"0 auto",borderRadius:"10px",
            marginBottom:"2%",
        },
    });
    const classes = useStyles();
    
    const sendData = async ()=> {
        if( username != "" && pseudo != "" && email !="" && password !=""){
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(email)){
                    let url = 'http://localhost:3000/controller/addUser.php';
                    const response = await fetch(url,{
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type' : 'application/json'
                        },method: "POST",
                        body: JSON.stringify({
                            username : username,
                            pseudo: pseudo,
                            email: email,
                            password: password                        
                        })
                    })
                    const data = await response.json();
                    console.log(data);
                    if(data.status == "success"){
                        setNav(true);
                    }else{
                        alert("Problème coté database");
                    }
                }else{
                    setErrorEmail(true);
                    setError(false);
                }
        }else{
            setError(true);
            setErrorEmail(false);
        }
    }
    
    const close = ()=>{
        setSmShow(false);
        setError(false);
        setErrorEmail(false);
        setUsername("");
        setPseudo("");
        setEmail("");
        setPassword("");
    }
    
    
    const changePage = ()=>{
        setNav(true);
    }
    
    const modal =
    <Modal size="lg" show={smShow} onHide={() => close()} style={{marginTop:"100px"}}>
    <Modal.Header closeButton>
    <div style={{width:"900px",textAlign:"center"}}>
    <img src={logo} alt="Logo" style={{height:"40px",width: "40px",marginBottom:"20px"}}/>
    <h4 style={{fontWeight:"bold"}}>Créer votre compte</h4>
    {error ? <p style={{fontWeight:"bold",color:"red"}}>Remplis tous les champs pirate 😅</p> : null}
    {errorEmail ? <p style={{fontWeight:"bold",color:"red"}}>Format email invalide ＠❌</p> : null}
    </div>
    </Modal.Header>
    <Modal.Body style={{textAlign:"center"}}>
    <Form>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{width:"80%",margin:"0 auto"}}>
    <Form.Control className={classes.form} type="text" placeholder="Nom d'utilisateur " onChange={(e)=>setUsername(e.target.value)} value={username}/>
    <Form.Control className={classes.form} type="text" placeholder="@pseudo" onChange={(e)=>setPseudo(e.target.value)} value={pseudo}/>
    <Form.Control className={classes.form} style={{borderColor:`${errorEmail ? "red" : ""}`}} type="email" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)} value={email}/>
    <Form.Control className={classes.form} type="password" placeholder="********" onChange={(e)=>setPassword(e.target.value)} value={password}/>
    </Form.Group>
    </Form>
    <Button
    variant="outline-primary"
    style={{width:"80%",borderRadius:"100px"}}
    onClick={()=>sendData()}
    >suivant</Button>
    </Modal.Body>
    </Modal>
    
    if(nav == false){
            return(
                <div>
                <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{width:"45%",backgroundImage:`url(${twitter})`,paddingBottom:"13%",textAlign:"center",paddingTop:"13%"}}>
                {/* <GiHummingbird style={{color:"#F3F3F3",fontSize:"450px"}}/> */}
                <img src={logo2} alt="Logo" style={{width: "400px",marginBottom:"55px"}}/>
                </div>
                <div style={{paddingTop:"2%",paddingLeft:"2%"}}>
                <img src={logo} alt="Logo" style={{height:"65px",width: "65px",marginBottom:"20px"}}/>
                <h1 style={{fontFamily:"inherit",fontSize:"60px",marginBottom:"5%",fontWeight:"bold"}}>Reste branché<br></br>maintenant 🏴‍☠️</h1>
                <h2 style={{fontFamily:"inherit",fontSize:"35px",marginBottom:"20%"}}>Rejoignez Tweet<strong style={{color:"rgb(29, 155, 240)"}}>@</strong>cadémie dès aujourd'hui.</h2>
                <Button
                variant="primary"
                style={{color:"white", backgroundColor:"rgb(29, 155, 240)",width:"50%",marginBottom:"15px",borderRadius:"100px",fontWeight:"bold"}}
                onClick={()=> setSmShow(true)}
                >S'inscrire
                </Button>
                <p style={{fontSize:"11px"}}>
                En vous inscrivant, vous acceptez de <strong style={{color:"rgb(29, 155, 240)"}}>rejoindre l'équipage des pirates💀.</strong>
                </p>
                <h4 style={{paddingLeft:"150px"}}>ou</h4>
                <Button
                variant="primary"
                style={{color:"rgb(29, 155, 240)",backgroundColor:"white",width:"50%",marginTop:"2%",borderRadius:"100px",fontWeight:"bold",borderColor:"rgb(207, 217, 222)"}}
                onClick={()=> changePage()}
                >Se connecter
                </Button>
                {modal}
                </div>
                </div>
                </div>
                );
    }else{
        return(
        <Navigate to="/connection" />
        )}
}
            
export default Inscription;
