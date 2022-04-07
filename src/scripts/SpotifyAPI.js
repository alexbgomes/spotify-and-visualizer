//Author: Alex Gomes
//Date: Jan 7, 2021

const CryptoJS = require("crypto-js");
const {Base64} = require("js-base64")
const axios = require("axios").default;

export class SpotifyAPI {

    constructor(rootUrl) {
        this.accessToken = undefined;
        this.refreshToken = undefined;
        this.codeVerifier = undefined;

        this.tokenType = "Bearer"

        this.redirURI = rootUrl;
        this.codeChallengeMethod= "S256";
        this.state = 0;
        this.scope = "streaming%20user-read-currently-playing%20user-read-playback-state%20user-modify-playback-state";
        this.responseType = "code";
        this.clientId = "333a78af11864cd2a92a92d0403b500c";

        this.grantType = {
            "access": "authorization_code",
            "refresh": "refresh_token"
        }

        this.createAxiosRefreshTokenInterceptor();
    }

    /*
     ****************************
     * AXIOS SPECIFIC FUNCTIONS *
     ****************************
     */

    callSpotifyAPI(request, type) {
        this.createAxiosRefreshTokenInterceptor();
        console.log("CALL:", request);
        if (!type) {
            type = "get";
        }
        return axios({
            method: type,
            url: request,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${this.tokenType} ${this.accessToken}`
            }
        });
    }

    createAxiosRefreshTokenInterceptor() {
        const interceptor = axios.interceptors.response.use(
            function (response) {
                return response
            },
            err => {
                const originalRequest = err.config;
                originalRequest._retry = true;
                console.log("INTERCEPTED ERR:", err.response.status);
                if (err.response.status !== 401) {
                    return Promise.reject(err);
                }
    
                axios.interceptors.response.eject(interceptor); //Prevent recursion
                console.log("Got 401, checking if there are tokens...", this);
                if (this.accessToken && this.refreshToken) {
                    console.log("Token expired, hold on... getting you a new one!");
                    var request = "https://accounts.spotify.com/api/token";
                    var payload = new URLSearchParams({
                        "client_id": this.clientId,
                        "grant_type": this.grantType["refresh"],
                        "refresh_token": this.refreshToken
                    });
                    return axios({
                        method: "post",
                        url: request,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        data: payload
                    }).then(function(response) {
                        console.log("Token refreshed, expiration:", response["data"]["expires_in"]);
                        this.accessToken = response["data"]["access_token"];
                        this.refreshToken = response["data"]["refresh_token"];
                        originalRequest.headers["Authorization"] = `${this.tokenType} ${this.accessToken}`;
                        console.log("Calling again with new token.");
                        return axios(originalRequest);
                    }.bind(this))
                    .catch(function(err) {
                        console.log("Token error:", err, err.response);
                    });
                    //.finally(this.createAxiosRefreshTokenInterceptor);
                } else {
                    console.log("CALLED API WITHOUT ACCESS/REFRESH TOKEN");
                }
            }
        );
    }

    /*
     **************************************
     * AUTHENTICATION FUNCTIONS & HELPERS *
     **************************************
     */

    generateNonce(length, alphanumOnly) {
        if (!length)
            length = 64;

        var extendedSet = "_.-~";
        if (alphanumOnly)
            extendedSet = "";

        let verifier = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + extendedSet;

        for ( var i = 0; i < length; i++ )
           verifier += characters.charAt(Math.floor(Math.random() * characters.length));

        return verifier;
     }

    getCodeVerifier() { //not good practice but will have to do since no backend server
        var prevCode = localStorage.getItem("codeVerifier");
        if (!this.codeVerifier && prevCode) {
            this.codeVerifier = prevCode;
            localStorage.removeItem("codeVerifier");
        }

        var prevState = localStorage.getItem("state");
        if (!this.state && prevState) {
            this.state = prevState;
            localStorage.removeItem("state");
        }
    }

    setCodeVerifier() { //not good practice but will have to do since no backend server
        if (this.codeVerifier)
            localStorage.setItem("codeVerifier", this.codeVerifier);
        if (this.state)
            localStorage.setItem("state", this.state);
    }

    //Steps outlined from: https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow-with-proof-key-for-code-exchange-pkce

    //Step 1
    generateCodeChallenge() {
        const verifier = this.generateNonce();
        this.codeVerifier = verifier;

        let hash = CryptoJS.SHA256(verifier);
        let buffer = Buffer.from(hash.toString(CryptoJS.enc.Hex), "hex");
        let hashArr = new Uint8Array(buffer);

        const encoded = Base64.fromUint8Array(hashArr, true);

        return encoded;
    }

    //Step 2
    createAuthURI() {
        const codeChallenge = this.generateCodeChallenge();
        const state = this.generateNonce(14, true);
        this.state = state;

        const authURL = "https://accounts.spotify.com/en/authorize";
        let query = `response_type=${this.responseType}&client_id=${this.clientId}&redirect_uri=${this.redirURI}&scope=${this.scope}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=${this.codeChallengeMethod}`;
        var request = `${authURL}?${query}`;

        return request;
    }

    //Step 3-1
    getAuthCode() {
        var request = this.createAuthURI();
        this.setCodeVerifier();
        window.location.replace(request);
    }

    //Step 3-2
    checkAuthCode() {
        if (window.location.search != "") {
            var string = window.location.search.substr(1);
            var query = string.split("&");
            var fields = {};

            for (var i = 0; i < query.length; i++) {
                var [k, v] = query[i].split("=");
                fields[k] = v;
            }
            
            this.getCodeVerifier();

            return fields;
        }
    }

    //Step 4
    /*Storing in memory for ideal secure practices, it is not a huge issue to store accessToken in mem
    since it expires every hour, but storing the refreshToken in mem can be problematic
    since it returns an access token and another refreshToken with very simple parameters.
    The refresh token will allow users to keep stay logged in for more than an hour.*/
    getAccessToken(proofCode) {
        if (this.codeVerifier) {
            console.log("New session huh? Hold on... getting you a fresh token!");
            var request = "https://accounts.spotify.com/api/token";
            var payload = new URLSearchParams({
                client_id: this.clientId,
                grant_type: this.grantType["access"],
                code: proofCode,
                redirect_uri: this.redirURI,
                code_verifier: this.codeVerifier
            }); 

            axios({
                method: "post",
                url: request,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: payload})
            .then(function(response) {
                console.log("Token expiration:", response["data"]["expires_in"]);
                this.accessToken = response["data"]["access_token"];
                this.refreshToken = response["data"]["refresh_token"];
            }.bind(this))
            .catch(function(err) {
                console.log("ERR GETTING TOKEN:", err.response);
            });
        } else {
            console.log("codeVerifier not found.");
        }
    }

    //Deprecated
    getRefreshToken() {
        if (this.refreshToken) {
            var request = "https://accounts.spotify.com/api/token";
            var payload = new URLSearchParams({
                "client_id": this.clientId,
                "grant_type": this.grantType["refresh"],
                "refresh_token": this.refreshToken
            });

            axios({
                method: "post",
                url: request,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: payload
            }).then(function(response) {
                console.log("Token refreshed, expiration:", response["data"]["expires_in"]);
                this.accessToken = response["data"]["access_token"];
                this.refreshToken = response["data"]["refresh_token"];
            }.bind(this))
            .catch(function(err) {
                console.log("ERR GETTING TOKEN:", err.response);
            })
            .finally(this.createAxiosRefreshTokenInterceptor);
        } else {
            console.log("ERR: REQUESTED REFRESH TOKEN WITHOUT ONE.");
        }
    }

}