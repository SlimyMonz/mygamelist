const {SENDGRID_API_KEY, express, app, client} = require("../db");
const mongoose = require('mongoose');
const sgMail = require('@sendgrid/mail');
const email_router = express.Router();

sgMail.setApiKey(SENDGRID_API_KEY);

//Call SendGrid's API to send the the verification email
email_router.post('/sendVerification', (req, res) =>
{
    try
    {
        const msg = {
            from: 'shafferj2019@knights.ucf.edu',
            templateId: 'd-ca92eef5f9e643a684dd04bf78448148',
            personalizations: [{
                dynamic_template_data: {
                    userId: req.body.id,
                    firstName: req.body.firstName
                },
                to: req.body.email
            }]
        }
    
        sgMail.send(msg, (error, result) => 
        {
            if(error) 
            {
                res.status(404).send('Email not found');
            }
            else
            {
                res.status(200).send('Email sent');
            }
        });
    }
    catch(e)
    {
      res.status(404).send(e);
    }
})

//Call SendGrid's API to send the password reset email
email_router.post('/passwordReset', async (req, res) =>
{
            //incoming: email
    try
    {     
        let email = req.body.email;

        const db = client.db("MyGameListDB");
        const getUserInfo = await db.collection('Users').find({email:email}).toArray();

        if (getUserInfo.length > 1)
        {
            return res.status(409).send('There are multiple users with this email');
        }
        else if (getUserInfo.length === 0)
        {
            return res.status(404).send('No user with this email has been found');
        }

        console.log(getUserInfo);

        let id = getUserInfo[0]._id;
        let username = getUserInfo[0].userName;

        const msg = {
            from: 'shafferj2019@knights.ucf.edu',
            templateId: 'd-0a0cc042d79c4bd681cc098020e037bc',
            personalizations: [{
                dynamic_template_data: {
                    userId: id,
                    username: username
                },
                to: 'shafferj2019@knights.ucf.edu'
            }]
        }

        await sgMail.send(msg, (error, result) => 
        {
            if(error) 
            {
                return res.status(404).send('Email not found');
            }
            else
            {
                return res.status(200).send('Email sent to: ' + email);
            }
        });
    }
    catch
    {
        res.status(404).send('Error sending email');
    }
})

module.exports = email_router