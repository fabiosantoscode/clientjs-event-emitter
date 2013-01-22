(function (window) {
    'use strict';
    test('Create eventemitter', function () {
        var ee = new EventEmitter();
        ok(ee);
    });
    test('on()', function () {
        var ee = new EventEmitter(),
            value = 0;
        ee.on('eventname', function () {
            value += 1;
        });
        equal(value, 0);
        ee.emit('eventname');
        equal(value, 1);
        ee.emit('eventname');
        equal(value, 2);
    });
    test('once()', function () {
        var ee = new EventEmitter(),
            value = 0;
        ee.on('eventname', function () {
            value = 1;
        });
        ee.emit('eventname');
        ee.emit('eventname');
        equal(value, 1);
    });
    test('emit()', function () {
        var ee = new EventEmitter(),
            arr = [];
        ee.on('callme', function (one, two, three) {
            arr = [one, two, three];
        });
        ee.emit('callme', 1, 2, 3);
        deepEqual(arr, [1, 2, 3]);
    });
    test('off()', function () {
        var ee = new EventEmitter(),
            a = function () { ok(false, 'must not be called!'); },
            b = function () { ok(false, 'must not be called!'); };
        ee.once('removeme', a);
        ee.on('removeme2', b);
        ee.off('removeme', a);
        ee.off('removeme2', b);
        ee.emit('removeme');
        ee.emit('removeme2');
        ok(true);
    });
    test('clear()', function () {
        var ee = new EventEmitter(),
            a = function () {ok(false)},
            b = function () {ok(false)};
        ee.on('clearthis2', b);
        ee.once('clearthis', a);
        ee.on('clearthis', b);
        ee.once('clearthis2', a);
        ee.clear();
        ee.emit('clearthis');
        ee.emit('clearthis2');
        ok(true);
    });
}(window));
