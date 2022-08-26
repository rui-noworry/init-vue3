export default {
    ip:function(_obj){
        var result = {
            status:true,
            message:""
        }
        var reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
        if( _obj && !reg.test(_obj)){
            result.status = false;
            result.message = "ip不符合要求";
        }
        return result;
    },
    domain:function(_obj){ //验证网址
        var result = {
            status:true,
            message:""
        }
        var reg = /^([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|(([a-zA-Z0-9-]+|\*)\.)*([a-zA-Z0-9-]+|\*)\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{0,5}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        if(_obj && !reg.test(_obj)){
            result.status = false;
            result.message = "域名不符合要求";
        }
        return result;
    }
}
