import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { writeFile, getFileWriter } from '../tools/write-file';
import EditStringImageType from '../yi-admin/lib/edit-types/edit-string-image';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'string-image-test' } })
export class StringImageTestModelClass {
   @prop({
      type: String,
      name: '图片1',
      editType: new EditStringImageType({
         writeFile,
      }),
   })
   public image1?: string;

   @prop({
      type: String,
      name: '图片2',
      editType: new EditStringImageType({
         maxFileSize: 80 * 1000,
         writeFile: getFileWriter('image/2'),
      }),
   })
   public image2?: string;
}

const StringImageTestModel = getModelForClass(StringImageTestModelClass);
export default StringImageTestModel;
