const Message = require("../models/Message");

const create = async (req, res) => {
  try {
    const { conversationId, sender, body, image } = req.body;

    const newMessage = new Message({
      conversationId,
      sender,
      body,
      image
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessagesOfConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({
      conversationId
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, getMessagesOfConversation };
