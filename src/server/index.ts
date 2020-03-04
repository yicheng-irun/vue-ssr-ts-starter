import createApp from './app';
import settings from './settings';

async function start (): Promise<void> {
    const app = await createApp();
    const { host, port } = settings;

    app.listen(port, host, () => {
        console.log(`server is listening on ${host}:${port}`);
    });
}

start().catch(console.error);
