import AdminJS, { ActionRequest, ActionResponse } from 'adminjs';

export const CategoryResource = {
    resource: "ENTITY_NAME", // Here Comes the Entity Name
    options:{
        listProperties:['name', 'id', 'typeId'],
        properties:{
            'typeId':{
                isVisible: true
            },
            sizeId:{
                // Here We are using a Custom-Component for Showing an Alternative UI for default UI provided by AdminJS.
                components:{ 
                    // edit: AdminJS.bundle('../components/CustomSizeSelect')
                },
                // Here we are using "reference" property provided by AdminJS.
                // It links the RelationId provided in TypeORM Entity Declaration File.
                // It is used in Many-To-Many and One-To-Many relations.
                reference: 'ENTITY_NAME',
                isVisible: true,
                // Here the data comes in Array due to M2M and O2M relations
                isArray: true
            },
            
        },
        actions:{
            edit:{
                after: async(response: ActionResponse, request: ActionRequest)=>{
                    if(request.payload.id){
                        // Here comes the code which we save in Database.
                        // AdminJS does not perform the actions related to Many-To-Many and One-To-Many relations.
                        // So in here we write the TypeORM query and save the actions as need manually.
                    }
                    return response;
                }
            }
        }
    }
}