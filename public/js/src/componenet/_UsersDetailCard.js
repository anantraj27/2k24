
export  function usersTable(data){


    const headers = Object.keys(data[0])
    .map(key => `<th>${key.toUpperCase()}</th>`).join("")

   const user = data 
   .map(row =>{
           
    const cell = Object.values(row)
    .map(value =>`<td>${String(value)}</td>`).join("");

   return `
   <tr>
     ${cell}
      <td> 
         <button class="accept" data-id="${row.id}">
            Accept
          </button>

          <button class="reject" data-id="${row.id}">
            Reject
          </button>
         </td>
        </tr>
        `}).join("")
  
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