var testsContext = require.context(".", true, /_spec$/);
testsContext.keys().forEach(testsContext);
/*var ld = require('..');

 describe('Module-loaded', function() {
 describe('is-object', function () {
 it('should return -1 when the variable is not an object', function () {
 expect({ld:ld}).to.be.an('object');
 });
 });
 });
 */