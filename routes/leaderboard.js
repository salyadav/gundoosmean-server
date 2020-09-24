const router = require('express').Router();
const path = require('path');

let Leaderboard = require(path.join(__dirname, '../models/leaderboard.model'));

router.route('/getAll').get((req, res) => {
    console.log("client made a getAll API request... Processing...");
    Leaderboard.find()
    .then(data => {
        return res.json(data); //send top 10 scores in response
    })
    .catch(err => {
        console.error('Error fetching the leaderboard statistics from the database.');
        return res.status(400).json('Error: ' + err);
    });
});

router.route('/deleteUser').delete((req, res) => {
    const userId = req.query.id;
    Leaderboard.deleteOne({ 
        id: userId
    }).then(() => {
        console.log('User with username: ' + username + ' deleted from the db');
        return res.status(200).json('User deleted!');
    }).catch(err => {
        console.log('Error occured while deleting user.');
        return res.status(400).json('Unable to delete user.');
    });
})

router.route('/getTopTen').get((req, res) => {
    console.log("client made a getTopTen API request... Processing...");
    Leaderboard.find()
    .then(data => {
        data.sort((a,b) =>  b.highscore - a.highscore);
        //send top 10 scores in response
        //TODO: also return the current users ranking
        return res.json(data.slice(0, Math.min(10, data.length))); 
    })
    .catch(err => {
        console.error('Error fetching the leaderboard statistics from the database.');
        return res.status(400).json('Error: ' + err);
    });
});

router.route('/getTopTenAndUserRank').get((req, res) => {
    console.log("client made a getTopTen API request... Processing...");
    const username = req.query.username.toLowerCase();
    Leaderboard.find()
    .then(data => {
        data.sort((a,b) =>  b.highscore - a.highscore);
        
        let userRank = 994570; //dummy value
        for(let i=0; i<data.length; i++) {
            if (data[i].username === username) {
                userRank = i+1;
                break;
            }
        }
        return res.json({
            userRank: userRank,
            topTen: data.slice(0, Math.min(10, data.length))
        }); 
    })
    .catch(err => {
        console.error('Error fetching the leaderboard statistics from the database.');
        return res.status(400).json('Error: ' + err);
    });
});

router.route('/checkUsername').get((req, res) => {
    console.log("client made a checkUsername API request... Processing...");

    Leaderboard.exists({
        username: req.query.username.toLowerCase()
    }).then(result => {
        return res.send(result);
    })
    .catch(err => {
        console.error('Error fetching username from database.');
        return res.status(400).json('Error: ' + err);
    });
})

router.route('/submitScore').post((req, res) => {
    console.log("client made a submitScore API request... Processing...");

    const username = req.body.username.toLowerCase();
    const highscore = Number(req.body.highscore);
    Leaderboard.updateOne({
        username: username
    }, {
        highscore: highscore
    },
    {
        upsert: true
    }).then(() => {
        console.log('Successfully submitted the score.');
        return res.json('Leaderboard updated!');
    })
    .catch(err => {
        console.error('Error submitting score.');
        return res.status(400).json('Error: ' + err)
    });
});

module.exports = router;
