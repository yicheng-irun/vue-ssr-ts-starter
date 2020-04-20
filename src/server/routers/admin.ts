import YiAdmin from '../yi-admin';
import YiAdminDemoModel from '../models/demo.model';
import MongooseModelAdmin from '../yi-admin/lib/mongoose-model-admin';

const myadmin = new YiAdmin({});

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'yi-admin-demo',
   model: YiAdminDemoModel,
}));

// (async function () {
//    const t = await YiAdminDemoModel.findOne();
//    console.log(t);

//    const yad = new YiAdminDemoModel();
//    yad.strField = '哈哈哈';
// //    await yad.save();
// }()).catch(console.error);

export default myadmin;
