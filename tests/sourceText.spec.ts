import { expect } from "chai";
import { SourceText } from "../src";
describe('Source Text Tests', () => {
    const sourceTextTests = [
        {text: '.', expectedLines: 1},
        {text: '.\r\n', expectedLines: 2},
        {text: '.\r\n\r\n', expectedLines: 3},
    ]

    it(`should include last line of input in source text (${sourceTextTests.length} tests)`, () => {
        for(const test of sourceTextTests) {
            const sourceText = SourceText.from(test.text);
            expect(sourceText.lines.length).to.equal(test.expectedLines);
        }
    });
});