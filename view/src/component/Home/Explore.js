import React, {useState}from 'react';
import logo from "../../bleu.png";
import {Button} from 'react-bootstrap';
import {Navigate} from "react-router-dom";
import {RiHome7Line} from "react-icons/ri";
import { HiHashtag } from "react-icons/hi";
import { RiMessage3Line} from "react-icons/ri";
import {BsPerson} from "react-icons/bs";

export default function Explore() {
    const [home,setHome] = useState(false);
    const [explore,setExplore] = useState(false);
    const [message,setMessage] = useState(false);
    const [profile,setProfile] = useState(false);

    // States for navigation
    const [goHome,setGoHome] = useState(false);
    const [goProfile,setGoProfile] = useState(false);
    const [goExplore,setGoExplore] = useState(false);
    const [goMessages,setGoMessages] = useState(false);
    
    switch(true) {
        case goHome:
        return(
            <Navigate to="/HomePage"/>
        );

        case goProfile:
        return(
            <Navigate to="/Profile"/>
        );        
        case goExplore:
        return(
            <Navigate to="/Explore"/>
        );
        
        case goMessages:
        return(
            <Navigate to="/Messages"/>
        );
        
        default:
        return (
            <div style={{display:'flex',flexDirection:"row"}}>
                {/* <div className="App"> */}
                <div style={{borderRight:"1px solid rgb(239, 243, 244)",width:"26%",display:"flex",flexDirection:"column",paddingTop:"15px",alignItems:"center",position:"fixed"}}>
                    <div>
                        <img src={logo} alt="Logo" style={{height:"40px",width: "40px",marginBottom:"15px",cursor:"pointer"}}
                        />
                        <h4 
                            style={{marginBottom:"25px",cursor:"pointer",backgroundColor:`${home ? "rgb(15, 20, 25, 0.1)" : "white"}`,padding:"10px 0",borderRadius:"50px",textAlign:"center",fontWeight:"bold"}}
                            onMouseOver={()=>setHome(true)}
                            onMouseOut={()=>setHome(false)}
                            onClick={()=>setGoHome(true)}
                        ><RiHome7Line/> Accueil</h4>
                        <h4 
                            style={{marginBottom:"25px",cursor:"pointer",backgroundColor:`${explore ? "rgb(15, 20, 25, 0.1)" : "white"}`,padding:"10px 0",borderRadius:"50px",textAlign:"center",color:"rgb(29, 155, 240)"}}
                            onMouseOver={()=>setExplore(true)}
                            onMouseOut={()=>setExplore(false)}
                            onClick={()=>setGoExplore(true)}
                            >
                            <HiHashtag/> Explorer
                        </h4>
    
                        <h4 
                            style={{marginBottom:"25px",cursor:"pointer",backgroundColor:`${message ? "rgb(15, 20, 25, 0.1)" : "white"}`,padding:"10px 0",borderRadius:"50px",textAlign:"center"}}
                            onMouseOver={()=>setMessage(true)}
                            onMouseOut={()=>setMessage(false)}
                            onClick={()=>setGoMessages(true)}
                            >
                                <RiMessage3Line/> Messages
                        </h4>
    
                        <h4 
                            style={{marginBottom:"25px",cursor:"pointer",backgroundColor:`${profile ? "rgb(15, 20, 25, 0.1)" : "white"}`,padding:"10px 0",borderRadius:"50px",textAlign:"center"}}
                            onMouseOver={()=>setProfile(true)}
                            onMouseOut={()=>setProfile(false)}
                            onClick={()=>setGoProfile(true)}
                            >
                                <BsPerson/> Profil
                        </h4>
                        
                        <Button 
                            style={{width:"100%",borderRadius:"100px",backgroundColor:"rgb(29, 155, 240)",borderColor:"rgb(29, 155, 240)",fontWeight:"bold",}}
                            >Tweet
                        </Button>
                    </div>
                </div>
                <div style={{width:"44%",borderRight:"1px solid rgb(239, 243, 244)",marginLeft:"26%"}}>Explorer</div>
                <div style={{width:"35%",borderRight:"1px solid rgb(239, 243, 244)"}}>C</div>
            </div>
        );
}}
