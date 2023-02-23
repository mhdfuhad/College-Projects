const express = require("express");
const router = express.Router();

const Message = require("../models/messageSchema");
const Conversation = require("../models/conversationSchema");

// POST create a new conversation
router.post("/", (req, res) => {
  const newConversation = new Conversation({
    participants: [req.body.sender, req.body.recipient],
    group: false,
  });

  newConversation
    .save()
    .then((conversation) => {
      res.status(201).json(conversation);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST create a new group conversation
router.post("/group", (req, res) => {
  const newConversation = new Conversation({
    participants: req.body.members,
    host: req.body.host,
    group: true,
    conversationName: req.body.groupName,
  });

  newConversation
    .save()
    .then((conversation) => {
      res.status(201).json(conversation);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// PUT add participants to conversation
router.put("/group/member/:id", (req, res) => {
  Conversation.findById(req.params.id)
    .then((conversation) => {
      req.body.participants.forEach((participant) => {
        if (!conversation.participants.includes(participant)) {
          conversation.participants.push(participant);
        }
      });
      conversation
        .save()
        .then((conversation) => {
          res.status(201).json(conversation);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// DELETE remove participant from conversation
router.delete("/group/member/:id", (req, res) => {
  Conversation.findById(req.params.id)
    .then((conversation) => {
      if (conversation.participants.includes(req.body.participant)) {
        conversation.participants.pull(req.body.participant);
        conversation
          .save()
          .then((conversation) => {
            res.status(201).json(conversation);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        res.status(400).json({
          message: "User not in conversation",
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// DELETE leave a conversation
router.delete("/group/leave/:id", (req, res) => {
  Conversation.findById(req.params.id)
    .then((conversation) => {
      if (conversation.host !== req.body.participant) {
        conversation.participants.pull(req.body.participant);
        conversation
          .save()
          .then((conversation) => {
            res.status(201).json(conversation);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        conversation.participants.pull(req.body.participant);
        conversation.host = conversation.participants[0];
        conversation
          .save()
          .then((conversation) => {
            res.status(201).json(conversation);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET conversation
router.get("/", (req, res) => {
  Conversation.findOne({
    participants: { $all: [req.query.sender, req.query.recipient] },
    group: false,
  })
    .then((conversation) => {
      if (conversation) {
        res.status(200).json(conversation);
      } else {
        res.status(404).json({
          message: "Conversation not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET group conversations
router.get("/group", (req, res) => {
  Conversation.find({
    participants: { $in: [req.query.member] },
    group: true,
  })
    .then((conversations) => {
      res.status(200).json(conversations);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// GET all messages for a conversation
router.get("/messages/:conversationId", (req, res) => {
  Message.find({
    conversationId: req.params.conversationId,
  })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// POST create a new message
router.post("/message", (req, res) => {
  const newMessage = new Message(req.body);

  newMessage
    .save()
    .then((message) => {
      res.status(201).json(message);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
