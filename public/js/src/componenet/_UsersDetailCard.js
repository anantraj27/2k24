
export  function usersTable(data){


    const headers = Object.keys(data[0])
    .map(key => `<th>${key.toUpperCase()}</th>`).join("")

   const user = data 
   .map(row =>{
           
    const cell = Object.values(row)
    .map(value =>`<td>${String(value)}</td>`).join("");

   }).join("")
  
return`  
         <thead>
         <tr>
           ${headers}
         </tr>  
         </thead>
        <tbody  >
          ${user}
        </tbody>
`;

}