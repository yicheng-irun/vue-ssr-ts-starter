"use strict";
/**
 * 用来获取app的监听端口
 */
Object.defineProperty(exports, "__esModule", { value: true });
function getPort() {
    if (process.env.NODE_SERVER_PORT) {
        return parseInt(process.env.NODE_SERVER_PORT, 10);
    }
    return 80;
}
exports.default = getPort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmVyL3NlcnZpY2UvZ2V0LXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILFNBQXdCLE9BQU87SUFDM0IsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1FBQzlCLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUE7S0FDcEQ7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFMRCwwQkFLQyJ9