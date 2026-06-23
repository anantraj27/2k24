export async function  get(api){
        try {
            const response = await fetch(api);

                if(!response.ok){
            
                throw new Error(`HTTP! status code ${response.status}`)
            }        
            return await response.json();
        } 
        catch (error) 
        {   
            console.log(error.message);

            return ;
        }

}

export async function  post(api,data){

        try {

            const response = await fetch(api , {

                "method":"POST",
                "headers":{
                    "Content-Type" :"application/json"
                },
                body:JSON.stringify(data)

            });

                if(!response.ok){
            
                throw new Error(`HTTP! status code ${response.status}`)
            }
                
            return await response.json();
        
        } 
        catch (error) 
        {   
        
            console.log(error.message);

            return ;
        }

}