const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        responseBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
        minLength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function () {
    return `${this.reactions}`;
  }).set(function(value) {
    const reactions = value.split(' ');
    this.reactions = reactions;
  });

const Thoughts = model('thought', thoughtSchema);

module.exports = Thoughts;