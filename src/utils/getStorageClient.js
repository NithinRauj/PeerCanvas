import { Web3Storage } from "web3.storage";

const getStorageClient = () => {
    return new Web3Storage({ token: import.meta.env.VITE_IPFS_STORAGE_TOKEN });
}

export default getStorageClient;