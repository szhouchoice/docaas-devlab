const { getDeck, createDeck, saveDeck } = require('./deck-dataAccess');

class DAHelper {
    constructor(event) {
        this._event = event;
        this._aws = require('aws-sdk');
        this._aws.config.region = process.env.AWS_REGION || "us-west-2";
        if (this.event && this.event.credentials && this.event.credentials.accessKeyId) {
            this._creds = new this._aws.Credentials(this.event.credentials.accessKeyId, this.event.credentials.secretAccessKey, this.event.credentials.sessionToken);
            this._identityId = this.event.credentials.identityId;
            this._aws.config.credentials = this._creds;
        // } else {
        //     throw new Error("No credentials provided by the invoker - cannot proceed!");
        }
    }

    get event() {
      return this._event;
    }

    get method() {
        return this.event.method;
    }

    get params() {
        return this.event.params;
    }

    get dynamoDbClient() {
        return new this._aws.DynamoDB();
    }

    get credentials() {
        return this._creds;
    }

    async getDeck(name) {
        return getDeck(this.dynamoDbClient, this._identityId, name);
    }
    async saveDeck(deck) {
        return saveDeck(this.dynamoDbClient, this._identityId, deck);
    }
    async createDeck(name) {
        return createDeck(this.dynamoDbClient, this._identityId, name);
    }

  }
  
module.exports.DAHelper = DAHelper;