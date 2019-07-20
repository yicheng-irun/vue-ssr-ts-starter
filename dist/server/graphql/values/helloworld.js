"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * helloworld示例
 */
function helloworld({ say }, req) {
    return __awaiter(this, void 0, void 0, function* () {
        throw new Error('啊啊啊');
        return {
            result: `Hello World! Say:${say}, path ${req.originalUrl}`,
        };
    });
}
exports.default = helloworld;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG93b3JsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvZ3JhcGhxbC92YWx1ZXMvaGVsbG93b3JsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUE7O0dBRUc7QUFDSCxTQUE4QixVQUFVLENBQUUsRUFBRSxHQUFHLEVBQW1CLEVBQUUsR0FBWTs7UUFDNUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixPQUFPO1lBQ0gsTUFBTSxFQUFFLG9CQUFvQixHQUFHLFVBQVUsR0FBRyxDQUFDLFdBQVcsRUFBRTtTQUM3RCxDQUFDO0lBQ04sQ0FBQztDQUFBO0FBTEQsNkJBS0MifQ==