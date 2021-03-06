// @flow
import React from 'react';
import log from 'loglevel';
import ThumbnailFieldTransformer from '../../fieldTransformers/ThumbnailFieldTransformer';

const thumbnailTransformer = new ThumbnailFieldTransformer();

jest.mock('loglevel', () => ({
    error: jest.fn(),
}));

test('Test undefined', () => {
    expect(thumbnailTransformer.transform(undefined)).toBe(null);
});

test('Test string', () => {
    expect(thumbnailTransformer.transform('Test1')).toBe(null);
    expect(log.error).toBeCalledWith('Invalid type given: "string". "object" is needed.');
});

test('Test number', () => {
    expect(thumbnailTransformer.transform(5)).toBe(null);
    expect(log.error).toBeCalledWith('Invalid type given: "number". "object" is needed.');
});

test('Test invalid object', () => {
    expect(thumbnailTransformer.transform({test: 'test'})).toBe(null);
    expect(log.error).toBeCalledWith('Object needs property "sulu-40x40".');
});

test('Test valid object', () => {
    expect(thumbnailTransformer.transform({'sulu-40x40': '/path/to/image.png'})).toEqual(
        <img alt={undefined} src="/path/to/image.png" />
    );
});
