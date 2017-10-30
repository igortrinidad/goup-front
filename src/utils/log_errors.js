let packagejson = require('@/../package.json');
let packageversion = packagejson.version;
let moment = require('moment');
import store from '../store';
import axios from 'axios';


export function changeConsole() {
    //Altera o console para pegar os erros de javascript também
    var console = (function (oldCons) {
        return {
            log: function (text) {
                oldCons.log(text);
            },
            info: function (text) {
                oldCons.info(text);
            },
            warn: function (text) {
                oldCons.warn(text);
                logErroJs(text);
            },
            error: function (text) {
                oldCons.error(text);
                logErroJs(text);
            }
        };
    }(window.console));

    //Then redefine the old console
    window.console = console;

}

export function logErroRequest(response) {


    //Enviar o erro através de ajax simples para não entrar em loop se houver erro também nessa request

    var errotext = `
    *******************
    ERRO API
    -------------------
    DATA: ${moment().format('DD/MM/YYYY HH:mm:ss')}
    VERSÃO: ${packageversion}
    URL_APP: ${window.location.href}
    URL_API: ${response.config.url}
    ERRO: ${ (response.data.error) ? response.data.error : ''}
    LOGADO: ${store.getters.isLogged}
    USUARIO: ${ (store.getters.isLogged) ? store.getters.currentUser.full_name : '--'}
    ------------------
    `;

    var JSONSTR = `{"text":" ${errotext}"}`;

    function postMessageToSlack(payload) {

        axios.post("https://hooks.slack.com/services/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", payload)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    postMessageToSlack(JSONSTR);
}


function logErroJs(text) {


    //Enviar o erro através de ajax simples para não entrar em loop se houver erro também nessa request

    var errotext = `
    *************************
    ERRO JAVASCRIPT
    -------------------------
    DATA: ${moment().format('DD/MM/YYYY HH:mm:ss')}
    VERSÃO: ${packageversion}
    URL_APP: ${window.location.href}
    ERRO: ${text}
    LOGADO: ${store.getters.isLogged}
    USUARIO: ${ (store.getters.isLogged) ? store.getters.currentUser.full_name : '--'}
    -------------------------
    `;

    var JSONSTR = `{"text":" ${errotext}"}`;

    function postMessageToSlack(payload) {
        var xmlhttp = new XMLHttpRequest(),
            webhook_url = "https://hooks.slack.com/services/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";
        xmlhttp.open('POST', webhook_url, false);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(payload);
    }

    postMessageToSlack(JSONSTR);
}
