const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment's _id field
      replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      replyBody: {
        type: String,
        trim: true,
        required: "You need body text for your reply"
      },
      writtenBy: {
        type: String,
        trim: true,
        required: "Tell us who is the creator of this reply!"
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            trim: true,
            required: "Tell us who is the creator of this comment!"
        },
        commentBody: {
            type: String,
            trim: true,
            required: "You need text for the body of your comment!"
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // use reply schema to calidate data for a reply
        replies: [ReplySchema]
    },
    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id:false
    }
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
})

const Comment = model('Comment', CommentSchema);

module.exports = Comment;