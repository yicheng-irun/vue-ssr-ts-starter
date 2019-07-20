"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("./schema"));
const graphql_1 = require("graphql");
const helloworld_1 = __importDefault(require("./values/helloworld"));
exports.schema = graphql_1.buildSchema(schema_1.default);
exports.rootValue = {
    helloWorld: helloworld_1.default,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2dyYXBocWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBb0M7QUFDcEMscUNBQXNDO0FBQ3RDLHFFQUE2QztBQUVoQyxRQUFBLE1BQU0sR0FBRyxxQkFBVyxDQUFDLGdCQUFZLENBQUMsQ0FBQztBQUVuQyxRQUFBLFNBQVMsR0FBRztJQUNyQixVQUFVLEVBQVYsb0JBQVU7Q0FDYixDQUFDIn0=