/**
 * 用来获取app的监听端口
 */

export default function getPort (): number {
    if (process.env.NODE_SERVER_PORT) {
        return parseInt(process.env.NODE_SERVER_PORT, 10)
    }
    return 80;
}
