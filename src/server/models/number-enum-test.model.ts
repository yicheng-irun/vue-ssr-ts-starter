import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import EditStringEnumType from '../yi-admin/lib/edit-types/edit-string-enum-type';
import EditStringRemoteSelectType from '../yi-admin/lib/edit-types/edit-string-remote-select-type';
import EditNumberEnumType from '../yi-admin/lib/edit-types/edit-number-enum-type';
import EditNumberRemoteSelectType from '../yi-admin/lib/edit-types/edit-number-remote-select-type';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'string-enum-test' } })
export class NumberEnumTestModelClass {
     @prop({
        type: String,
        enum: ['aaa', 'bbb', 'ccc', 'ddd'],
     })
     public strEnumField?: string;

     @prop({
        type: String,
        enum: [1, 2, 3, 4],
        editType: new EditNumberEnumType({
           required: false,
           enum: [{
              label: '一',
              value: 1,
           }, {
              label: '二',
              value: 2,
           }, {
              label: '三',
              value: 3,
           }, {
              label: '四',
              value: 4,
           }],
        }),
     })
     public strEnumField2?: string;

     @prop({
        type: String,
        helpText: '字符串远程选择类型示例',
        editType: new EditNumberRemoteSelectType({
           required: false,
           async getLabelByValue (value): Promise<string> {
              if (value) { return `label:${value}`; }
              return '';
           },
           async getOptions (query: string): Promise<(number| { label: string; value: number })[]> {
              const q = Number(query);

              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              const distinctData = await NumberEnumTestModel.distinct('strRemoteSelectField3').exec();
              const options: (number| { label: string; value: number })[] = [];
              if (q && distinctData.indexOf(q) < 0) {
                 options.push({
                    value: q,
                    label: `value is ${q}`,
                 });
              }
              distinctData.forEach((item) => {
                 options.push({
                    value: Number(item),
                    label: `value is ${item}`,
                 });
              });

              return options;
           },
        }),
     })
     public strRemoteSelectField3?: string;
}

const NumberEnumTestModel = getModelForClass(NumberEnumTestModelClass);
export default NumberEnumTestModel;
