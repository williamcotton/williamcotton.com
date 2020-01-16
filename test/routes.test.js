/* global describe, test, expect */
require('dotenv').config();

const routes = require('../src/routes');

describe('routes', () => {
  test('draws routes', () => {
    expect(routes).toEqual([
      { children: [], label: 'front-page', type: 'root' },
      { children: [], label: 'articles', only: ['show'], type: 'resources' },
      {
        children: [],
        label: 'contact',
        only: ['index', 'create', 'show'],
        type: 'resources'
      },
      {
        children: [
          {
            children: [
              {
                children: [],
                label: 'liked-reviews',
                only: ['create'],
                type: 'resources'
              }
            ],
            label: 'reviews',
            only: ['index', 'show'],
            type: 'resources'
          }
        ],
        label: 'demo',
        type: 'namespace'
      },
      {
        action: 'show',
        children: [],
        controller: 'pages',
        label: '*',
        type: 'match'
      },
      {
        action: 'notFound',
        children: [],
        controller: 'errors',
        label: 404,
        type: 'error'
      },
      {
        action: 'serverError',
        children: [],
        controller: 'errors',
        label: 500,
        type: 'error'
      }
    ]);
  });
});
