"use strict";
/**
 * 默认是dev环境
 */
Object.defineProperty(exports, "__esModule", { value: true });
const settings = {
    isDev: true,
    isTest: false,
    isProd: false,
};
if (process.env.NODE_ENV === 'production') {
    Object.assign(settings, {
        isDev: false,
        isTest: false,
        isProd: true,
    });
}
exports.default = settings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL2NvbmZpZ3Mvc2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILE1BQU0sUUFBUSxHQUFHO0lBQ2IsS0FBSyxFQUFFLElBQUk7SUFDWCxNQUFNLEVBQUUsS0FBSztJQUNiLE1BQU0sRUFBRSxLQUFLO0NBQ2hCLENBQUM7QUFFRixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtJQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNwQixLQUFLLEVBQUUsS0FBSztRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsTUFBTSxFQUFFLElBQUk7S0FDZixDQUFDLENBQUM7Q0FDTjtBQUVELGtCQUFlLFFBQVEsQ0FBQyJ9