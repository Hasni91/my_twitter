import React, {useState,useRef,useEffect} from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import logo from "../../bleu.png";
import { Navigate } from "react-router-dom";
import {GoSignOut} from "react-icons/go";
import { RiMessage3Line, RiHome7Line } from "react-icons/ri";
import { HiHashtag } from "react-icons/hi";
import { BsPerson, BsChat } from "react-icons/bs";
import { AiOutlineHeart} from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { Button, Form ,Image,Spinner} from 'react-bootstrap';
import { Modal, CloseButton } from 'react-bootstrap';
import { makeStyles } from '@mui/styles';
import {connect} from 'react-redux';
import axios from 'axios';

function Profile(props){

  // State color for manu
  const [home, setHome] = useState(false);
  const [explore, setExplore] = useState(false);
  const [message, setMessage] = useState(false);
  const [profile, setProfile] = useState(false);
  const [out,setOut] = useState(false);

  // States for navigation
  const [goHome, setGoHome] = useState(false);
  const [goExplore, setGoExplore] = useState(false);
  const [goMessages, setGoMessages] = useState(false);

  // State for Modal
  const [goEdit, setGoEdit] = useState(false);
  const Couverture = useRef(null);
  const [couv,setCouv] = useState(null);

  const pProfil = useRef(null);
  const [photoPofil,setPhotoPofil] = useState(null);
  const [bio,setBio] = useState("");
  const [nom,setNom] = useState("");
  const [id,setId] = useState(parseInt(props.id));
  const [infosUser,setInfosUser] = useState([]);
  const [mytweets,setMytweets] = useState([]);
  const [urlCouverture,setUrlCouverture] = useState("");
  const [urlPp,setUrlPp] = useState("");

  console.log("zizi->",mytweets);
  useEffect(async ()=>{
    await setInfosUser({
      "pseudo" : props.user[0].slug,
      "username" : props.user[0].username,
      "description" : props.user[0].description,
      "pp" : props.user.imageprofil,
      "pc" : props.user.imagecounv,
  });
    const url = 'http://localhost:3000/controller/profil.php';
    await axios.post(url,JSON.stringify({
      req: "get_tweets",
      id: id,
    }))
    .then(function (response){
      setMytweets(response.data);
    })
    .catch(function (error){
      console.log(error);
    })
  },[]);

  if(bio.length > 140){
    setBio("");
    alert("la bio ne doit pas dépasser 140 caractères 🏴‍☠️");
  }
  const useStyles = makeStyles({
    form: {
      border: "2px rgb(29, 155, 240) solid",
      margin: "0 auto", borderRadius: "10px",
      marginBottom: "2%",
    },
  });
  //follow
  

  const classes = useStyles();

  const register = async () =>{
    let first = "";
    let second = "";
    if(couv != null){
      const fromData = new FormData();
      fromData.append("file",couv);
      fromData.append("upload_preset","rqyhb3lp");
      await axios.post("https://api.cloudinary.com/v1_1/epitech91/image/upload",fromData)
      .then((res)=>{
        first = res.data.secure_url;
      });
    }

    if(photoPofil != null){
      const fromData = new FormData();
      fromData.append("file",photoPofil);
      fromData.append("upload_preset","rqyhb3lp");
      await axios.post("https://api.cloudinary.com/v1_1/epitech91/image/upload",fromData)
      .then((res)=>{
        second = res.data.secure_url;
      });
    }

    setUrlCouverture(first);
    setUrlPp(second);

    const url = 'http://localhost:3000/controller/profil.php';
    if(first == ""){
      first = "NULL";
    }
    if(second == ""){
      second = "NULL";
    }
    await axios.post(url,JSON.stringify({
      req: "register_image",
      id: id,
      urlPC: `${first}`,
      urlPP: `${second}`,
      bio: bio,
      nom: nom,
    }));
    close();
  }

  const GoOut = ()=>{
    setId(0);
}

  const close = () => {
    setCouv(null);
    setPhotoPofil(null);
    setGoEdit(false);
    setBio("");
    setNom("");
  }

  const modal = <Modal size='lg' show={goEdit} onHide={() => close()} style={{ marginTop: "100px" }}>
    <CloseButton style={{ marginLeft: "15px", marginTop: "15px" }}
      onClick={() => close()}
    />
    <Modal.Body style={{ textAlign: "center" }}>
      <div style={{ textAlign: "end", marginTop: "15px", borderBottom: "1px solid rgb(239, 243, 244)" }}>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "2%" }}>

        </div>
        <Form style={{ marginBottom: "5%" }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ width: "80%", margin: "0 auto" }}>
            <div style={{ width: "100%", height: "auto" }}>
              <div className='gg' style={{ height: "200px", width: "auto", display: "flex" }} >
                {infosUser["pc"] ? 
                <img src={infosUser["pc"]} style={{ width: "100%", height: "auto",cursor:"pointer",border:"2px solid black"}} 
                  onClick={()=> Couverture.current.click()}
                />
                : 
                <img src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256__340.png" style={{ width: "100%", height: "auto",cursor:"pointer"}} 
                  onClick={()=> Couverture.current.click()}
                />
              }
                <input type="file" hidden
                  accept="image/png, image/jpg, image/jpeg"
                  ref={Couverture}
                  onChange={(e) => {
                    setCouv(e.target.files[0]);
                  }}
                />
              </div>
              <div className="editprofil" style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "-65px", cursor:"pointer"}}>
              {infosUser["pp"] ? 
              <Image src={infosUser["pp"]}  style={{ border: "black 3px solid", marginLeft: "5%", backgroundColor: "black", height: "133px", width: "133px", objectFit: "cover" }} border border-dark roundedCircle  
              onClick={()=> pProfil.current.click()}
              ></Image>
                : 
              <img src={logo} alt="logo"  style={{ border: "black 3px solid", marginLeft: "5%", backgroundColor: "black", height: "133px", width: "133px", objectFit: "cover" }} border border-dark roundedCircle  
              onClick={()=> pProfil.current.click()}
              />
            }

                <input type="file" hidden
                  accept="image/png, image/jpg, image/jpeg"
                  ref={pProfil}
                  onChange={(e) => {
                    setPhotoPofil(e.target.files[0]);
                  }} 
                />
              </div>
            </div>

            <div style={{ marginTop: "15px" }}>

              <Form.Control style={{ marginTop: "15px" }}
                className={classes.form}
                type="text"
                placeholder="Nom"
                onChange={(e)=>setNom(e.target.value)}
                value={nom}
              />
               <TextareaAutosize
                  aria-label="minimum height"
                  placeholder="Bio"
                  style={{ width:"100%",border:"none",marginTop:"2%",outline:"none",border:"2px rgb(29, 155, 240) solid", paddingLeft:"10px"}}
                  onChange={(e)=>setBio(e.target.value)}
                  value={bio}
                />
              <Button variant="primary" style={{ borderRadius: "100px", width: "130px", height: "50px", marginTop: "70px", marginRight: "10px" }}
                onClick={() => register()}
              >Enregistrer</Button>
            </div>
          </Form.Group>

        </Form>
      </div>
    </Modal.Body>
  </Modal>
  
  if(id === 0){
    return(
      <Navigate to="/"/>
  );
  }else{
  switch (true) {
    case goHome:
      return (
        <Navigate to="/HomePage" />
      );
    case goExplore:
      return (
        <Navigate to="/Explore" />
      );

    case goMessages:
      return (
        <Navigate to="/Messages" />
      );

    default:
      return (
        <div style={{ display: 'flex', flexDirection: "row" }}>
          {/* 1ere div */}
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
                <HiHashtag /> Explorer
              </h4>

              <h4
                style={{ marginBottom: "25px", cursor: "pointer", backgroundColor: `${message ? "rgb(15, 20, 25, 0.1)" : "white"}`, padding: "10px 0", borderRadius: "50px", textAlign: "center" }}
                onMouseOver={() => setMessage(true)}
                onMouseOut={() => setMessage(false)}
                onClick={() => setGoMessages(true)}
              >
                <RiMessage3Line /> Messages
              </h4>

              <h4
                style={{ marginBottom: "25px", cursor: "pointer", backgroundColor: `${profile ? "rgb(15, 20, 25, 0.1)" : "white"}`, padding: "10px 0", borderRadius: "50px", textAlign: "center", color: "rgb(29, 155, 240)" }}
                onMouseOver={() => setProfile(true)}
                onMouseOut={() => setProfile(false)}
              >
                <BsPerson /> Profil
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
                style={{ width: "100%", borderRadius: "100px", backgroundColor: "rgb(29, 155, 240)", borderColor: "rgb(29, 155, 240)", fontWeight: "bold", }}
              >Tweet
              </Button>
            </div>
          </div>

          {/* 2eme div */}

          <div style={{width: "44%", height: "auto", marginLeft: "26%",borderRight:"1px solid rgb(239, 243, 244)",borderLeft:"1px solid rgb(239, 243, 244)"}}>
            <div className='transparence' style={{ backgroundColor: "white", backdropFilter: "blur(5px)", height: "50px", width: "41.10%", opacity: "0.8", position: "fixed" }}>
              <div className='txtprofile' style={{ marginLeft: "5%" }}>

                <p style={{ margin: "0px 0px", fontWeight: "bold", color: "black", marginRight: "8px" }}>{infosUser["username"]}</p>
                <p style={{ margin: "0px 0px", fontWeight: "bold", color: "grey", marginRight: "8px" }}>{mytweets.length} tweets</p>
              </div>
            </div>
            <div className='gg' style={{ height: "200px", width: "auto", display: "flex" }} >
            
            {infosUser["pc"] ? 
              <img src={infosUser["pc"]} style={{ width: "100%", height: "auto" }} />
            : 
              <img src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256__340.png" style={{ width: "100%", height: "auto" }} />
            }

            </div>
            <div className="editprofil" style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "-65px" }}>
            
            {infosUser["pp"] ? 
              <Image src={infosUser["pp"]} style={{ border: "black 3px solid", marginLeft: "5%", backgroundColor: "black", height: "133px", width: "133px", objectFit: "cover" }} border border-dark roundedCircle ></Image>
            : 
              <img src={logo} alt="logo" style={{ border: "black 3px solid", marginLeft: "5%", backgroundColor: "black", height: "133px", width: "133px", objectFit: "cover" }} border border-dark roundedCircle />
            }
              <Button variant="primary" style={{ borderRadius: "100px", width: "130px", height: "50px", marginTop: "70px", marginRight: "10px" }}
                onClick={() => setGoEdit(true)}
              >Editer le Profil</Button>
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", marginLeft: "3%" }}>
              <p style={{ margin: "10px 0px", fontWeight: "bold", marginRight: "8px" }}>{infosUser["username"]}</p>
              <p style={{ color: "gray", marginRight: "8px" }}>@{infosUser["pseudo"]}</p>
              {infosUser["description"] ? <p>{infosUser["description"]}</p> : <p>Vous pouvez ajouter une bio dans Editer le profil🏴‍☠️.</p>}
              <div className='follow' style={{ display: "flex" }}>
                <p style={{ paddingRight: "2%" }}> <b>0</b> Abonnement</p>
                <p> <b>0</b> Abonnés</p>
              </div>
            </div>
            <hr></hr>
            
            {mytweets ?
            
            mytweets.slice(0).reverse().map((res)=>(
              <div style={{width:"100%",marginTop:"15px",display:"flex",flexDirection:"row",borderBottom:"1px solid rgb(239, 243, 244)"}}>
                 <div style={{width:"13%",marginLeft:"10px"}}>
                        {infosUser["pp"] ?
                            <img src={infosUser["pp"]}  alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}/>
                        : 
                            <img src={logo} alt="Logo" style={{width: "50px",height:"50px",marginLeft:"2%",cursor:"pointer",borderRadius:"100px",objectFit:"cover"}}/>
                        }
                        </div>
                        <div style={{width:"100%"}}>
                            <div style={{width:"100%",display:"flex",flexDirection:"row",marginRight:"10px"}}>
                                <p style={{margin:"0px 0px",fontWeight:"bold",marginRight:"8px"}}> {infosUser["username"]} </p>
                                <p style={{color:"gray",marginRight:"8px"}}> @{infosUser["pseudo"]} </p>
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
            :
            <div style={{width:"50px",margin:"350px auto"}}>
              <Spinner animation="border" variant="primary" />
            </div>
            }
            
            {modal}
          </div>

          {/* 3eme div */}
          <div style={{width: "35%" }}></div>
        </div>
      )
  }}
}

function mapStateToProps(state){
  return {id: state.ID, user :state.Infos}
}
export default connect(mapStateToProps,null)(Profile);