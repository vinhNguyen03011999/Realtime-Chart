import Service from './sevice.js';
 
export const UserService = {
    login,
    logout,
    resgister,
    getDataChart,
    checkUserLogin
}

function login(userdata) {
console.log("user", userdata.email, userdata.password)
    return new Promise((resolve, reject) => {
        Service.post('/public/account/login', {
            email: "testacm",
            password: "123123"
        }).then(res => {
            if (res.status == 200) {
                console.log('success', res);
                if (res.data.status) {  
                    Service.setAuth(res.data.data);
                    resolve(res.data.data);
                    window.localStorage.setItem("account", res.data.data.sessionID)
                } else {
                    alert(res.data.message)
                    reject(res.data.message);
                }
            } else {
                reject(res.statusText);
            }
        }).catch(error => {
            reject(error);
        });
    });
}

function logout() {
    window.localStorage.removeItem('account')
    return Service.post('/public/user/logout', null);

}

function resgister(userdata) {
    console.log("user", userdata.email, userdata.password, Service)
        return new Promise((resolve, reject) => {
            Service.post('/public/account/signup', {
                email: "vinhnt",
                password: "123123"
            }).then(res => {
                if (res.status == 200) {
                    console.log('success', res);
                    if (res.data.status) {  
                        // Service.setAuth(res.data.data);
                        resolve(res.data.data);
                    } else {
                        reject(res.data.message);
                    }
                } else {
                    reject(res.statusText);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }

function getDataChart(){
    Service.get('/public/datachart').then((res)=>{
        console.log("data chart",res)
    })
}

function checkUserLogin(user) {
    if (user != '' || user != null) {
        console.log("user define")

        return "display: block"
        
    } else {
        console.log("user undefine")

        return "display: none"
    }
}