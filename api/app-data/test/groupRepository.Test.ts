import 'reflect-metadata';
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { expect } from 'chai';
import { DbConfig, GroupRepository } from '../src';

const DEFAULT_DB_CONFIG = require('./db/config.json');

@suite class GroupRepositoryTest {

    repository:GroupRepository;

    before() { 
        const dbConfig = new DbConfig( DEFAULT_DB_CONFIG );
        
        const repository = new GroupRepository();

        console.dir(repository);
        // this.repository = new GroupRepository();
        // this.repository.dbConfig = dbConfig;
    }


    @test testFindGroupById() {

        //  return this.repository.getById(1).then(data => {
        //     expect(data).to.be.an('object');
        //     expect(data).to.be.deep.eq({ id: 1, name: 'Administrators' });
        // });
    }


    @test testFindGroupByName() {

        // return this.repository.find('Admin', 1, 30)
        //     .then(data=> {
        //         expect(data).to.be.an('array');
        //         expect(data.length).to.equal(1);
        //         expect(data).to.be.deep.eq([ { id: 1, name: 'Administrators' } ]);                
        //     });
    }


    
}