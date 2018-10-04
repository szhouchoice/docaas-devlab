const {isDebugLogging, Helper } = require('./common/helper');

exports.get_deck_handler = async (event, context, callback) => {
    try {
        let helper = new Helper(event);
        let deckName = helper.getParam("deck");
        if (!deckName) return callback(null, { 'statusCode': 400, 'body': "Deck ID must be provided!" });
        
        let deck = await helper.getDeck(deckName);
        if (!deck) return callback(null, { 'statusCode': 404, 'body': "Deck " + deckName + " not found" });
        callback(null, { 'statusCode': 200, 'body': JSON.stringify(helper.asPublicDeck(deck)) });
    } catch (err) {
        console.log("Failed to Process Request with an \"" + err.code + "\" error:",err.message);
        if (isDebugLogging()) console.log(err.stack);
        callback(err.message, null);
    }
};
