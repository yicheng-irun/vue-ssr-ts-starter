import {
   prop, modelOptions, getModelForClass, Ref,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { RefFieldClass } from './demo.refclass.model';


@modelOptions({ schemaOptions: { collection: 'yi_admin_demo', timestamps: true } })
export class YiAdminDemo {
   @prop({
      type: String,
      maxlength: 300,
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
      type: Number,
      min: 0,
      max: 100,
   })
   public numField?: number;

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
