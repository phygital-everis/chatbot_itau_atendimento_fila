import { Message } from "./message.model";
export class Serializer {
    fromJson(json: any): Message {
        const message = new Message();
        message.id = json.id;
        message.text = json.text;

        return message;
    }

    toJson(message: Message): any {
        return {
            id: message.id,
            text: message.text
        };
    }
}