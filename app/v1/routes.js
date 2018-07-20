require('express-group-routes');
const express = require('express');
const router = express.Router();

const authMiddleware = require('./middlewares/auth');
const userMainController = require('./user/controllers/main');
const userPostController = require('./user/controllers/post');
const userApplicationController = require('./user/controllers/application');
const courseMainController = require('./course/controllers/main');
const mentorshipMainController = require('./mentorship/controllers/main');
const mentorController = require('./mentor/controllers/main');
const topicController = require('./topic/controllers/main');
const badgeController = require('./badge/controllers/main');
const postController = require('./post/controllers/main');




router.group('/user', (router) => {
    router.get("/",authMiddleware.global, userMainController.getUser );
    router.get("/:id",authMiddleware.global, userMainController.getById );

    router.post("/register", userMainController.register);
    router.get("/confirm/:token", userMainController.confirm );
    router.put("/update", authMiddleware.global, userMainController.update);
    router.put("/update/password", authMiddleware.global, userMainController.updatePassword);
    router.post("/restore/password", userMainController.restorePassword);
    router.post("/restore/:token", userMainController.restore);
    router.post("/login", userMainController.login);

    router.put("/block", authMiddleware.admin, userMainController.block);
    router.put("/activate", authMiddleware.admin, userMainController.activate);

    router.get("/applications", authMiddleware.global, userApplicationController.getAll);
    router.get("/mentorships", authMiddleware.global, userMainController.getMentorships);
    router.get("/posts", authMiddleware.global, userPostController.getAll);

});


router.group('/post', (router) => {
    router.get("/",authMiddleware.global, postController.getAll );
    router.put("/popular", authMiddleware.global, postController.moreVoted);
    router.put("/unpopular", authMiddleware.global, postController.lessVoted);
    router.get("/:id", authMiddleware.global, postController.getPost);
   
    router.post("/create", authMiddleware.global, postController.create);
    router.put("/update", authMiddleware.global, postController.update);
    router.get("/delete/:id", authMiddleware.global, postController.delete);

    router.get("/vote/:id", authMiddleware.global,postController.vote);
    router.get("/vote/delete/:id", authMiddleware.global,postController.deleteVote);

});

router.group('/application', (router) => {
    router.get("/:id", authMiddleware.global, userApplicationController.getApplication);
    router.post("/create", authMiddleware.global, userApplicationController.create);
    router.put("/update", authMiddleware.global, userApplicationController.update);
    router.get("/cancel/:id", authMiddleware.global, userApplicationController.cancel);

});

router.group('/mentorship', (router) => {
    router.get("/:id", authMiddleware.global, mentorshipMainController.getMentorship);
    router.post("/create", authMiddleware.global, mentorshipMainController.create);
    router.put("/update", authMiddleware.global, mentorshipMainController.update);
    router.get("/cancel/:id", authMiddleware.global, mentorshipMainController.cancel);

});

router.group('/mentor', (router) => {
    router.get("/",authMiddleware.global, mentorController.getAll );
    router.get("/create/:id", authMiddleware.admin, mentorController.create);
    router.get("/delete/:id", authMiddleware.admin, mentorController.delete);
    router.get("/mentorships", authMiddleware.global, mentorController.getMentorships);

    router.post("/topic/create", authMiddleware.global, mentorController.createTopic);
    router.post("/topic/delete", authMiddleware.global, mentorController.deleteTopic);

});

router.group('/course', (router) => {
    router.get("/",authMiddleware.global, courseMainController.getAll );
    router.get("/:id", authMiddleware.global, courseMainController.getCourse);
    router.post("/create", authMiddleware.admin, courseMainController.create);
    router.put("/update", authMiddleware.admin, courseMainController.update);
    router.get("/delete/:id", authMiddleware.admin, courseMainController.delete);

});

router.group('/topic', (router) => {
    router.get("/", authMiddleware.global, topicController.getAll );
    router.get("/:id", authMiddleware.global, topicController.getTopic );
    router.post("/create", authMiddleware.admin, topicController.create);
    router.put("/update", authMiddleware.admin, topicController.update);
    router.get("/delete/:id", authMiddleware.admin, topicController.delete);

});

router.group('/badge', (router) => {
    router.get("/", authMiddleware.global, badgeController.getAll );
    router.get("/:id", authMiddleware.global, badgeController.getBadge);
    router.post("/create", authMiddleware.admin, badgeController.create);
    router.put("/update", authMiddleware.admin, badgeController.update);
    router.get("/delete/:id", authMiddleware.admin, badgeController.delete);

});



module.exports = router;
