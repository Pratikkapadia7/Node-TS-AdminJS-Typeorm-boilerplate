// This a custom Handler which changes the title of Element to the desired parameter.
// There might be requirement of showing User-Email instead of UserID.
// Change any field as required.

export const userHandler = (data, page: string)=>{
    if(page === 'LIST' ){
        data.records.forEach(element => {
            element.populated.userId.title = element.populated.userId.params.email;
        });
        return data
    }
    else if(page === 'SHOW' || page === 'EDIT'){
        data.record.populated.userId.title = data.record.populated.userId.params.email;
        // console.log("record data===>>>", data.record.params);
        return data;
    }
    else if(page === 'SEARCH'){
        data.records.forEach(element => {
            element.title = element.params.email;
        });
        return data;
    }
    
}