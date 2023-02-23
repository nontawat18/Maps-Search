import config from "@/config";

export default function({ $axios, redirect, $toast, $auth, $store }, inject) {
    const fixedKeyApi = $axios.create({
        baseURL: config.apiUrl,
        headers: {
            'content-type': 'application/json',
            Authorization: "Token " + config.token,
        }
    });


    inject("fixedKeyApi", fixedKeyApi);


}