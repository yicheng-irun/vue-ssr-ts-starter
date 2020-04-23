import {
   prop, modelOptions, getModelForClass, Ref,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { RefFieldClass } from './demo.refclass.model';
import EditTextareaType from '../yi-admin/lib/edit-types/edit-textarea-type';


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
      enum: ['哈哈哈', '嘿嘿嘿'],
   })
   public strField4?: string;

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
