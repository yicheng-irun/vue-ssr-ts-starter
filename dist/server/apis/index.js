"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// 这里加上鉴权相关的代码逻辑
router.get('/demo', (req, res) => {
    const testCookie = `${Date.now()}`;
    res.cookie('testCookie', testCookie, {
        maxAge: 1000 * 60,
    });
    res.cookie('testCookie2', testCookie, {
        maxAge: 1000 * 60,
    });
    res.json({
        success: true,
        msg: 'success',
        data: {
            hello: 'world!',
            time: new Date().toLocaleString(),
            query: req.query,
            cookie: req.cookies,
            testCookie,
        }
    });
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2FwaXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFFOUIsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQyxnQkFBZ0I7QUFFaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDN0IsTUFBTSxVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztJQUNuQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUU7UUFDakMsTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFO0tBQ3BCLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRTtRQUNsQyxNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUU7S0FDcEIsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNMLE9BQU8sRUFBRSxJQUFJO1FBQ2IsR0FBRyxFQUFFLFNBQVM7UUFDZCxJQUFJLEVBQUU7WUFDRixLQUFLLEVBQUUsUUFBUTtZQUNmLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRTtZQUNqQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7WUFDaEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPO1lBQ25CLFVBQVU7U0FDYjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDIn0=