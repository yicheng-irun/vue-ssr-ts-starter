import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import EditStringEnumType from '../yi-admin/lib/edit-types/edit-string-enum-type';
import EditStringRemoteSelectType from '../yi-admin/lib/edit-types/edit-string-remote-select-type';
import EditStringTextareaType from '../yi-admin/lib/edit-types/edit-string-textarea-type';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'string-test' } })
export class StringTestModelClass {
    @prop({
       type: String,
       maxlength: 20,
       minlength: 3,
       name: '字符串strField',
       default: 'defaultValue',
       placeholder: '请输入xxx',
    })
     public strField?: string;

     @prop({
        type: String,
        required: true,
     })
     public strField2?: string;

     @prop()
     public strField3?: string;


     @prop({
        type: String,
        enum: ['哈哈哈', '嘿嘿嘿', '额额额', 'jjj'],
     })
     public strEnumField?: string;

     @prop({
        type: String,
        enum: ['1', '2', '3', '4'],
        editType: new EditStringEnumType({
           required: false,
           enum: [{
              label: '啊啊1',
              value: '1',
           }, {
              label: '啊啊2',
              value: '2',
           }, {
              label: '啊啊3',
              value: '3',
           }],
        }),
     })
     public strEnumField2?: string;

     @prop({
        type: String,
        helpText: '字符串远程选择类型示例',
        editType: new EditStringRemoteSelectType({
           required: false,
           async getLabelByValue (value): Promise<string> {
              return `label:${value}`;
           },
           async getOptions (query: string): Promise<(string| { label: string; value: string })[]> {
              await new Promise((resolve) => setTimeout(resolve, 200));
              const q = String(query).trim();
              return [
                 ...(q ? [{
                    label: `label:${q}`,
                    value: q,
                 }] : []),
                 '不通过',
                 {
                    label: '公开',
                    value: '通过',
                 },
                 {
                    label: '删除状态',
                    value: '删除',
                 },
                 {
                    label: '状态3',
                    value: 'status3',
                 },
              ];
           },
        }),
     })
     public strRemoteSelectField3?: string;

     @prop({
        type: String,
        editType: new EditStringTextareaType({
           required: false,
           maxLength: 100,
           placeholder: '请输入XXX',
        }),
     })
     public textField3?: string;
}

const StringTestModel = getModelForClass(StringTestModelClass);
export default StringTestModel;
