const router = require("express").Router();
const auth = require("../middleware/auth");
const db = require("../models");
const sendMail = require("../middleware/email");

router.post("/createticket", auth, (req, res) => {
    try{

        const user_id = req.session.passport.user;
        console.log(req.body)
        const {short_description, long_description, category} = req.body;
        
        let m = new Date();    
        let ticket_number = user_id + m.getUTCFullYear().toString() + (m.getUTCMonth()+ 1).toString() + m.getUTCDate().toString()  + m.getHours().toString() + m.getUTCSeconds().toString(); 
        
        let status = "open";
        if(!short_description || !long_description || !category){
            res.status(400).send( {message: "Please fill out the entire form"} );
        }else{
            db.Ticket.create({
                user_id,
                ticket_number,
                short_description,
                long_description,
                status,
                category
            })
            .then(data => {
                const { ticket_number } = data;
                res.json({
                    ticket_number,                
                });
                sendMail.userAlert(data);
            })
            .catch(err => console.log(err));        
        }
    }
    catch(err){
        console.log(err);
    }
})

router.get("/ticketdetails/:ticket_number", auth, async (req,res) => {
    try{

        const{ticket_number} = req.params;
        if(!ticket_number){
            res.status(400).send({message: "no ticket number provided"});
        }else{
            const ticket = await db.Ticket.findOne({where:{ticket_number}});
            let comments = await db.Ticketcomments.findAll({
                where:{ticket_number},
                order:[
                    ["createdAt", 'ASC']
                ]
            });
            
            for (let index = 0; index < comments.length; index++) {
                
                const id = comments[index].user_id;
                const user = await db.User.findOne({where: {id}});
                console.log(user.username);
                comments[index].setDataValue('username', `${user.username}`);
                
            }          
            res.json({ticket, comments});
        }
    }
    catch(err){
        console.log(err);
    }

})

router.get("/mytickets", auth, async (req,res) => {

    try {
        const user_id = req.session.passport.user;
        db.Ticket.findAll({
            where: {
                user_id            
            },
            order: [
                ['createdAt', 'DESC']
            ]
            
        })
        .then(data => res.json(data))
        .catch(err => console.log(err));        
    } catch (error) {
        console.log(error)
    }
})

router.post("/submitcomment", auth, async (req,res)=>{
    try {
        console.log(req.body);       
        const { comment, ticket_number, ticket_id, user_id } = req.body;
        db.Ticketcomments.create({
            comment,
            ticket_number,
            ticket_id,
            user_id
        })
        .then(data => res.sendStatus(200))
        .catch(err => console.log(err));
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;