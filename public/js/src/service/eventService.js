import { get ,post } from "./api.js"

export async function userDetails(url){

 return get(url);
}

export async function createEvent(data){

return post("/admin/scheduled-events/add",data);
}
