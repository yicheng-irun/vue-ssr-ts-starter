import YiAdmin from '../yi-admin';
import YiAdminDemoModel from '../models/demo.model';
import MongooseModelAdmin from '../yi-admin/lib/mongoose-model-admin';
import ModelAdminListAction, { ListActionResult } from '../yi-admin/lib/model-admin-list-action';
import RefFieldClassModel from '../models/demo.refclass.model';
import SiteNavMenu from '../yi-admin/lib/site-nav-menu';

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
         actionFunc: async (): Promise<ListActionResult> => null,
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


myadmin.siteNavMenu.add(new SiteNavMenu({
   title: '测试菜单1',
   link: 'model-admin/yi-admin-demo/edit/',
}));

const menuGroup = new SiteNavMenu({
   title: '菜单组',
});

menuGroup.add(new SiteNavMenu({
   title: '菜单组内元素1',
   link: 'https://www.xiwnn.com',
}));
menuGroup.add(new SiteNavMenu({
   title: '菜单组内元素2',
   link: 'https://www.xiwnn.com',
}));
menuGroup.add(new SiteNavMenu({
   title: '菜单组内元素2',
   link: 'https://www.xiwnn.com',
}));

menuGroup.childrens[1].add(new SiteNavMenu({
   title: '子中子菜单',
   link: 'https://www.xiwnn.com/piano',
}));
menuGroup.childrens[1].add(new SiteNavMenu({
   title: '子中子菜单',
   link: 'https://www.xiwnn.com/piano',
}));
menuGroup.childrens[1].add(new SiteNavMenu({
   title: '子中子菜单',
   link: 'https://www.xiwnn.com/piano',
}));

myadmin.siteNavMenu.add(menuGroup);

myadmin.siteNavMenu.add(new SiteNavMenu({
   title: '测试菜单2',
   link: 'https://www.xiwnn.com/piano',
}));

// (async function () {
//    const t = await YiAdminDemoModel.findOne();
//    console.log(t);

//    const yad = new YiAdminDemoModel();
//    yad.strField = '哈哈哈';
// //    await yad.save();
// }()).catch(console.error);

export default myadmin;
