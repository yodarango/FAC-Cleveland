const mongoose = require('mongoose');
const express = require('express');

const {sendContactEmail, sendPrivateMessage} = require('../emails/emails');

const router = new express.Router()

router.use(express.urlencoded({extended: false}))

//databse 
    //schemas
    const postSchema = new mongoose.Schema(
    {
        title: String,
        content: String,
        type: String,
        isOn: Boolean,
        date: Date
    });

    const userSchema = new mongoose.Schema(
    {
        username: String, 
        password: String 
    });

    const User = mongoose.model('User', userSchema);
    const Announcement = mongoose.model('Announcement', postSchema)

//home page 
router.get('/', async (req, res)=>
{
    let announcementType =  await  Announcement.findOne({type: 'announcement'})
    let newsType = await Announcement.findOne({type: 'news'})
    let welcomeType = await Announcement.findOne({type: 'welcome'})
    res.render('index', 
    {
     title: announcementType.title,
     content: announcementType.content,
     Ntitle: newsType.title,
     Ncontent: newsType.content,
     Wtitle: welcomeType.title,
     Wcontent: welcomeType.content
    })
})

// router.post('/', express.json(), async (req, res)=>
// {

// })

router.get('/about', async (req, res)=>
{
    const about = await Announcement.findOne({type: 'about'})
    const pastoralTeam = await Announcement.findOne({type: 'pastoral'})
    res.render('about',
    {
        aTitle: about.title,
        aContent: about.content,
        pTitle: pastoralTeam.title,
        pContent: pastoralTeam.content
    })
    console.log(about)
});
router.get('/believes', (req, res)=>
{
    res.render('believes')
});
router.get('/give', (req, res)=>
{
    res.render('give')
});


router.get('/login', (req, res)=>
{
    res.render('login')
});
router.post('/login', async (req, res)=>
{
    const user = await User.findOne({_id: '60205a9d023ca6906cb52bc7'})
    console.log(user)
    try {
        if(req.body.password === user.password || req.body.username === user.username)
        {
        res.redirect('/account')
        } else{
            res.render('login',
            {
                loginMessage: 'wrong credentials, please try again!'
            })
        }
        }
         catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/email-us', async (req, res)=>
{
    res.render('email-us')
});

router.post('/email-us', (req, res)=>
{
  const {name, phone, email, message} = req.body
  sendContactEmail(name, phone, email, message);
  console.log(req.body);
  res.render('index')
})

router.post('/privateMessage', (req, res)=>
{
    const privateMessage  = req.body.message
    sendPrivateMessage(privateMessage);
    res.render('index');
    console.log(req.body.message)
})

router.get('/account', async (req, res)=>
{
    const anType = await Announcement.findOne({_id: '601871d25638364a3e57cb85'});
    const nType = await Announcement.findOne({_id: '6018739a4af0d74ab7521b30'});
    const wType = await Announcement.findOne({_id: '6019d79285b8c405c80070cc'});
    const aType = await Announcement.findOne({_id: '601872cc5a36f54a962731e9'});
    const pType = await Announcement.findOne({_id: '6019d7c185b8c405c80070ce'});
    res.render('account',
    {
        anTitle: anType.title,
        anContent: anType.content,
        anID: anType._id,
        anCheck: anType.isOn === true ? 'checked' : '',

        nTitle: nType.title,
        nContent: nType.content,
        nID: nType._id,

        wContent: wType.content,
        wTitle: wType.title,
        wID: wType._id,

        aTitle: aType.title,
        aContent: aType.content,
        aID: aType,

        pTitle: pType.title,
        pContent: pType.content,
        pID: pType
    })
});

router.put('/account/:type', express.json(), async (req, res)=>
{
    try{
   let newData = await Announcement.replaceOne({type: req.params.type}, {...req.body})
    console.log(req.params)
    } 
    catch (error)
    {
        res.status(400).send()
    }
})

module.exports = router;