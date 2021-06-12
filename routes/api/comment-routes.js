const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// /api/comments/<izzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);

module.exports = router;
