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
