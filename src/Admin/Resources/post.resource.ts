
import uploadFileFeature from "@adminjs/upload";
import { ActionRequest, ActionResponse } from "adminjs";
import { MyProvider } from "../Handlers/upload.handler";
import { userHandler } from "../Handlers/user.handler";
const PostResource = {
    resource: "ENTITY NAME", // Here comes the Entity Name
    features:[
        uploadFileFeature({
            validation:{
                // Same Validation as in User Resource
            },
            // This is a custom Provider.
            // AdminJS provides a AWSProvider but have config errors so we are using our custom provider
            // IMPORTANT::::::
            // For making new MyProvider() work change all tsconfig.json "target" field to the tsconfig.json "target" field
            // as provided in both adminJS and @adminJS/upload
            provider: new MyProvider(), 

            properties: {
              file: `images`,
              filePath: `images.filepath`,
              filesToDelete: `images.toDelete`,
              filename: `images.filename`,
              mimeType: `images.mimeType`,
              bucket: `images.bucket`,
              size: `images.size`,
              key: `images.key`
            },
            uploadPath: (record,filename)=> {
                const ext = filename.split('.').pop()
                const fileName = Date.now().toString()+"."+ext;
                return `${fileName}`
            }
        })],
    options:{
        listProperties: ['id','userId','categoriesId','unitId'],
        properties:{

            // The whole commented Section is optional.
            // All the Relations are visible because we have assigned Columns in TypeORM entity declaration file.
            // The below code is necessary if @RelationId is used in TypeORM entity declaration file.

            // 'userId': {
            //     isVisible: true,
            // },
            // 'images':{
            //     isVisible: true,
            //     type: 'mixed'
            // },
            // 'categoriesId': {
            //     isVisible: true
            // },
            // 'sizeId': {
            //     isVisible: true
            // },
            // 'gradeId': {
            //     isVisible: true
            // },
            // 'salesTypeId': {
            //     isVisible: true
            // },
            // 'areaTypeId': {
            //     isVisible: true
            // },
            // 'unitId': {
            //     isVisible: true
            // },
            // 'quantityTypeId': {
            //     isVisible: true
            // },
            'post_type': {
                // Here Post_Type is an ENUM so we use AdminJS property called availableValues.
                // It gives a label to the values as per the requirement.
                availableValues:[{
                    label: 'Selling',
                    value: 1
                },
                {
                    label: 'Buying',
                    value: 2
                }]
            }
        },
        actions:{
            list:{
                after: async (request: ActionRequest) => {
                    request = userHandler(request, 'LIST');
                    return request;
                }
            },
            show:{
                after: async (request: ActionRequest) => 
                {
                    request = userHandler(request,'SHOW'); 
                    return request;
                }
            },
            edit:{
                after: async (request: ActionRequest) => 
                {
                    request = userHandler(request,'EDIT');
                    return request;
                }
            },
            search:{
                after: async (request: ActionRequest) => 
                {
                    request = userHandler(request,'SEARCH'); 
                    return request;
                }
            }
        }
    }
}
export default PostResource;