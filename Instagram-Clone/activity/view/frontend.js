const search=document.querySelector(".search");
const input=document.querySelector(".uid");
const p=document.querySelector(".entry");
search.addEventListener("click",function(e){
    e.preventDefault();
    populateID(input.value);
})
async function populateID(id){
   let{data}= await axios.get(`api/v1/users/${id}`);
    let user=data.user;
    let{email_id,handle}=user;
   p.innerHTML=`<p>Email: ${email_id}</p><p>Handle: ${handle}`;
}