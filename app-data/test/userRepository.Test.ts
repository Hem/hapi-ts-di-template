import 'reflect-metadata';

import { IUserRepository } from 'app-data-contracts';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { expect } from 'chai';
import { DbConfig, UserRepository } from "../src";

const DEFAULT_DB_CONFIG = require('./db/config.json');



@suite class UserRepositoryTest {

    repository:UserRepository;

    constructor() { 
        const dbConfig = new DbConfig( DEFAULT_DB_CONFIG );
        this.repository = new UserRepository();
        this.repository.dbConfig = dbConfig;
    }

    after() { }


    @test testFindUserbyId() {

         return this.repository.getById(1).then(data => {
            expect(data).to.be.an('object');
            expect(data).to.be.deep.eq({ id: 1, name: 'Hem' });
        });
    }


    @test testFindByName() {

        return this.repository.find('john', 1, 30)
            .then(data=> {
                expect(data).to.be.an('array');
                expect(data.length).to.equal(1);
                expect(data).to.be.deep.eq([ { id: 2, name: 'John' } ]);                
            });
    }


    
}