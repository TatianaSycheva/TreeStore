import { describe, it, expect } from 'vitest';
import { TreeStore } from '../TreeStore';

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

describe('getAll', () => {
    const expectedValue = [
        { 'id': 1, 'parent': 'root' },
        { 'id': 2, 'parent': 1, 'type': 'test' },
        { 'id': 3, 'parent': 1, 'type': 'test' },
        { 'id': 4, 'parent': 2, 'type': 'test' },
        { 'id': 5, 'parent': 2, 'type': 'test' },
        { 'id': 6, 'parent': 2, 'type': 'test' },
        { 'id': 7, 'parent': 4, 'type': null },
        { 'id': 8, 'parent': 4, 'type': null }
    ];
    const ts = new TreeStore(items);

    it('get all', () => {
        expect(ts.getAll()).toEqual(expectedValue);
    });
});

describe('getItem', () => {
    const expectedValue = { 'id': 7, 'parent': 4, 'type': null };
    const ts = new TreeStore(items);

    it('get item by id = 7', () => {
        expect(ts.getItem(7)).toEqual(expectedValue);
    });
});

describe('getChildren', () => {
    const expectedValue4 = [
        { 'id': 7, 'parent': 4, 'type': null },
        { 'id': 8, 'parent': 4, 'type': null }
    ];
    const expectedValue5 = [];
    const expectedValue2 = [
        { 'id': 4, 'parent': 2, 'type': 'test' },
        { 'id': 5, 'parent': 2, 'type': 'test' },
        { 'id': 6, 'parent': 2, 'type': 'test' }
    ];

    const expectedValue2All = [
        { 'id': 4, 'parent': 2, 'type': 'test' },
        { 'id': 5, 'parent': 2, 'type': 'test' },
        { 'id': 6, 'parent': 2, 'type': 'test' },
        { 'id': 7, 'parent': 4, 'type': null },
        { 'id': 8, 'parent': 4, 'type': null }
    ];


    const ts = new TreeStore(items);

    it('get children by id = 4 ', () => {
        expect(ts.getChildren(4)).toEqual(expectedValue4);
    });

    it('get children by id = 5 ', () => {
        expect(ts.getChildren(5)).toEqual(expectedValue5);
    });

    it('get children by id = 2 ', () => {
        expect(ts.getChildren(2)).toEqual(expectedValue2);
    });

    it('get all children by id = 2 ', () => {
        expect(ts.getAllChildren(2)).toEqual(expectedValue2All);
    });
});


describe('getParent', () => {
    const expectedValue = [
            { 'id': 4, 'parent': 2, 'type': 'test' },
            { 'id': 2, 'parent': 1, 'type': 'test' },
            { 'id': 1, 'parent': 'root' }
        ];
    const ts = new TreeStore(items);

    it('get all parents by id = 7', () => {
        expect(ts.getAllParents(7)).toEqual(expectedValue);
    });
});
