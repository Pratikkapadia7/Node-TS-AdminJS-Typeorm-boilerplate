import { BaseProvider } from "@adminjs/upload"
import { UploadedFile } from "adminjs";
import { S3, AWSError } from "aws-sdk";
import { createReadStream } from "fs"
import { getImageData } from "../../Middleware/uploadFile.handler";



class MyProvider extends BaseProvider{
  //Constants used in class
  public s3;

  constructor() {
    super("AWS_BUCKET_NAME"); // Here Goes the AWS Bucket name.
    this.s3 = new S3({
      signatureVersion: 'v4',
      region: "AWS_REGION" // Here goes the Region specified in AWS Console S3
    })
  }

  public async upload(file: UploadedFile, key: string) {
    // The File obtained by AdminJS is not suitable for uploading on AWS Servers.
    //Therefore we create a Read Stream of the file using "fs" library.
    var fileStream = createReadStream(file.path); 
    fileStream.on('error', function(err) {
      console.log('File Error', err);
    });


    this.s3.upload ({
      Bucket: "AWS_BUCKET_NAME", // Here Goes the AWS Bucket name.
      Key: key,
      Body: fileStream
    }, function (err: AWSError) {
      if (err) {
        console.log("Error", err);
      }
    });
  }

  public async delete(key: string) {
    this.s3.deleteObject({
      Bucket: "AWS_BUCKET_NAME",
      Key: key,
    }, function(err: AWSError) {
      if (err) console.log(err, err.stack);  // error
    });
    return true
  }

  public async path(key) {
    // Here we get a Signed URL from AWS and we return the path to AdminJS where we can see the image in SHOW API.
    const url = getImageData(key); 
    return url
  }
}
export {MyProvider};