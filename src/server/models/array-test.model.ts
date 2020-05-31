import {
   prop, modelOptions, getModelForClass, arrayProp,
} from '@typegoose/typegoose';
import { EditTypes } from 'yi-admin';
import { EditStringType } from 'yi-admin/lib/server/lib/edit-types/edit-string-type';
import { EditNumberType } from 'yi-admin/lib/server/lib/edit-types/edit-number-type';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'array-test' } })
export class ArrayModelClass {
   @arrayProp({
      type: String,
      editType: new EditTypes.EditArrayType({
         childrenType: new EditStringType({
            helpText: '呃呃呃',
         }),
      }),
   })
   public arrayField?: string[];

   @arrayProp({
      type: Number,
      editType: new EditTypes.EditArrayType({
         childrenType: new EditNumberType({}),
      }),
   })
   public arrayField2?: number[];

   @prop({
      type: Array,
   })
   public arrayField3?: string[];
}

const ArrayTestModel = getModelForClass(ArrayModelClass);
export default ArrayTestModel;
