export default function(infos = [],action){
    if(action.type == "infosUser"){
        var newInfos = action.getinfos;
        return newInfos;
    }else{
        return infos;
    }
}