import * as CryptoJS from 'crypto-js';

const getSecret = () => {
    return import.meta.env.VITE_CID_SECRET;
}

export const encryptCid = (cid) => {
    return CryptoJS.AES.encrypt(cid, getSecret()).toString();
}

export const decryptCid = (encryptedCid) => {
    return CryptoJS.AES.decrypt(encryptedCid, getSecret()).toString(CryptoJS.enc.Utf8);
}