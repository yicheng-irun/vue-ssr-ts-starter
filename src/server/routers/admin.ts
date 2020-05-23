import YiAdmin from '../yi-admin';
import YiAdminDemoModel from '../models/demo.model';
import MongooseModelAdmin from '../yi-admin/lib/mongoose-model-admin';
import ModelAdminListAction, { ListActionResult } from '../yi-admin/lib/model-admin-list-action';
import RefFieldClassModel from '../models/demo.refclass.model';
import SiteNavMenu from '../yi-admin/lib/site-nav-menu';
import FileImageModel from '../models/file-image.model';
import StringTestModel from '../models/string-test.model';
import StringEnumTestModel from '../models/string-enum-test.model';
import NumberEnumTestModel from '../models/number-enum-test.model';
import StringFileTestModel from '../models/string-file.model';

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
         buttonType: 'success',
      }),

      new ModelAdminListAction({
         actionName: '不需确认操作',
         actionFunc: async (): Promise<ListActionResult> => ({
            successfulNum: 0,
            failedNum: 0,
         }),
         popConfirm: false,
         buttonType: 'info',
         buttonIcon: 'el-icon-message-solid',
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

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'admin-demo-ref',
   title: '关联模型',
   model: RefFieldClassModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'file-image',
   title: '文件和图片测试',
   model: FileImageModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'number-enum-test',
   model: NumberEnumTestModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'string-enum-test',
   model: StringEnumTestModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'string-file',
   model: StringFileTestModel,
}));

myadmin.addModelAdmin(new MongooseModelAdmin({
   name: 'string',
   model: StringTestModel,
}));


myadmin.siteNavMenu.add(new SiteNavMenu({
   title: '测试菜单1',
   link: 'model-admin/yi-admin-demo/edit/',
}));


// (async function () {
//    const t = await YiAdminDemoModel.findOne();
//    console.log(t);

//    const yad = new YiAdminDemoModel();
//    yad.strField = '哈哈哈';
// //    await yad.save();
// }()).catch(console.error);

export default myadmin;
