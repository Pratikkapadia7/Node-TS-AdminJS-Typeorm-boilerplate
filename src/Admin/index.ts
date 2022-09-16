// Use of Require is done as of now because IMPORT was not working at the time of setup.
// But in older versions it works fine and maybe in Newer versions it may work fine.
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
import {Database, Resource} from '@adminjs/typeorm';

const initializeAdminjs = async (connection) => {
    AdminJS.registerAdapter({Database, Resource});
    const adminJs = new AdminJS({
        resources: [
        //All Resources Files are to be included in here.
        ],
        rootPath: '/admin', //{baseURL}/admin will be the access URL for admin.
        locale: {
            language: 'en',
            translations: {
                labels: {
                    User: 'Users',
                },
                resources: {
                User: {
                    properties: {
                        'user.id': 'User', // For changing the Column name from Default User Id to "User"
                    },
                },
                Category:{
                    // Reference should be used for giving Reference between 2 Entities.
                    // It is generally used for One-To-Many and Many-To-Many Relations.
                    // For Many-To-One and One-To-One use columns instead of relationId in Entity Declaration file.
                    // Most IMPORTANT use the same name as the Column Name in DATABASE.


                    // Example for Many-To-One :::
                    // @ManyToOne(()=>Size, size=> size.posts)
                    // @JoinColumn()
                    // size: Size;

                    // @Column({nullable:true})
                    // sizeId: number;

                    // Example for One-To-Many and Many-To-Many ::::
                    // @ManyToMany(() => Size,{onDelete: 'CASCADE', nullable:true})
                    // @JoinTable({})
                    // size: Size[];

                    // @RelationId((category: Category)=> category.size)
                    // // @Column()
                    // sizeId: [];

                    reference: "ENITIY" //Here Comes Entity Name which have relations
                }
                },
            }
        },
    });
    const adminJSRouter = AdminJSExpress.buildRouter(adminJs);
    return { adminJs, adminJSRouter };
};
export default initializeAdminjs;

  