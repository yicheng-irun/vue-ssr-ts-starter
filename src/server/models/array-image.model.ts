import {
   modelOptions, getModelForClass, arrayProp,
} from '@typegoose/typegoose';
import { EditTypes } from 'yi-admin';
import { EditStringImageType } from 'yi-admin/lib/server/lib/edit-types/edit-string-image';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'array-image' } })
export class ArrayImageModelClass {
   @arrayProp({
      type: String,
      editType: new EditTypes.EditArrayType({
         childrenType: new EditStringImageType({
            helpText: '图片列表',
            writeFile: EditStringImageType.getFileWriter({
               folder: 'array-images',
            }),
         }),
      }),
   })
   public images1?: string[];
}

const ArrayImageModel = getModelForClass(ArrayImageModelClass);
export default ArrayImageModel;
