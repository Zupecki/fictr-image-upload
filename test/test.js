var assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect;
const foo = 'bar';
var beverages = { tea: ['chai', 'matcha', 'oolong'] };

describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            assert.equal([1,2,3].indexOf(4), -1);
            expect([1,2,3].indexOf(4)).to.equal(-1);
            [1,2,3].indexOf(4).should.equal(-1);
        });
    });
});

it('double done', (done) => {
    // Calling `done()` twice is an error
    setImmediate(done);
    //setImmediate(done);
});

it('expect tests', () => {
    expect(foo).to.be.a('string');
    expect(foo).to.equal('bar');
    expect(foo).to.have.lengthOf(3);
    expect(beverages).to.have.property('tea').with.lengthOf(3);
});


it('should tests', () => {
    foo.should.be.a('string');
    foo.should.equal('bar');
    foo.should.have.lengthOf(3);
    beverages.should.have.property('tea').with.lengthOf(3);
});

describe('should tests', () => {
    it('one liners', () => {
        foo.should.be.a('string');
        foo.should.equal('bar');
        foo.should.have.lengthOf(3);
        beverages.should.have.property('tea').with.lengthOf(3);
    });
    describe('functions', () => {
        it('should and shouldn\'t exist', (err = new Error(), doc = {}) => {
            should.exist(err); //instead of err.should.not.exist, null and undefined not extended with should chain starter
            should.exist(doc);
            doc.should.be.an('object');
        });
    });
});
