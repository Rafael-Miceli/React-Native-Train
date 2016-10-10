import {AsyncStorage} from 'react-native';

const userKey = 'user';

export class AuthService {
    login(credentials, callback){

        var _body = {
            'username': credentials.username,
            'password': credentials.password
        };

        console.log(_body);        

        fetch('http://10.0.3.2:5000/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_body)
        })
        .then((response)=> {
            console.log("response: ", response);
            if(response.status >= 200 && response.status < 300){
                return response;
            }

            throw {
                badCredentials: response.status == 401,
                unknownError: response.status != 401
            }
        })
        .then((response)=> {
            return response.json();
        })
        .then((results)=> {
            console.log("results: ", results);

            AsyncStorage.multiSet([
                [userKey, JSON.stringify(results)]
            ], (err)=> {
                if(err){
                    throw err;
                }

                return callback({success: true});
            })
        })
        .catch((err)=> {
            return callback(err);
        });
    }
}
