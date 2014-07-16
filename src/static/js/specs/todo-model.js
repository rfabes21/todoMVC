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

    it('should succeed', function() {
        var spy = spyOn(ItemView.prototype, 'wantsRemove').and.callThrough();

        var collection = new backbone.Collection();
        var myView = new CompositeView({collection: collection});

        region.show(myView);
        collection.add({label: 'Hi Aubrey'});
        collection.add({label: 'Hi Ryan'});

        var kids = $('.item .actions');
        var view = myView.children.findByIndex(0);

        expect(view.model.get('label')).toBe('Hi Aubrey');

        kids.eq(0).trigger('click');

        expect(spy.calls.count()).toBe(1);
        expect(spy).toHaveBeenCalled();

        view = myView.children.findByIndex(0);
        expect(view.model.get('label')).toBe('Hi Ryan');
    });



}); // Eof describe
}); // Eof define
