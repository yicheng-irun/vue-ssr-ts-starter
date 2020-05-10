import YiAdmin from '../yi-admin';
import YiAdminDemoModel from '../models/demo.model';
import MongooseModelAdmin from '../yi-admin/lib/mongoose-model-admin';
import ModelAdminListAction, { ListActionResult } from '../yi-admin/lib/model-admin-list-action';

const myadmin = new YiAdmin({});

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'yi-admin-demo',
   model: YiAdminDemoModel,
   listActions: [
      new ModelAdminListAction({
         actionName: '某某操作',
         actionFunc: async (): Promise<ListActionResult> => {
            throw new Error('执行是不可能执行成功的');
         },
         isBatchAction: false,
         isTableRowAction: true,
      }),

      new ModelAdminListAction({
         actionName: '只是_批量执行',
         actionFunc: async (): Promise<ListActionResult> => {
            throw new Error('执行是不可能执行成功的');
         },
         isBatchAction: true,
         isTableRowAction: false,
      }),

      new ModelAdminListAction({
         actionName: '某某操作',
         actionFunc: async (): Promise<ListActionResult> => {
            throw new Error('执行是不可能执行成功的');
         },
         isBatchAction: false,
         isTableRowAction: true,
      }),
   ],
}));

// (async function () {
//    const t = await YiAdminDemoModel.findOne();
//    console.log(t);

//    const yad = new YiAdminDemoModel();
//    yad.strField = '哈哈哈';
// //    await yad.save();
// }()).catch(console.error);

export default myadmin;
