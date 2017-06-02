import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { expect } from 'chai';

const Google = require('googleapis');



@suite class GoogleAuthProviderTest {

    @test() 
    testGoogleApiCalls(next:Function) {
        
        // const people = Google.people.people.connections.list({
        //         'resourceName': 'people/me',
        //         'pageSize': 10
        // }).then(function (response:any) {
        //     console.dir(response);
        //     next();
        // });
        
    }

}