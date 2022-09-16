import { userHandler } from "../Handlers/user.handler";

const UserResource = {
    resource: "ENTITY NAME", // Here Comes Entity Name
    options:{
        listProperties: ['id', 'name'], // Properties to be listed on the Dashboard of Respective Entity/Resource
        actions:{
            search:{
                after: async(request)=>
                {
                    // Here during the SEARCH API call by AdminJS we are changing the Titles to email
                    request = userHandler(request, 'SEARCH'); 
                    return request
                }
            }
        }
        
    }
}
export default UserResource;