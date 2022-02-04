// var axios = require('axios');

// var config = {
//   method: 'get',
//   url: 'https://breakingbadapi.com/api/characters/10',
//   headers: { }
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });




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
        // console.log("This IS ResponseFromNetwork",JSON.stringify(response.data));
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
