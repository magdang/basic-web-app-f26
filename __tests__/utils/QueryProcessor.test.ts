import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
        expect(response).toBe("");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
          ));
    });

    
    test('should return Yousef\'s Andrew ID', () => {
        const query = "What is your Andrew ID";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "yousefh!!!!"
          ));
    });

    
    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "Yousef"
          ));
    })
    test.each([
        ["What is 35 plus 64?", "99"],
        ["What is the scrabble score of september?", "15"],
        ["What is 1 plus 83 plus 7?", "91"],
        ["What is 57 multiplied by 21 plus 76?", "1273"],
        ["What is 76 plus 57 multiplied by 21?", "1273"],
        ["What is 2 to the power of 32?", "4294967296"],
        ["What is 82 to the power of 35?", "9626863931461188869957422590261501933525149197700964582250478829568"],
        ["abc: what is 10 plus 37?", "47"],
        ["what is 8 multiplied by 7?", "56"],
        ["what is 8 minus 12?", "-4"],
        ["which of the following numbers is the largest: 3, 20, 7", "20"],
        ["which of the following numbers are primes: 1, 2, 9, 17", "2, 17"],
        ["which of the following numbers are both squares and cubes: 64, 9, 729", "64, 729"],
    ])("answers %s", (query, answer) => {
        expect(QueryProcessor(query)).toBe(answer);
    });
});
