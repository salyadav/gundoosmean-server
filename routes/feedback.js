const router = require('express').Router();
const path = require('path');

let Feedback = require(path.join(__dirname, '../models/feedback.model'));

router.route('/submitFeedback').post((req, res) => {
    const username = req.body.username;
    const feedback = req.body.feedback;
    const email = req.body.email.length ? req.body.email : null;
    const userFeedback = new Feedback({
        username, feedback, email
    });
    userFeedback.save()
        .then(() => {
            console.log('Feedback submitted successfully');
            return res.json('Feedback submitted!');
        })
        .catch(err => {
            console.log("Error submitting the feedback: " + err);
            return res.status(400).json('Error: ' + err);
        });
});

module.exports = router;