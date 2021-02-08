//open page editor sections 
let isOpenEditor = false;
const $openEditor = document.querySelectorAll('.cross-wrapper');

$openEditor.forEach((element)=>
{
    element.addEventListener('click', (x)=>
    {
     let e = x.currentTarget.parentNode.parentNode.querySelector('.hidding-element');
     let e2 = x.currentTarget.parentNode.querySelector('.save');
     if (isOpenEditor === false)
     {
        e.style.display = 'block';
        e2.style.display = 'inline'
        isOpenEditor = true;
     }
     else if (isOpenEditor === true)
     {
        e.style.display = 'none';
        e2.style.display = 'none'
        isOpenEditor = false;
        console.log(e2)
     }
 
})
});

//posting routes 
const announcementSave = document.querySelectorAll('.save');

announcementSave.forEach((element)=> {
   element.addEventListener('click', (x)=>
{
   //close div upon saveing
   let e = x.currentTarget.parentNode.parentNode.querySelector('.hidding-element');
   let e2 = x.currentTarget.parentNode.querySelector('.save');
   let isOn = document.querySelector('#on-off').value;
   let e3 = e.firstElementChild.value;
   let e4 = e.firstElementChild.nextElementSibling.value
   let e5 = e.firstElementChild.nextElementSibling.nextElementSibling.value;
   e.style.display = 'none';
   e2.style.display = 'none'
   isOpenEditor = false;

   console.log(isOn)
   
   const data = {
      title: e3,
      content: e4,
      type: e.id,
      isOn
   }
   fetch(`/account/${e.id}`, 
   {
      method: 'PUT',
      headers: 
      {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
   }).then((data)=>
   {
      //console.log(data)
   }).catch((error)=>
   {
      console.log(error)
   })
  // console.log(data)
})
})
