let user_signed_in=false;
const client_id=encodeURIComponent('781493304375-heanvg8iinljofhkvgbp34o3tma9uj7t.apps.googleusercontent.com');
const response_type=encodeURIComponent('id_token');
const redirect_uri=encodeURIComponent('https://locdkkgcimclcpkfbgidahdojpofhbki.chromiumapp.org  ');
const state=encodeURIComponent('jfkls3n');
const scope=encodeURIComponent('openid');
const prompt=encodeURIComponent('consent');

function create_oauth2_url(){
    let nonce=encodeURIComponent(Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15));
    let url=`https://account.google.com/o/oauth2/v2/auth?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}&prompt=${prompt}&nonce=${nonce}`;

    return url;
}

function is_user_signed_in(){
    return user_signed_in;
}

chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
    if(request.message==='login'){
        if(is_user_signed_in()){
            console.log("user is already signed in");
        }
        else{
            chrome.identity.launchWebAuthFlow({
                url:create_oauth2_url(),
                interactive:true
            },
            function(redirect_url){
                console.log(redirect_url);
                sendResponse('success');
            });

            return true;
        }
    }
    else if(request.message==='logout')
    {

    }
    else if(request.message==='isUserSignedIn'){

    }
});