const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String
        },
        createdBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        size: {
            type: String,
            default: 'Large'
        },
        toppings: [],
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            get: (createdAtVal) => dateFormat(createdAtVal)
        }],
    },    
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        }
);

PizzaSchema.virtual('commentCount').get(function() {

        return this.comments.reduce((total, comment)=> total + comment.replies.length +1, 0)
    
});

const Pizza = model ('Pizza', PizzaSchema)

module.exports = Pizza;