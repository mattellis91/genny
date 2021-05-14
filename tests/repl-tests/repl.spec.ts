import { assert } from 'chai';
import { Repl } from '../../src/repl/repl';

import 'mocha';

describe('running repl', () => {
    it('run the repl', () => {
        new Repl().main();
    });
});