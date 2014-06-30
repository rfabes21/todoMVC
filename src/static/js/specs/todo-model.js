define(function(require, exports, module) {

// Imports

var Todo = require('app/todo/models/todo').Todo;

describe('Todo Model', function() {


    // Set Up

    beforeEach(function() {
    });

    afterEach(function() {
    });

    // Helpers

    function getOptions(augments) {
        augments = augments || {};

        var testSuiteDefaults = {
        };

        return _.extend(testSuiteDefaults, augments);
    }

    it('toggles completed attribute', function(){
        var todo = new Todo({
            label: 'foo'
        });
        todo.toggleCompleted();
        expect(todo.toJSON().completed).toBe(true);
    });


}); // Eof describe
}); // Eof define
