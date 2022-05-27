import React, {useState,useRef,useEffect}from 'react';
import logo from "../../bleu.png";
import {Button,Spinner} from 'react-bootstrap';
import {Navigate} from "react-router-dom";
import { RiHome7Fill} from "react-icons/ri";
import { FiHash } from "react-icons/fi";
import { RiMessage3Line} from "react-icons/ri";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { BsPerson, BsChat,BsImage} from "react-icons/bs";
import { AiOutlineHeart} from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import {Modal,CloseButton} from 'react-bootstrap';
import {BiSearchAlt} from "react-icons/bi";
import {GoSignOut} from "react-icons/go";
import axios from 'axios';
import {connect} from 'react-redux';

function HomePage(props){

    const [home,setHome] = useState(false);
    const [explore,setExplore] = useState(false);
    const [message,setMessage] = useState(false);
    const [profile,setProfile] = useState(false);
    const [profileTwo,setProfileTwo] = useState(false);
    const [out,setOut] = useState(false);
    const [tweet,setTweet] = useState("");
    const [colorTweet,setColorTweet] = useState(false);
    const [loopColor,setLoopColor] = useState(false);
    const [newTab,setNewTab] = useState([]);
    
    // States for navigation
    const [goProfile,setGoProfile] = useState(false);
    const [goExplore,setGoExplore] = useState(false);
    const [goMessages,setGoMessages] = useState(false);
    const [goUser,setGoUser] = useState(false);

    // Statet for modals
    const [smShow, setSmShow] = useState(false);
    const [modalComment,setModalComment] = useState(false);
    const [comment,setComment] = useState([]);
    const [responseTweet,setResponseTweet] = useState("");

    // Uplode && Register image
    const [selectImg, setSelectImg] = useState(null);
    const [registerImg,setRegisterImg] = useState([]);
    const [infosUser,setInfosUser] = useState([]);
    const [search,setSearch] = useState("");
    // const [searchConfirm,setSearchConfirm] = useState("");
    const input =  useRef(null);
    const [id,setId] = useState(parseInt(props.id));
    const [displayUsers,setDisplayUsers] = useState(false);
    const [pret,setPret] = useState(false);
    const [ready,setReady] = useState(false)
    const [allTweet,setAllTweet] = useState([]);
    console.log("allTweet-->",allTweet);
    useEffect(async()=>{

        let url = 'http://localhost:3000/controller/homePage.php';
        await axios.post(url,JSON.stringify({
            req : "getUser",
            id: id
        }))
        .then( async function(response){
            props.sendToReduxInfosUser(response.data);
            let urlPP;
            let urlPC;
            if(response.data.imageprofil == "NULL"){
                urlPP = null;
            }else{
                urlPP = response.data.imageprofil;
            }
            if(response.data.imagecounv == "NULL"){
                urlPC = null;
            }else{
                urlPC = response.data.imagecounv;
            }
            await setInfosUser({
                "pseudo" : response.data[0].slug,
                "username" : response.data[0].username,
                "pp" : urlPP,
                "pc" : urlPC,
            });
        })
        .catch(function (error) {
            console.log(error);
        });

        // second req

        let url2 = 'http://localhost:3000/controller/homePage.php';
        await axios.post(url2,JSON.stringify({
            req : "getAllTweet",
            id : id,
        }))
        .then(function(response){
            setAllTweet(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        setReady(true);
    },[]);

    const GoOut = ()=>{
        setId(0);
    }

    function newDiv(text){
        const date = new Date;
        const auj = date.toLocaleDateString();

        if(tweet !== ""){
            setNewTab( [...newTab,{text,auj}] );
            setTweet("");

            if(selectImg === null){
                setRegisterImg( [...registerImg,null] );
            }else{
                setRegisterImg( [...registerImg,URL.createObjectURL(selectImg)] );
            }
            setSelectImg(null);
            postTweet();
        }
    }

    const postTweet = async ()=> {
        let img = "";
        if(selectImg != null){
            const fromData = new FormData();
            fromData.append("file",selectImg);
            fromData.append("upload_preset","rqyhb3lp");
            await axios.post("https://api.cloudinary.com/v1_1/epitech91/image/upload",fromData)
            .then((res)=>{
                img = res.data.secure_url;
            });
        }
        let url = 'http://localhost:3000/controller/homePage.php';
        axios.post(url,JSON.stringify({
            req : "tweet",
            tweet: tweet,
            id: id,
            image : img,
        }))
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const responseTweetLength = (text)=>{

        setResponseTweet(text);
        if(responseTweet.length < 140){
            setColorTweet(false);
        }else{
            setColorTweet(true);
        }
    }

    const tweetLength = (text)=>{
            setTweet(text);
        if(tweet.length < 140){
            setColorTweet(false);
        }else{
            setColorTweet(true);
        }
    }

    const TweetLeft = ()=>{
        newDiv(tweet);
        setSmShow(false);
    }
    const close2 = ()=>{
        setSmShow(true);
        setTweet("");
    }
    const close = ()=>{
        setSmShow(false);
        setTweet("");
    }
    const showComment = (text,date) =>{
        setComment([{text,date}]);
        setModalComment(true);
        }

        const CloseModalComment = ()=>{
            setModalComment(false)
            setResponseTweet("");
        }

        const resOfcomment = (res)=>{
            if(res != ""){
                console.log("c'est pas vide");
            }
        }

    const handleKeyPress = (e) =>{
        setSearch(e.target.value);
        if (e.key === "Enter"){
            searchUser();
        }
    }

    const searchUser = async ()=>{
        let url = 'http://localhost:3000/controller/homePage.php';
        await axios.post(url,JSON.stringify({
            req : "getALLUser",
            id : id,
        }))
        .then(function(response){
            console.log(response.data);
            setDisplayUsers(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        setPret(true);
    }

    const userfn = (id_user)=>{
        props.sendToReduxId_user(id_user);
        setGoUser(true)
    }

    const modal = <Modal show={smShow} onHide={() => close()} style={{marginTop:"100px"}}>
        <Modal.Body style={{textAlign:"center"}}>
            <CloseButton style={{marginLeft:"-450px"}}
                onClick={() => close()}
            />
            <div style={{textAlign:"end",marginTop:"15px",borderBottom:"1px solid rgb(239, 243, 244)"}}>

                <div style={{display:"flex",flexDirection:"row",marginTop:"2%"}}>
                        {infosUser["pp"] ?
                            <img src={infosUser["pp"]}  alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}
                            onClick={()=>setGoProfile(true)}
                            />
                        : 
                            <img src={logo} alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}
                            onClick={()=>setGoProfile(true)}
                            />
                        }
                    <TextareaAutosize
                        aria-label="minimum height"
                        placeholder="Quoi de neuf pirate ?"
                        style={{outline:"none",width:"100%",fontWeight:"bold",border:"none",marginTop:"2%",marginLeft:"2%",color:`${colorTweet ? "red" : "black"}`}}
                        onChange={(e)=> tweetLength(e.target.value)}
                        value={tweet}
                    />
                    </div>
                    {colorTweet
                        ?
                        <Button
                            disabled
                            style={{width:"80px",borderRadius:"100px",backgroundColor:"rgb(29, 155, 240)",borderColor:"rgb(29, 155, 240)",fontWeight:"bold",marginRight:"2%",marginBottom:"15px"}}
                            >Tweet
                        </Button>
                        :
                        <Button
                            style={{width:"80px",borderRadius:"100px",backgroundColor:"rgb(29, 155, 240)",borderColor:"rgb(29, 155, 240)",fontWeight:"bold",marginRight:"2%",marginBottom:"15px"}}
                            onClick={()=>TweetLeft()}
                            >Tweet
                        </Button>}
                    </div>
        </Modal.Body>
    </Modal>


    const commentaire = comment.map((res)=>(
        <Modal show={modalComment} onHide={() => CloseModalComment()} style={{marginTop:"100px"}}>

                <CloseButton style={{marginLeft:"15px",marginTop:"15px"}}
                    onClick={() => CloseModalComment()}
                />
            <Modal.Body>
                <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
                    <div style={{width:"13%",marginRight:"10px"}}>
                        <img src={infosUser["pp"]} alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}/>
                        <div style={{backgroundColor: "rgb(207, 217, 222)",width:"2px",height:"30px",margin:"5px auto"}}></div>
                    </div>
                    <div style={{width:"100%"}}>
                        <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
                            <p style={{margin:"0px 0px",fontWeight:"bold",marginRight:"8px"}}> {infosUser["username"]} </p>
                            <p style={{color:"gray",marginRight:"8px"}}> @{infosUser["pseudo"]} </p>
                            <p style={{color:"gray"}}> {res.auj} </p>
                        </div>
                        <p>{res.text}</p>
                    </div>
                </div>
                <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
                    <div style={{width:"13%",marginRight:"10px"}}>
                    <img src={infosUser["pp"]}  alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}/>
                    </div>
                    <div style={{width:"100%"}}>
                    <TextareaAutosize
                                aria-label="minimum height"
                                placeholder="Tweet ta réponse ?"
                                style={{width:"98%",fontWeight:"bold",border:"none",marginTop:"2%",color:`${colorTweet ? "red" : "black"}`,outline:"none"}}
                                onChange={(e)=> responseTweetLength(e.target.value)}
                                value={responseTweet}
                    />
                    <div style={{textAlign:"end"}}>
                    <Button
                        style={{width:"80px",borderRadius:"100px",backgroundColor:"rgb(29, 155, 240)",borderColor:"rgb(29, 155, 240)",fontWeight:"bold",marginRight:"2%",marginBottom:"15px",marginTop:"15px",textAlign:"center"}}
                        onClick={()=>resOfcomment(responseTweet)}
                        >Tweet
                    </Button>
                    </div>
                    </div>
                </div>
        </Modal.Body>
    </Modal>
    ));

    if(id === 0){
        return(
            <Navigate to="/"/>
        );
    }else{
    switch(true) {
        case goUser:
        return(
            <Navigate to="/User"/>
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
        if(ready == true){

            return (
                <div style={{display:'flex',flexDirection:"row"}}>
                    {/* 1ere Div */}
                    
                    <div style={{borderRight:"1px solid rgb(239, 243, 244)",width:"26%",display:"flex",flexDirection:"column",paddingTop:"15px",alignItems:"center",position:"fixed",}}>
                        <div>
                            <img src={logo} alt="Logo" style={{height:"40px",width: "40px",marginBottom:"15px",cursor:"pointer",objectFit:"cover"}}/>
                            <h4
                                style={{marginBottom:"25px",cursor:"pointer",backgroundColor:`${home ? "rgb(15, 20, 25, 0.1)" : "white"}`,padding:"10px 0",borderRadius:"50px",textAlign:"center",fontWeight:"bold",color:"rgb(29, 155, 240)"}}
                                onMouseOver={()=>setHome(true)}
                                onMouseOut={()=>setHome(false)}
                            ><RiHome7Fill/> Accueil</h4>
                            <h4
                                style={{marginBottom:"25px",cursor:"pointer",backgroundColor:`${explore ? "rgb(15, 20, 25, 0.1)" : "white"}`,padding:"10px 0",borderRadius:"50px",textAlign:"center"}}
                                onMouseOver={()=>setExplore(true)}
                                onMouseOut={()=>setExplore(false)}
                                onClick={()=>setGoExplore(true)}
                                >
                                <FiHash/> Explorer
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
    
                            <h4
                                style={{marginBottom:"25px",cursor:"pointer",backgroundColor:`${out ? "rgb(15, 20, 25, 0.1)" : "white"}`,padding:"10px 0",borderRadius:"50px",textAlign:"center"}}
                                onMouseOver={()=>setOut(true)}
                                onMouseOut={()=>setOut(false)}
                                onClick={()=>GoOut()}
                                >
                                    <GoSignOut/> Deco
                            </h4>
    
                            <Button
                                style={{width:"100%",borderRadius:"100px",backgroundColor:"rgb(29, 155, 240)",borderColor:"rgb(29, 155, 240)",fontWeight:"bold"}}
                                onClick={()=> close2()}
                                >Tweet
                            </Button>
                        </div>
    
                        <div
                            style={{width:"180px",display:"flex",flexDirection:"row",justifyContent:"center",paddingTop:"10px",marginTop:"50%",borderRadius:"50px",cursor:"pointer",backgroundColor:`${profileTwo ? "rgb(15, 20, 25, 0.1)" : "white"}`}}
                            onMouseOver={()=>setProfileTwo(true)}
                            onMouseOut={()=>setProfileTwo(false)}
                            onClick={()=>setGoProfile(true)}
                        >
                            {infosUser["pp"] ? 
                                <img src={infosUser["pp"]} alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",borderRadius:"100px",marginRight:"15px",objectFit:"cover"}}/>
                            : 
                                <img src={logo} alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",borderRadius:"100px",marginRight:"15px",objectFit:"cover"}}/>
                            }
                            <div>
                                <p style={{margin:"0px 0px",fontWeight:"bold"}}>{infosUser["username"]}</p>
                                <p style={{color:"gray"}}>@{infosUser["pseudo"]}</p>
                            </div>
                        </div>
                    </div>
    
                    {/* 2eme Div */}
                    <div style={{width:"44%",borderRight:"1px solid rgb(239, 243, 244)",paddingLeft:"15px",marginTop:"15px",marginLeft:"26%",borderLeft:"1px solid rgb(239, 243, 244)"}}>
                        <h5 style={{fontWeight:"bold"}}>Accueil</h5>
    
                        <div style={{textAlign:"end",marginTop:"15px",borderBottom:"1px solid rgb(239, 243, 244)"}}>
    
                            <div style={{display:"flex",flexDirection:"row",marginTop:"2%"}}>
                                <div>
    
                            {infosUser["pp"] ?
                                <img src={infosUser["pp"]}  alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}
                                onClick={()=>setGoProfile(true)}
                                />
                            : 
                                <img src={logo} alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}
                                onClick={()=>setGoProfile(true)}
                                />
                            }
                                </div>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    placeholder="Quoi de neuf pirate ?"
                                    style={{ width:"100%",fontWeight:"bold",border:"none",marginTop:"2%",marginLeft:"2%",color:`${colorTweet ? "red" : "black"}`,outline:"none"}}
                                    onChange={(e)=> tweetLength(e.target.value)}
                                    value={tweet}
                                />
                            </div>
                            {selectImg && (
                                <img src={URL.createObjectURL(selectImg)} style={{width:"100%"}} />
                            )}
                            <div style={{width:"100%",alignItems:"end",justifyContent:"space-between",display:"flex"}}>
                                <BsImage
                                    style={{color:"rgb(29, 155, 240)",marginLeft:"15px",margin:"auto 20px",cursor:"pointer"}}
                                    onClick={()=> input.current.click()}
                                />
                                        <input
                                            ref={input}
                                            hidden
                                            type="file"
                                            name="myImage"
                                            accept="image/png, image/jpg, image/jpeg"
                                            onChange={(e) => {
                                            setSelectImg(e.target.files[0]);
                                            }}
                                        />
                                {colorTweet
                                    ?
                                    <Button
                                        disabled
                                        style={{width:"80px",borderRadius:"100px",backgroundColor:"rgb(29, 155, 240)",borderColor:"rgb(29, 155, 240)",fontWeight:"bold",marginRight:"2%",margin:"10px 15px"}}
                                        >Tweet
                                    </Button>
                                    :
                                    <Button
                                        style={{width:"80px",borderRadius:"100px",backgroundColor:"rgb(29, 155, 240)",borderColor:"rgb(29, 155, 240)",fontWeight:"bold",marginRight:"2%",margin:"10px 15px"}}
                                        onClick={()=>newDiv(tweet)}
                                        >Tweet
                                    </Button>}
                            </div>
                        </div>
    
                        {/* Partie ou les tweetes s'affichent */}
    
                        <div style={{display:"flex",flexDirection:"column-reverse"}}>
                        
                        {newTab.map((res,key)=>(
                            <div style={{width:"100%",marginTop:"15px",display:"flex",flexDirection:"row",borderBottom:"1px solid rgb(239, 243, 244)"}}>
                            <div style={{width:"13%",marginRight:"10px"}}>
                            {infosUser["pp"] ?
                                <img src={infosUser["pp"]}  alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}
                                onClick={()=>setGoProfile(true)}
                                />
                            : 
                                <img src={logo} alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}
                                onClick={()=>setGoProfile(true)}
                                />
                            }
                            </div>
                            <div style={{width:"100%"}}>
                                <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
                                    <p style={{margin:"0px 0px",fontWeight:"bold",marginRight:"8px"}}> {infosUser["username"]} </p>
                                    <p style={{color:"gray",marginRight:"8px"}}> @{infosUser["pseudo"]} </p>
                                    <p style={{color:"gray"}}> {res.auj} </p>
                                </div>
                                <p>{res.text}</p>
                                <img src={registerImg[key]} style={{width:"90%",marginBottom:"15px"}}/>
                                <div style={{margin:"0px auto",width:"80%",display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"15px"}}>
                                    <BsChat
                                        style={{cursor:"pointer"}}
                                        size={20}
                                        onClick={()=> showComment(res.text,res.auj)}
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
                        ))}
                        {commentaire}
                        </div>
                        
                        {allTweet.slice(0).reverse().map((res)=>(
                            <div style={{width:"100%",marginTop:"15px",display:"flex",flexDirection:"row",borderBottom:"1px solid rgb(239, 243, 244)"}}>
                            <div style={{width:"13%",marginRight:"10px"}}>
                            {res["imageprofil"] ?
                            <img src={res["imageprofil"]}  alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}/>
                                : 
                            <img src={logo} alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}/>
                            }
                            </div>
                            <div>
                                <div style={{width:"100%",display:"flex",flexDirection:"row"}}>
                                    <p style={{margin:"0px 0px",fontWeight:"bold",marginRight:"8px"}}>{res["username"]}</p>
                                    <p style={{color:"gray",marginRight:"8px"}}>{res["slug"]}</p>
                                    <p style={{color:"gray"}}>{res["date_post"]}</p>
                                </div>
                                <p>{res["tweet"]}</p>
                                <img src={res["image"]} style={{width:"90%",objectFit:"cover",marginBottom:"25px"}}/>
                                <div style={{margin:"0px auto",width:"80%",display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"15px"}}>
                                    <BsChat
                                        size={20}
                                    />
                                    <FaRetweet
                                        size={20}
                                    />
                                    <AiOutlineHeart
                                        size={20}
                                    />
                                </div>
                            </div>
                        </div>
                        ))}
                        {modal}
                    </div>
    
                    {/* 3eme Div */}
    
                    <div style={{width:"35%",borderRight:"1px solid rgb(239, 243, 244)"}}>
                    <h5 style={{fontWeight:"bold",textAlign:"center",marginTop:"20PX"}}>Cherchez les Utilisateurs🥷</h5>
                        <div style={{border:"1px solid rgb(239, 243, 244)",width:"90%",margin:"15px auto",backgroundColor:"rgb(239, 243, 244)",display:"flex",flexDirection:"row",padding:"15px 0px",borderRadius:"50px",borderColor:`${loopColor ? "rgb(29, 155, 240)" : "none"}`}}>
                            <BiSearchAlt size={30} style={{color:`${loopColor ? "rgb(29, 155, 240)" : "black"}`,marginLeft:"10px"}}/>
                            <input
                                type="text"
                                style={{backgroundColor:"rgb(239, 243, 244)",width:"90%",border:"none",outline:"none"}}
                                onClick={()=>setLoopColor(true)}
                                onKeyPress={(e)=>handleKeyPress(e)}
                            />
                        </div>
                        <div style={{width:"90%",height:"auto",border:"1px solid rgb(29, 155, 240)", margin:"0px auto",backgroundColor:"rgb(239, 243, 244)",borderRadius:"50px"}}>
                        
                        {pret ? 
                            displayUsers.map((res)=>(
                                <div
                                    style={{width:"70%",display:"flex",flexDirection:"row",justifyContent:"center",paddingTop:"10px",borderRadius:"50px",cursor:"pointer",backgroundColor:`${profileTwo ? "rgb(15, 20, 25, 0.1)" : "white"}`,margin:"25px auto"}}
                                    // onClick={()=>console.log(res["id_user"])}
                                    onClick={()=>userfn(res["id_user"])}
                                >
                                {res["imageprofil"] ? 
                                    <img src={res["imageprofil"]} alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2px",borderRadius:"100px",marginRight:"15px",objectFit:"cover"}}/>
                                : 
                                    <img src={logo} alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",borderRadius:"100px",marginRight:"15px",objectFit:"cover"}}/>
                                }
                                <div>
                                <p style={{margin:"0px 0px",fontWeight:"bold"}}>{res["username"]}</p>
                                <p style={{color:"gray"}}>@{res["slug"]}</p>
                                </div>
                             </div>
                            ))
                        : 
                            <></>
                        }
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <div style={{width:"50px",margin:"350px auto"}}>
                    <Spinner animation="border" variant="primary" />
                </div>
            )
        }
    }
    }
}

function mapStateToProps(state){
    return {id: state.ID}
}
function  mapDispatchToProps(dispatch){
    return{
        sendToReduxInfosUser : function(infosUser){
            dispatch({type:"infosUser",getinfos:infosUser})
        },
        sendToReduxId_user: function(id) { 
            dispatch({type:'id_user', getId_user:id}) 
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);