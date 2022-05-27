export default function(id = 0,action){
    if(action.type == "id_user"){
        var newId_user = action.getId_user;
        return newId_user;
    }else{
        return id;
    }
}