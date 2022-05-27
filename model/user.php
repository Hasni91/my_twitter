<?php
class user{
    private $db;
    function __construct(){
        try{
            $this->db = new PDO('mysql:host=65.108.127.22:3306;dbname=common-database','epitech','ZIX@rFN00UyqNCr.');
        }catch(Exception $e){
            die('Erreur'.$e->getMessage());
        }
    }
    function is_user_exist($email){
        $sql = $this->db->prepare("SELECT email FROM users WHERE email='$email'");
        $sql->execute();
        if($sql->fetchColumn() == 0){
            return false;
        }else{
            return true;
        }
    }
    function check_password($email,$password){
        $sql = $this->db->prepare("SELECT password FROM users WHERE email='$email'");
        $sql->execute();
        $sql = $sql->fetchColumn();
        if($password == $sql){
            return true;
        }else{
            return false;
        }
    }
    function create_user($pseudo,$username,$email,$password){
        $sql = $this->db->prepare("INSERT INTO users (username,slug,email,password) values ('$username','$pseudo','$email','$password');");
        $sql->execute();
    }
    
    function delete_user($id){
        $sql = $this->db->prepare("DELETE FROM users WHERE id = '$id'");
        $sql->execute();
    }
    /*
    SETTERS
    */
    function set_pseudo($pseudo,$id){
        $sql = $this->db->prepare("UPDATE users SET username = '$pseudo' WHERE id = $id");
        $sql->execute();
    }
    function set_username($username,$id){
        $sql = $this->db->prepare("UPDATE users SET slug = '$username' where id = '$id';");
        $sql->execute();
    }
    function set_email($email,$id){
        $sql = $this->db->prepare("UPDATE users SET email = '$email' where id = '$id';");
        $sql->execute();
        echo "test";
    }
    function set_password($password,$id){
        $sql = $this->db->prepare("UPDATE users SET password = '$password' where id = '$id';");
        $sql->execute();
    }
    function set_bio($bio,$id){
        $bio = str_replace("'","\'",$bio);
        $sql = $this->db->prepare("UPDATE users SET description = '$bio' where id = '$id';");
        $sql->execute();
    }
    /*
    GETTERS
    */
    function get_id($email){
        $sql = $this->db->prepare("SELECT id FROM users WHERE email = '$email';");
        $sql->execute();
        return $sql->fetchColumn();
    }
    function get_id_with_username($username){
        $sql = $this->db->prepare("SELECT id FROM users WHERE slug = '$username';");
        $sql->execute();
        return $sql->fetchColumn();
    }
    function get_pseudo($id){
        $sql = $this->db->prepare("SELECT pseudo FROM users WHERE id = '$id';");
        $sql->execute();
        return $sql->fetchColumn();
    }
    function get_username($id){
        $sql = $this->db->prepare("SELECT username FROM users WHERE id = '$id';");
        $sql->execute();
        return $sql->fetchColumn();
    }
    function get_email($id){
        $sql = $this->db->prepare("SELECT email FROM users WHERE id = '$id';");
        $sql->execute();
        return $sql->fetchColumn();
    }
    function get_bio($id){
        $sql = $this->db->prepare("SELECT description FROM users WHERE id = '$id';");
        $sql->execute();
        return $sql->fetchColumn();
    }    
    
    function get_profil_info($id){
        $arr = [];
        
        $sql1 = $this->db->prepare("SELECT username,slug,description FROM users WHERE id='$id'");
        $sql1->execute();
        $sql1 = $sql1->fetch(PDO::FETCH_ASSOC);
        
        $sql2 = $this->db->prepare("SELECT id_follower FROM follower WHERE id_user = '$id'");
        $sql2->execute();
        $sql2 = $sql2->fetch(PDO::FETCH_ASSOC);
        $sql3 = $this->db->prepare("SELECT id_following FROM following WHERE id_user='$id'");
        $sql3->execute();
        $sql3 = $sql3->fetch(PDO::FETCH_ASSOC);
        
        $sql4 = $this->db->prepare("SELECT imageprofil, imagecounv FROM images INNER JOIN users ON images.id_user = '$id' = users.id");
        $sql4->execute();
        $sql4 = $sql4->fetch(PDO::FETCH_ASSOC);
        
        array_push($arr,$sql1);
        if(!empty($sql2)){
            $arr = array_merge($arr,$sql2);
        }
        if(!empty($sql3)){
            $arr = array_merge($arr,$sql3);
        }
        if(!empty($sql4)){
            $arr = array_merge($arr,$sql4);
        }
        return $arr;
    }
    
    function verifiy_UserImg($id){
        $sql = $this->db->prepare("SELECT * FROM images WHERE id_user='$id'");
        $sql->execute();
        $sql->fetch();
        return $sql->rowCount();
    }
    
    
    function registerImg_User($id,$urlPP,$urlPC){
        $req = " INSERT INTO images (id_user,imageprofil,imagecounv) VALUES ('$id','$urlPP','$urlPC')";
        $sql = $this->db->prepare($req);
        $sql->execute();
    }
    
    function register_PP($id,$urlPP,$urlPC){
        $req = "UPDATE images SET imageprofil='$urlPP' WHERE id_user = '$id'";
        $sql = $this->db->prepare($req);
        $sql->execute();
    }
    
    function register_PC($id,$urlPC){
        $req = "UPDATE images SET imagecounv='$urlPC' WHERE id_user = '$id'";
        $sql = $this->db->prepare($req);
        $sql->execute();
    }

    function getAllUser(){
        $res = [];
        $req = "SELECT users.id,slug,username,imageprofil FROM users LEFT JOIN images ON images.id_user = users.id" ;
        $sql = $this->db->prepare($req);
        $sql->execute();

        while($users = $sql->fetch(PDO::FETCH_ASSOC)){
            array_push($res, (object)[
                'id_user' => $users["id"],
                'slug' => $users["slug"],
                'username' => $users["username"],
                'imageprofil' => $users["imageprofil"],
            ]);
        }
        return $res;
    }
}
