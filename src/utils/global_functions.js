import moment from 'moment';


export default function(){

    //Cria uma função para limpar o localStorage porém manter alguns itens
    var clear = function(){

        var user_last_geolocation = localStorage.getItem('user_last_geo_location');
        var language = localStorage.getItem('language');

        window.localStorage.clear();

        localStorage.setItem('user_last_geo_location', user_last_geolocation);
        localStorage.setItem('language', language);

    }

    //Then redefine the old clear
    window.clearAndMaintain = clear;


    window.checkUserLastLocation = function(){
        var userLastGeoLocation = JSON.parse(localStorage.getItem('user_last_geo_location'));

        if(!userLastGeoLocation){
            return false
        }

        if(moment().subtract(1, 'hours').isBefore(moment(userLastGeoLocation.time, 'DD/MM/YYYY HH:mm:ss'))){
            return 'is_valid'
        }

        if(moment().subtract(1, 'hours').isAfter(moment(userLastGeoLocation.time, 'DD/MM/YYYY HH:mm:ss'))){
            return 'is_invalid'
        }


    }

    //Return a Blob file to append on FormData
    window.dataURItoBlob = function(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }


    //Submenu toggle
    $('body').on('click', '.sub-menu > a', function(e){
        e.preventDefault();
        $(this).next().slideToggle(200);
        $(this).parent().toggleClass('toggled');
    });

    // Retorna o valor
    Number.prototype.progressLevel = function() {
        if(this >= 1 && this <= 5) { return 'per05' }
        if(this >= 6 && this <= 10) { return 'per10' }
        if(this >= 11 && this <= 15) { return 'per15' }
        if(this >= 16 && this <= 20) { return 'per20' }
        if(this >= 21 && this <= 25) { return 'per25' }
        if(this >= 26 && this <= 30) { return 'per30' }
        if(this >= 31 && this <= 35) { return 'per35' }
        if(this >= 36 && this <= 40) { return 'per40' }
        if(this >= 41 && this <= 45) { return 'per45' }
        if(this >= 46 && this <= 50) { return 'per50' }
        if(this >= 51 && this <= 55) { return 'per55' }
        if(this >= 56 && this <= 60) { return 'per60' }
        if(this >= 61 && this <= 65) { return 'per65' }
        if(this >= 66 && this <= 70) { return 'per70' }
        if(this >= 71 && this <= 75) { return 'per75' }
        if(this >= 76 && this <= 80) { return 'per80' }
        if(this >= 81 && this <= 85) { return 'per85' }
        if(this >= 86 && this <= 90) { return 'per90' }
        if(this >= 91 && this <= 95) { return 'per95' }
        if(this >= 96 && this <= 100) { return 'per00' }
    }

    //Retorna o index de um array baseado em um identificador (ex. 1 *id) e uma ancora (ex. ID)
    Array.prototype.toggleSelected = function arrayObjectIndexOf(id) {

        var index = this.indexOf(id);
        if(index > -1){
            this.splice(index,1)
        } else {
            this.push(id);
        }

    }

    // Soma o valor do array (this) com o array passado pelo parametro
    Array.prototype.sumArray = function(arr) {
        var sum = this.map(function (num, idx) {
          return num + arr[idx];
        });
        return sum;
    }

    //Retorna o index de um array baseado em um identificador (ex. 1 *id) e uma ancora (ex. ID)
    Array.prototype.indexFromAttr = function arrayObjectIndexOf(anchor, identifier) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][anchor] === identifier) {
                return i
            }
        }
        return -1;
    }

    //Retorna o objeto de um array baseado em um identificador (ex. 1 *id) e uma ancora (ex. ID)
    Array.prototype.findFromAttr = function arrayObjectIndexOf(anchor, identifier) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][anchor] === identifier) {
                return this[i];
            }
        }
        return false;
    }

    //Retorna um boolean de um array baseado em um identificador (ex. 1 *id) e uma ancora (ex. ID)
    Array.prototype.checkFromAttr = function arrayObjectIndexOf(anchor, identifier) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][anchor] === identifier) {
                return true;
            }
        }
        return false;
    }

    //Retorna um boolean de um array baseado em um identificador (ex. 1 *id) e uma ancora (ex. ID)
    Array.prototype.checkIfContains = function arrayObjectIndexOf(obj) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }

    //Remove um objeto de um array localizado por um identificador passado
    Array.prototype.removeFromAttr = function arrayObjectIndexOf(anchor, identifier) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][anchor] === identifier) {
                this.splice(i, 1);
                return true
            }
        }
        return false;
    }

    //Remove um objeto de um array localizado por um identificador passado
    Array.prototype.removeFromObj = function arrayObjectIndexOf(object) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i] === object) {
                this.splice(i, 1);
                return true
            }
        }
        return false;
    }

    //Remove um objeto de um array localizado por dois identificadores e duas ancoras.
    Array.prototype.removeFromTwoAttr = function arrayObjectIndexOf(anchor, identifier, anchor2, identifier2) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][anchor] === identifier && this[i][anchor2] === identifier2) {
                this.splice(i, 1);
                return true
            }
        }
        return false;
    }

    //Retorna o objeto de um array baseado em DOIS identificador (ex. 1 *id) e uma ancora (ex. ID)
    Array.prototype.findFromTwoAttr = function arrayObjectIndexOf(anchor, identifier, anchor2, identifier2) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][anchor] === identifier && this[i][anchor2] === identifier2) {
                return this[i];
            }
        }
        return false;
    }

    //Toggle determinado atributo entre true e false de um array localizado pelo identificador passado
    Array.prototype.toggleFromAttr = function arrayObjectIndexOf(anchor, identifier, toggled) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][anchor] === identifier) {
                if(this[i][toggled]){
                    this[i][toggled] = false;
                } else {
                    this[i][toggled] = true;
                }
                return true
            }
        }
        return false;
    }

    //Altera um atributo localizado pelo identificador passado
    Array.prototype.changeFromAttr = function arrayObjectIndexOf(anchor, identifier, attr, newVal) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i][anchor] === identifier) {

                    this[i][attr] = newVal;

                return true
            }
        }
        return false;
    }

    //Soma um atributo dentro do array localizado através de um atributo, que pode ser id ou um toggle
    Array.prototype.applySumFromAttrInArray = function arrayObjectIndexOf(anchor, identifier, attrToSum) {
        var value = 0;
        for (var i = 0, len = this.length; i < len; i++) {

            if (this[i][anchor] === identifier) {
                    value = value + this[i][attrToSum];
            }
        }
            return value;
    }

    //Soma um atributo dentro do array
    Array.prototype.sumAttrInArray = function arrayObjectIndexOf(attrToSum) {
        var value = 0;
        for (var i = 0, len = this.length; i < len; i++) {

            value = value + this[i][attrToSum];

        }
            return value;
    }

}
