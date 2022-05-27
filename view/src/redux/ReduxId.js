export default function(id = 0,action){
    if(action.type == "id"){
        var newId = action.getId;
        return newId;
    }else{
        return id;
    }
}