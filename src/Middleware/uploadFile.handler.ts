import * as aws from "aws-sdk";

aws.config.update({
    accessKeyId: "AWS_ACCESS_KEY_ID",
    secretAccessKey: "AWS_SECRET_ACCESS_KEY",
});
const s3 = new aws.S3({
    signatureVersion: 'v4',
    region: 'AWS_REGION'
});
export const getImageData = async(key)=>{
    const url = s3.getSignedUrl('getObject',{
        Bucket: 'AWS_BUCKET',
        Key: key, // AWS Key stored in AWS Server
        Expires: 'EXPIRY TIME OF URL===>>>>> Comes in Integer Format'
    })
    return url;
}