"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../apis/index"));
// import settings from '../configs/settings';
// import { request } from 'http';
const router = express_1.default.Router();
// router.get('/', (req: Request, res: Response) => {
//     res.ssrRender('index', {
//         title: 'VUE SSR TS STARTER'
//     });
// });
router.get('/error', (req, res) => {
    throw new Error(`哎呀您好像在找一个错误，那我就顺手给你抛出一个错误吧！`);
});
router.use('/api', index_1.default);
router.get('*', (req, res) => {
    res.ssrHandler({});
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL3JvdXRlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE0QztBQUU1QywwREFBc0M7QUFDdEMsOENBQThDO0FBQzlDLGtDQUFrQztBQUVsQyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2hDLHFEQUFxRDtBQUNyRCwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLFVBQVU7QUFDVixNQUFNO0FBRU4sTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO0FBQ2xELENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsZUFBUyxDQUFDLENBQUM7QUFFOUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDNUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyJ9