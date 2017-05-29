import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { expect } from 'chai';

const Google = require('googleapis');



@suite class GoogleAuthProviderTest {

    @test() 
    testGoogleApiCalls(next) {
        
        const people = Google.people.people.connections.list({
                'resourceName': 'people/me',
                'pageSize': 10
        }).then(function (response) {
            console.dir(response);
            next();
        });
        
    }

}