import {
   prop, modelOptions, getModelForClass, Ref,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { RefFieldClass } from './demo.refclass.model';
import EditTextareaType from '../yi-admin/lib/edit-types/edit-textarea-type';
import EditStringEnumType from '../yi-admin/lib/edit-types/edit-string-enum-type';
import EditNumberEnumType from '../yi-admin/lib/edit-types/edit-number-enum-type';
import EditStringRemoteSelectType from '../yi-admin/lib/edit-types/edit-string-remote-select-type';


@modelOptions({ schemaOptions: { collection: 'yi_admin_demo', timestamps: true } })
export class YiAdminDemo {
   @prop({
      type: String,
      maxlength: 20,
      minlength: 3,
      name: '字符串strField',
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
      editType: new EditStringRemoteSelectType({
         required: false,
         async getOptions (query: string): Promise<(string| { label: string; value: string })[]> {
            await new Promise((resolve) => setTimeout(resolve, 200));
            const q = String(query).trim();
            return [
               ...(q ? [q] : []),
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
   public strRemoteEnumField3?: string;

   @prop({
      type: String,
      editType: new EditTextareaType({
         required: false,
         maxLength: 100,
         placeholder: '请输入XXX',
      }),
   })
   public textField3?: string;

   @prop({
      type: Number,
      min: 0,
      max: 100,
   })
   public numField?: number;

   @prop({
      type: Number,
      min: 0,
      max: 10,
      step: 0.1,
   })
   public numField2?: number;

   @prop({
      type: Number,
      editType: new EditNumberEnumType({
         enum: [{
            label: '啊啊啊',
            value: 1,
         }, {
            label: '啊啊啊2',
            value: 2,
         }, {
            label: '啊啊啊3',
            value: 3,
         }],
      }),
   })
   public numEnumField?: number;

   @prop({
      type: Boolean,
      default: false,
   })
   public boolField?: boolean;

   @prop({
      type: Date,
   })
   public dateField: Date;

   @prop({
      type: Types.ObjectId,
   })
   public objIdField: string;

   @prop({
      ref: RefFieldClass,
   })
   public refField: Ref<RefFieldClass>
}

const YiAdminDemoModel = getModelForClass(YiAdminDemo);
export default YiAdminDemoModel;