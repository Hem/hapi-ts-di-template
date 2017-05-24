import * as domain from 'domain';
import * as Hapi from 'hapi';
import { injectable } from 'inversify';

const jwt = require('jsonwebtoken');

@injectable()
export class AuthController {

    authenticateUser(request: Hapi.Request, reply: Hapi.ReplyWithContinue) {

        // get user login && password
        const session = {
            domain:"localhost",
            "userId": 100,
            "displayName": "hem dog",
            "userName": "Hem Talreja",
            "email": "hemtalreja@gmail.com",
            "google": "123"
        };

        const token = jwt.sign(session, process.env.JWT_SECRET);

        reply("session").state("token", token).header("Authorization", token);
    }

}