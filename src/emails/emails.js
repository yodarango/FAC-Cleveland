const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

const sendContactEmail = (name, phone, email, message) =>
{
    sgMail.send(
        {
            to: 'paradymuseless@gmail.com',
            from: 'rangel_lakers26@hotmail.com',
            subject: `${name} has sent you an email`,
            text: `${message} \n\nsender information: \n${name} \n${phone} \n${email}`
        }
    ).then(()=>
    {
        console.log('sent')
    }).catch((e)=>
    {
        console.log(e)
    })
}

const sendPrivateMessage = (message)=>
{
sgMail.send(
    {
        to: 'paradymuseless@gmail.com',
        from: 'rangel_lakers26@hotmail.com',
        subject: `You have a new private message`,
        text: message
    }
).then(()=>
{
    console.log('private message sent')
}).catch((e)=>
{
    console.log(e)
})
}
module.exports = {sendContactEmail, sendPrivateMessage}