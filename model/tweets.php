<?php
class tweets{
    private $db;
    function __construct(){
        try{
            $this->db = new PDO('mysql:host=65.108.127.22:3306;dbname=common-database','epitech','ZIX@rFN00UyqNCr.');
        }catch(Exception $e){
            die('Erreur'.$e->getMessage());
        }
    }
    function get_user_tweets($id){
        $sql = $this->db->prepare("SELECT tweet from tweets where id_user= '$id'");
        $sql->execute();
        $sql->fetch();
        return $sql;
    }
    function get_index_tweets($id){
        $sql = $this->db->prepare("SELECT ");
        $sql->execute();
        $sql->fetch();
        return $sql;
    }
    
    function tweet($id_user,$content,$imageURL = null){
        $content = str_replace("'","\'",$content);
        if($imageURL == null){
            $sql = $this->db->prepare("INSERT INTO tweets (id_user,tweet) values ('$id_user','$content')");
        }else{
            $sql = $this->db->prepare("INSERT INTO tweets (id_user,tweet,image) values ('$id_user','$content','$imageURL')");
        }
        $sql->execute();
    }
    function get_allFor_tweets($id){
        $res = [];

        $req = "SELECT tweet,date_post,image FROM tweets WHERE id_user = '$id'";
        $sql = $this->db->prepare($req);
        $sql->execute();
        while($tweets = $sql->fetch(PDO::FETCH_ASSOC)){
            array_push($res, (object)[
                'tweet' => $tweets["tweet"],
                'date_post' => $tweets["date_post"],
                'image' => $tweets["image"],
            ]);
        }
        return $res;
    }

    function get_allTweets_withImage(){
        $res = [];

        $req  = "SELECT username,slug, tweets.tweet, tweets.image, tweets.date_post , images.imageprofil FROM users LEFT JOIN images ON users.id = images.id_user LEFT JOIN tweets ON users.id = tweets.id_user";
        $sql = $this->db->prepare($req);
        $sql->execute();
        while($tweets = $sql->fetch(PDO::FETCH_ASSOC)){
            array_push($res, (object)[
                'username' => $tweets["username"],
                'slug' => $tweets["slug"],
                'tweet' => $tweets["tweet"],
                'image' => $tweets["image"],
                'date_post' => $tweets["date_post"],
                'imageprofil' => $tweets["imageprofil"],
            ]);
        }
        return $res;
    }
}