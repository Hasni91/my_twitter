import React, {useState,useEffect}from 'react';
import logo from "../../bleu.png";
import {Button} from 'react-bootstrap';
import {Navigate} from "react-router-dom";
import {RiHome7Line} from "react-icons/ri";
import { HiHashtag } from "react-icons/hi";
import { RiMessage3Line} from "react-icons/ri";
import { BsPerson, BsChat } from "react-icons/bs";
import { Image,Spinner} from 'react-bootstrap';
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart} from "react-icons/ai";
import {connect} from 'react-redux';
import axios from 'axios';

const User = (props)=> {
    const [home,setHome] = useState(false);
    const [explore,setExplore] = useState(false);
    const [message,setMessage] = useState(false);
    const [profile,setProfile] = useState(false);
    
    // States for navigation
    const [goHome,setGoHome] = useState(false);
    const [goProfile,setGoProfile] = useState(false);
    const [goExplore,setGoExplore] = useState(false);
    const [goMessages,setGoMessages] = useState(false);
    
    const [id,setId] = useState(parseInt(props.id));
    const [userId, setUserId] = useState(parseInt(props.Id_user));
    const [infosUser,setInfosUser] = useState([]);
    const [mytweets,setMytweets] = useState([]);
    const [pret,setPret] = useState(false);

    console.log("mytweets-->",mytweets);
    console.log("pret-->",pret);
    
    useEffect(async()=>{
        let url = 'http://localhost:3000/controller/homePage.php';
        await axios.post(url,JSON.stringify({
            req : "getUser",
            id: userId,
        }))
        .then( async function(response){
            await setInfosUser(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        
        const urlTwo = 'http://localhost:3000/controller/profil.php';
        await axios.post(urlTwo,JSON.stringify({
            req: "get_tweets",
            id: userId,
        }))
        .then(function (response){
            setMytweets(response.data);
        })
        .catch(function (error){
            console.log(error);
        })
        setPret(true);
    },[]);
    
    if(id === 0){
        return(
            <Navigate to="/"/>
            );
        }else{
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
                                if(pret == true){
                                    return (
                                        <div style={{display:'flex',flexDirection:"row"}}>
                                        {/* 1ere div */}
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
                                        style={{marginBottom:"25px",cursor:"pointer",backgroundColor:`${explore ? "rgb(15, 20, 25, 0.1)" : "white"}`,padding:"10px 0",borderRadius:"50px",textAlign:"center"}}
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
                                        
                                        {/* 2eme div */}
                                        <div style={{width:"44%",borderRight:"1px solid rgb(239, 243, 244)",marginLeft:"26%",borderLeft:"1px solid rgb(239, 243, 244)"}}>
                                        <div style={{width: "100%", height: "auto",borderRight:"1px solid rgb(239, 243, 244)",borderLeft:"1px solid rgb(239, 243, 244)"}}>
                                        <div className='transparence' style={{ backgroundColor: "white", backdropFilter: "blur(5px)", height: "50px", width: "41.10%", opacity: "0.8", position: "fixed" }}>
                                        <div className='txtprofile' style={{ marginLeft: "5%" }}>
                                        <p style={{ margin: "0px 0px", fontWeight: "bold", color: "black", marginRight: "8px" }}>{infosUser[0]["username"]}</p>
                                        <p style={{ margin: "0px 0px", fontWeight: "bold", color: "grey", marginRight: "8px" }}>{mytweets.length} tweets</p>
                                        </div>
                                        </div>
                                        <div className='gg' style={{ height: "200px", width: "auto", display: "flex" }} >
                                        
                                        {infosUser["imagecounv"] ? 
                                        <img src={infosUser["imagecounv"]} style={{ width: "100%", height: "auto" }} />
                                        : 
                                        <img src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256__340.png" style={{ width: "100%", height: "auto" }} />
                                    }
                                    </div>
                                    <div className="editprofil" style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "-65px" }}>
                                    
                                    {infosUser["imageprofil"] ? 
                                    <Image src={infosUser["imageprofil"]} style={{ border: "black 3px solid", marginLeft: "5%", backgroundColor: "black", height: "133px", width: "133px", objectFit: "cover" }} border border-dark roundedCircle ></Image>
                                    : 
                                    <img src={logo} alt="logo" style={{ border: "black 3px solid", marginLeft: "5%", backgroundColor: "black", height: "133px", width: "133px", objectFit: "cover" }} border border-dark roundedCircle />
                                }
                                <Button variant="primary" style={{ borderRadius: "100px", width: "130px", height: "50px", marginTop: "70px", marginRight: "10px" }}
                                >Suivre</Button>
                                </div>
                                
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", marginLeft: "3%" }}>
                                <p style={{ margin: "10px 0px", fontWeight: "bold", marginRight: "8px" }}>{infosUser[0]["username"]}</p>
                                <p style={{ color: "gray", marginRight: "8px" }}>@{infosUser[0]["slug"]}</p>
                                <p>{infosUser[0]["description"]}</p>
                                <div className='follow' style={{ display: "flex" }}>
                                <p style={{ paddingRight: "2%" }}> <b>0</b>Abonnement</p>
                                <p> <b>0</b> Abonnés</p>
                                </div>
                                </div>
                                
                                <hr></hr>
                                
            {mytweets.slice(0).reverse().map((res)=>(
              <div style={{width:"100%",marginTop:"15px",display:"flex",flexDirection:"row",borderBottom:"1px solid rgb(239, 243, 244)"}}>
                 <div style={{width:"13%",marginLeft:"10px"}}>
                        {infosUser["imageprofil"] ?
                            <img src={infosUser["imageprofil"]}  alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}/>
                        : 
                            <img src={logo} alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}/>
                        }
                        </div>
                        <div style={{width:"100%"}}>
                            <div style={{width:"100%",display:"flex",flexDirection:"row",marginRight:"10px"}}>
                                <p style={{margin:"0px 0px",fontWeight:"bold",marginRight:"8px"}}> {infosUser[0]["username"]} </p>
                                <p style={{color:"gray",marginRight:"8px"}}> @{infosUser[0]["slug"]} </p>
                                <p style={{color:"gray"}}> {res["date_post"]} </p>
                            </div>
                            <p>{[res["tweet"]]}</p>
                            <img src={res["image"]} style={{width:"90%",objectFit:"cover",marginBottom:"25px"}}/>
                            <div style={{margin:"0px auto",width:"80%",display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"15px"}}>
                                <BsChat
                                    style={{cursor:"pointer"}}
                                    size={20}
                                />
                                <FaRetweet
                                    style={{cursor:"pointer"}}
                                    size={20}
                                />
                                    <AiOutlineHeart
                                    size={20}
                                />
                                    {/* <AiFillHeart
                                        style={{cursor:"pointer"}}
                                        size={20}
                                        onClick={()=>test()}
                                    /> */}
                            </div>
                        </div>
                        </div>
            ))
            }
                </div>
                </div>
                                
            {/* 3eme Div */}
            <div style={{width:"35%",borderRight:"1px solid rgb(239, 243, 244)"}}>C</div>
            </div>
            );
}else{
        return(
            <div style={{width:"50px",margin:"350px auto"}}>
            <Spinner animation="border" variant="primary" />
            </div>
        )
        }
    }}
}
                        
function mapStateToProps(state){
    return {id: state.ID, Id_user : state.Id_user}
}
export default connect(mapStateToProps,null)(User);