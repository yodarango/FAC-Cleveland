//menu trigger

let open = false;
let openIt = () =>
{
        if (open === false) 
        {
            document.querySelector('.open-menu').style.cssText = 'display: block;';
            document.body.style.cssText = 'height: 100vh; overflow: hidden;'
            open = true;
        }
        else if (open === true) 
        {
            open = false;
            document.querySelector('.open-menu').style.display = 'none';
            document.body.style.cssText = 'overflow: visible;'
        }
}

//send private message popup
const $privateMessage = document.querySelector('#message');

$privateMessage.addEventListener('click', ()=>
{
   const bkg = document.createElement('DIV');
   bkg.setAttribute('class', 'private-message-bkg');
   document.body.appendChild(bkg);
   const box = document.createElement('FORM');
   box.setAttribute('method', 'POST');
   box.setAttribute('action', '/privateMessage')
   box.setAttribute('class', 'private-message-box');
   const parragraph = document.createElement('P');
   parragraph.setAttribute('class', 'standard-parragraph');
   parragraph.innerHTML = "Send us your private prayer request!"
   box.appendChild(parragraph);
   document.body.appendChild(box);
   const input = document.createElement('TEXTAREA');
   input.setAttribute('class', 'private-message-input');
   input.setAttribute('name', 'message')
   box.appendChild(input);
   const button = document.createElement('BUTTON');
   button.setAttribute('class', 'standard-button');
   //const submitMessage = document.querySelector('standard-button')
   button.innerHTML = 'SEND MESSAGE';
   box.appendChild(button);

   bkg.addEventListener('click', ()=>
   {
       bkg.remove();
       box.remove();
   })
   //button.addEventListener('click', (y) =>
//{
//     const actualMessage = y.currentTarget.previousSibling.value;
//    const data = 
//    {
//    privateMessage: actualMessage
//    };
   
//    fetch('/email-us',
//    {
//        method: 'POST',
//        headers: 
//        {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(data),
//    }).then((data)=>
//    {
//        console.log(data)
//    }).catch((e)=>
//    {
//        console.log(e)
//    })
   //console.log(actualMessage)
  // })
})