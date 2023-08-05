export function decryptData(data){
    let  encryptDataJsonData = Buffer.from(data, 'base64').toString('utf-8');
    return encryptDataJsonData
}
