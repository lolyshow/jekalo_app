import axios from "axios";
class Network {
  getPropValue = (object, path = "") =>
    path.split(".").reduce((o, x) => (o == undefined ? o : o[x]), object);

  get = async (URL, HEADERS = {}) => {
        let result;    
    try{
        var axios = require('axios');

        var config = {
        method: 'get',
        url: URL,
        headers: { HEADERS }
        };

        let responseObject = await axios(config)
        .then((response) => response);
        let response = responseObject.data;

        result = { response, error: false, errorMessage: null };

        console.log("thisIsResultBeforePrintToCharacter",result);
    }catch(error) {
        result = { response: null, error: true, errorMessage: error.toString() };
    };

    return result;
  };
}

export default Network;
