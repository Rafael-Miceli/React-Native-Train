import {
    AsyncStorage
} from 'react-native';

//Low Dash

const userKey = 'user';

export class AuthService {

    getUser(callback) {
        AsyncStorage.multiGet([userKey], (err, valor) => {

            console.log("O que vou verificar", valor);

            console.log("Forma Feia: ", valor[0][1]);

            var token = '';

            valor.map((naoVouUsar, i, arr) => {
                let key = arr[i][0];
                let valeu = arr[i][1];

                console.log("key: ", key);
                console.log("valor: ", valeu);

                if (key == userKey) {
                    var tokenObj = JSON.parse(valeu);
                    console.log('tokenObj:', tokenObj);
                    if (tokenObj)
                        var token = tokenObj.token;

                    return callback(token);
                }                
            });      
        });

        // var tok = AsyncStorage.getItem(userKey, (token) => {
        //     console.log('token', token);
            
        // });    

        // console.log('tok', tok);    
        
    }


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
            });

            // AsyncStorage.setItem(userKey, JSON.stringify(results), (err)=> {
            //     if(err){
            //         throw err;
            //     }

            //     return callback({success: true});
            // })

        })
        .catch((err)=> {
            return callback(err);
        });
    }
}

/*



[
    0: [0: 'user', 1: {token: 'abc'}],
    1: ['']
]

*/