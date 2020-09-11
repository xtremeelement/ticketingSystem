const router = require("express").Router();
const auth = require("../middleware/auth");
const db = require("../models");

router.post("/createticket", auth, (req, res) => {
    
    const user_id = req.session.passport.user;
    
    const {short_description, long_description} = req.body;
    
    let m = new Date();    
    let ticket_number = user_id + m.getUTCFullYear().toString() + (m.getUTCMonth()+ 1).toString() + m.getUTCDate().toString()  + m.getHours().toString() + m.getUTCSeconds().toString(); 
    
    let status = "open";
    if(!short_description || !long_description){
        res.status(400).send( {message: "Please fill out the entire form"} );
    }else{
        db.Ticket.create({
            user_id,
            ticket_number,
            short_description,
            long_description,
            status,
        })
        .then(data => {
            const { ticket_number } = data;
            res.json({
                ticket_number,                
            });
        })
        .catch(err => console.log(err));        
    }
})

router.get("/ticketdetails/:ticket_number", auth, async (req,res) => {
    
    const{ticket_number} = req.params;
    if(!ticket_number){
        res.status(400).send({message: "no ticket number provided"});
    }else{
        const ticket = await db.Ticket.findOne({where:{ticket_number}});
        res.json({ticket});
    }

})

router.get("/mytickets", auth, async (req,res) => {
    const user_id = req.session.passport.user;
    db.Ticket.findAll({
        where: {
            user_id
        }
    })
    .then(data => res.json(data))
    .catch(err => console.log(err));
})


module.exports = router;