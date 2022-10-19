/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
    rootDir: '.',
    roots: ['src'],

    // match ts files only
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },

    // coverageReporters: ['json'],
    coverageDirectory: '../coverage',
    collectCoverageFrom: ['**/*.(t|j)s', '!**/*.module.(t|j)s'],
    coveragePathIgnorePatterns: [
        'dist',
        'node_modules',
        '.module.ts$',
        '.spec.ts$',
        '.setup.ts$',
        '<rootDir>/src/main.ts',
        '__mocks__',
    ],

    testRegex: '.*\\.spec\\.ts$',
    testEnvironment: 'node',

    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleDirectories: ['node_modules'],

    // to fix "jest-haste-map: duplicate manual mock found: index" warning.
    // https://github.com/facebook/jest/issues/2070
    modulePathIgnorePatterns: ['<rootDir>/src/.*/__mocks__'],
}
