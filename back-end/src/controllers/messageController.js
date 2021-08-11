const MessageModel = require('../modals/message');

exports.saveMessage = async (data) => {
    try {
        const obj = { senderId: data.sender, receiverId: data.receiver, message: data.message }
        const savedMessage = await MessageModel(obj).save();
        if (savedMessage) {
            return { status: 201, message: "message sent", data: savedMessage }
        }
        return { status: 500, message: "message could not sent" }
    } catch (e) {
        console.log("====> error : ", e)
        return { status: 500, message: e }
    }
}


exports.getConversations = async (req, res) => {
    console.log("----> ", req.params)

    // {
    //     senderId: '6112524c921cdb341c050156',
    //     receiverId: '61125236921cdb341c050153'
    //   }
    const { senderId, receiverId } = req.params;
    const chats = await MessageModel.find({
        $or: [
            { $and: [{ senderId }, { receiverId }] },
            { $and: [{ receiverId: senderId }, { senderId: receiverId }] }
        ]
    });
    console.log("===> chats : ", { senderId, receiverId }, chats.length)
    return res.status(200).json({ chats, senderId, receiverId, message: "conversations fetched" });

}

// exports.getConversations = async (data) => {
//    const { senderId, receiverId } = data;
//     const chats = await MessageModel.find({ senderId, receiverId });
//     console.log("===> chats : ", JSON.stringify(chats.length))
//     return {status: 200, chats,senderId, receiverId, message: "conversations fetched" };

// } 