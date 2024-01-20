import { expect, test } from 'vitest';
import { h, hString, DOM_TYPES } from '../h.js';

test('h() creates virtual dom node', () => {
    expect(h('form', { class: 'login-form', action: 'login' }, [])).toEqual({
        tag: 'form',
        props: { class: 'login-form', action: 'login' },
        children: [],
        type: 'element',
    });
});

test('create a string vNode', () => {
    const vNode = hString('test');

    expect(vNode).toEqual({
        type: DOM_TYPES.TEXT,
        value: 'test',
    });
});

test('create an element vNode', () => {
    const tag = 'div';
    const props = { id: 'test' };
    const children = [hString('test')];

    const vNode = h(tag, props, children);

    expect(vNode).toEqual({
        tag,
        props,
        children: [{ type: DOM_TYPES.TEXT, value: 'test' }],
        type: DOM_TYPES.ELEMENT,
    });
});

test('h() filters null children', () => {
    const tag = 'div';
    const props = { id: 'test' };
    const children = [hString('test'), null];

    const vNode = h(tag, props, children);

    expect(vNode).toEqual({
        tag,
        props,
        children: [{ type: DOM_TYPES.TEXT, value: 'test' }],
        type: DOM_TYPES.ELEMENT,
    });
});

test('h() maps strings to text vNodes', () => {
    const vNode = h('div', {}, ['test']);
    expect(vNode).toEqual({
        tag: 'div',
        props: {},
        children: [{ type: DOM_TYPES.TEXT, value: 'test' }],
        type: DOM_TYPES.ELEMENT,
    });
});
