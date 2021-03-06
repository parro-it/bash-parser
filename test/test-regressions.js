'use strict';
const test = require('ava');
const bashParser = require('../src');

test('Redirect should be allowed immediately following argument', t => {
	const result = bashParser('echo foo>file.txt');
	t.deepEqual(result, {
		type: 'list',
		andOrs: [{
			type: 'andOr',
			left: [{
				type: 'simple_command',
				name: 'echo',
				suffix: {
					type: 'cmd_suffix',
					list: [
						'foo',
						{
							type: 'io_redirect',
							op: '>',
							file: 'file.txt'
						}
					]
				}
			}]
		}]
	});
});

test('Equal sign should be allowed in arguments', t => {
	const result = bashParser('echo foo=bar');
	t.deepEqual(result, {
		type: 'list',
		andOrs: [{
			type: 'andOr',
			left: [{
				type: 'simple_command',
				name: 'echo',
				suffix: {
					type: 'cmd_suffix',
					list: [
						'foo=bar'
					]
				}
			}]
		}]
	});
});
