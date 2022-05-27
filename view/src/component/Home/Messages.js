import React, { useState } from 'react';
import logo from "../../bleu.png";
import { Button, Form } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { RiHome7Line } from "react-icons/ri";
import { FiHash } from "react-icons/fi";
import { RiMessage3Fill } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { BiMessageAdd } from "react-icons/bi";
import Image from 'react-bootstrap/Image';
import { AiOutlineSend } from "react-icons/ai";
import { GoFileMedia } from "react-icons/go";
import { AiOutlineFileGif } from "react-icons/ai";
import {connect} from 'react-redux';


const Messages = (props)=> {
    const [home, setHome] = useState(false);
    const [explore, setExplore] = useState(false);
    const [message, setMessage] = useState(false);
    const [profile, setProfile] = useState(false);
    const [out, setOut] = useState(false);
    const [mams, setMams] = useState(false);
    const [newTab, setNewTab] = useState([]);
    
    // States for navigation
    const [goHome, setGoHome] = useState(false);
    const [goProfile, setGoProfile] = useState(false);
    const [goExplore, setGoExplore] = useState(false);
    //   const classes = useStyles();
    const [id,setId] = useState(props.id)
    
    const GoOut = ()=>{
        setId(0);
    }

    switch (true) {

        case goHome:
            return (
                <Navigate to="/HomePage" />
            );

        case goProfile:
            return (
                <Navigate to="/Profile" />
            );
        case goExplore:
            return (
                <Navigate to="/Explore" />
            );
        default:
        if(id === 0){
            return(
              <Navigate to="/"/>
          )}
            return (
                <div style={{ display: 'flex', flexDirection: "row" }}>
                    {/* <div className="App"> */}
                    <div style={{ borderRight: "1px solid rgb(239, 243, 244)", width: "26%", display: "flex", flexDirection: "column", paddingTop: "15px", alignItems: "center", position: "fixed" }}>
                        <div>
                            <img src={logo} alt="Logo" style={{ height: "40px", width: "40px", marginBottom: "15px", cursor: "pointer" }}
                            />
                            <h4
                                style={{ marginBottom: "25px", cursor: "pointer", backgroundColor: `${home ? "rgb(15, 20, 25, 0.1)" : "white"}`, padding: "10px 0", borderRadius: "50px", textAlign: "center", fontWeight: "bold" }}
                                onMouseOver={() => setHome(true)}
                                onMouseOut={() => setHome(false)}
                                onClick={() => setGoHome(true)}
                            ><RiHome7Line /> Accueil</h4>
                            <h4
                                style={{ marginBottom: "25px", cursor: "pointer", backgroundColor: `${explore ? "rgb(15, 20, 25, 0.1)" : "white"}`, padding: "10px 0", borderRadius: "50px", textAlign: "center" }}
                                onMouseOver={() => setExplore(true)}
                                onMouseOut={() => setExplore(false)}
                                onClick={() => setGoExplore(true)}
                            >
                                <FiHash /> Explorer
                            </h4>

                            <h4
                                style={{ marginBottom: "25px", cursor: "pointer", backgroundColor: `${message ? "rgb(15, 20, 25, 0.1)" : "white"}`, padding: "10px 0", borderRadius: "50px", textAlign: "center", color: "rgb(29, 155, 240)" }}
                                onMouseOver={() => setMessage(true)}
                                onMouseOut={() => setMessage(false)}
                            >
                                <RiMessage3Fill /> Messages
                            </h4>

                            <h4
                                style={{ marginBottom: "25px", cursor: "pointer", backgroundColor: `${profile ? "rgb(15, 20, 25, 0.1)" : "white"}`, padding: "10px 0", borderRadius: "50px", textAlign: "center" }}
                                onMouseOver={() => setProfile(true)}
                                onMouseOut={() => setProfile(false)}
                                onClick={() => setGoProfile(true)}
                            >
                                <BsPerson /> Profil
                            </h4>

                            <h4
                                style={{ marginBottom: "25px", cursor: "pointer", backgroundColor: `${out ? "rgb(15, 20, 25, 0.1)" : "white"}`, padding: "10px 0", borderRadius: "50px", textAlign: "center" }}
                                onMouseOver={() => setOut(true)}
                                onMouseOut={() => setOut(false)}
                                onClick={()=>GoOut()}
                            >
                                <GoSignOut /> Deco
                            </h4>
                            <Button
                                style={{ width: "100%", borderRadius: "100px", backgroundColor: "rgb(29, 155, 240)", borderColor: "rgb(29, 155, 240)", fontWeight: "bold", }}
                            >Tweet
                            </Button>
                        </div>
                    </div>

                    {/* 2eme div */}

                    <div style={{ width: "44%", borderRight: "1px solid rgb(239, 243, 244)", marginLeft: "26%" }}>

                        <div style={{ fontWeight: "bold", fontSize: "25px", marginLeft: "15px", marginTop: "15px", width: "auto", display: "flex" }}>
                            Messages
                            <div style={{ marginLeft: "500px" }}>
                                <FiSettings style={{ marginRight: "20px" }} />
                                <BiMessageAdd />
                            </div>
                        </div>
                        <Form.Control style={{ marginTop: "15px", borderRadius: "50px" }}
                            type="text"
                            placeholder="Rechercher des personnes et des groupes"
                        />
                        <hr></hr>
                        <div style={{ fontWeight: "bold", fontSize: "25px", marginLeft: "15px" }}>
                            Toutes les conversations
                        </div>
                        {/* conversations */}
                        <div className='nn' style={{ display: "flex", width: "100%", cursor: "pointer", marginTop: "15px", paddingTop: "5px" }}>
                            <Image src="https://media.melty.fr/article-4688843-ratio15_720-f6/media.jpg" style={{ border: "black 3px solid", marginLeft: "5%", backgroundColor: "black", height: "48px", width: "48px", objectFit: "cover" }} border border-dark roundedCircle ></Image>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ width: "100%", display: "flex", marginLeft: "3%" }}>
                                    <p style={{ margin: "0px 0px", fontWeight: "bold", marginRight: "8px" }}>Zoro69</p>
                                    <p style={{ color: "gray", marginRight: "8px" }}>@Zz_Le_Vrai</p>
                                </div>
                                <div style={{ marginTop: "-15px" }}>
                                    <p style={{ color: "gray", marginRight: "8px", }}>Mams: Bonjour les gars</p>
                                </div>
                            </div>


                        </div>
                        {/* conversations */}
                        <div onClick={() => setMams(true)} style={{ display: "flex", width: "100%", cursor: "pointer", marginTop: "15px", paddingTop: "5px" }}>
                            <Image src="https://media.melty.fr/article-4688843-ratio15_720-f6/media.jpg" style={{ border: "black 3px solid", marginLeft: "5%", backgroundColor: "black", height: "48px", width: "48px", objectFit: "cover" }} border border-dark roundedCircle ></Image>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <div style={{ width: "100%", display: "flex", marginLeft: "3%" }}>
                                    <p style={{ margin: "0px 0px", fontWeight: "bold", marginRight: "8px" }}>Zoro69</p>
                                    <p style={{ color: "gray", marginRight: "8px" }}>@Zz_Le_Vrai</p>
                                </div>
                                <div style={{ marginTop: "-15px" }}>
                                    <p style={{ color: "gray", marginRight: "8px", }}>Mams: Bonjour les gars</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 3eme div */}

                    <div style={{ width: "35%", height: "auto", }}>
                        {mams ?
                            <div>

                                <div className='transparence' style={{ backgroundColor: "white", backdropFilter: "blur(5px)", height: "50px", width: "41.10%", opacity: "0.8" }}>
                                    <div style={{ display: "flex" }}>
                                        {<Image src="https://media.melty.fr/article-4688843-ratio15_720-f6/media.jpg" style={{ border: "black 3px solid", marginLeft: "20px", marginTop: "20px", backgroundColor: "black", height: "20px", width: "20px", objectFit: "cover" }} border border-dark roundedCircle ></Image>}
                                        <div style={{ width: "100%", display: "flex", marginLeft: "15px", flexDirection: "column" }}>
                                            <p style={{ margin: "0px 0px", fontWeight: "bold", marginRight: "8px", fontSize: "20px" }}>Zoro69</p>
                                            <p style={{ color: "gray", marginRight: "8px", fontSize: "12px" }}>@Zz_Le_Vrai</p>
                                        </div>
                                    </div>
                                </div>


                                {/* bloc affichage des messages */}
                                <div>

                                </div>
                                {/* bloc input du bas  */}
                                <hr style={{}}></hr>
                                <div style={{ display: "flex", alignItems: "center",marginTop:"500px", marginBottom:"25px" }}>
                                    <GoFileMedia style={{ fontSize: "20px", marginTop: "15px", marginLeft: "10px" }} />
                                    <AiOutlineFileGif style={{ fontSize: "20px", marginTop: "15px", marginLeft: "10px" }} />
                                    <Form.Control style={{ marginTop: "15px", borderRadius: "50px", width: "80%", marginLeft: "10px" }}
                                        type="text"
                                        placeholder="Demarrer un nouveau message"
                                    />
                                    <AiOutlineSend type='submit' style={{ fontSize: "20px", marginTop: "15px", marginLeft: "10px" }} />
                                </div>

                            </div>
                            : null}


                    </div>
                </div>
            );
    }
}
function mapStateToProps(state){
  return {id: state.ID}
}
export default connect(mapStateToProps,null)(Messages);