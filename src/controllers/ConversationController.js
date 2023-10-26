const Conversation = require("../models/Conversation");
const Message = require('../models/Message')
const User = require('../models/User')
const create = async (req, res) => {
  try {
    const { users } = req.body;
    const newConversation = new Conversation({
      users
    });

    const savedConversation = await newConversation.save();
    res.status(201).json({conversation: savedConversation});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { messageId } = req.body;
    const { conversationId } = req.params
    const conversation = await Conversation.findById(conversationId);
    if (!conversation){ 
      return res.status(404).send('No conversation with this id found');
    }

    conversation.lastMessageAt = Date.now();
    conversation.messages = [...conversation.messages, messageId];

    await conversation.save();

    res.status(201).json({message: "update successful"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { conversationId } = req.params
    const conversation = await Conversation.findById(conversationId);
    if (!conversation){ 
      return res.status(404).send('No conversation with this id found');
    }

    await conversation.deleteOne();

    res.status(200).json({ message: "delete successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getList = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      users: { $in: [req.user] },
    });
    if (!conversations)
      return res.status(204).json({ message: "no conversation is gotten" });
    
    res.status(200).json({conversations});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, update, remove, getList };
