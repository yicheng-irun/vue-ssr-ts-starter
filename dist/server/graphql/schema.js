"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gql_1 = __importDefault(require("./gql"));
const schema = gql_1.default `


""" Query 定义 """
type Query {
    """ 这是一个hello world的demo """
    helloWorld(say: String!): helloWorldReturn
}

""" helloWorldReturn的注释 """
type helloWorldReturn {
    """ result 是一个string """
    result: String
}

`;
exports.default = schema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9ncmFwaHFsL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF3QjtBQUN4QixNQUFNLE1BQU0sR0FBRyxhQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7OztDQWVqQixDQUFDO0FBRUYsa0JBQWUsTUFBTSxDQUFDIn0=