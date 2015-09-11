/**
 * Created by TimLi on 15/8/26.
 */

var self = {};
self.tool = (function(){
    var tools = {};
    tools.getMcCmdyTable = function(mcEncode){
        if(!mcEncode)
        return undefined;
        else{
            return 'MC'+mcEncode+'Cmdy';
        }
    };


    return tools;
})();

self.val = (function(){
    var value = {
        aMap:{
            key:'9f85b87a014354cb5e0fe5bfe9af076c',
            tableId:'55d1e906e4b01ef498f1f86a',
            createDataUrl:'http://yuntuapi.amap.com/datamanage/data/create',
            httpHeadContentType:'application/x-www-form-urluncoded',

        }
    };

    value.aMap.data = function(_name,_location,saleScope,minCost,address,mcEncode){
        this._name = _name;
        this.minCost = minCost;
        this._location = _location;
        this.saleScope = saleScope;
        this.coordtype = "string";
        this._address = address;
        this.mcEncode = mcEncode;
        return this;
    };
    return value;
})();


module.exports = self;