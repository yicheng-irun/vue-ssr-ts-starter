import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
import EditStringFileType from '../yi-admin/lib/edit-types/edit-string-file';
import { writeFile, getFileWriter } from '../tools/write-file';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'string-file-test' } })
export class StringFileTestModelClass {
   @prop({
      type: String,
      name: '文件1',
      editType: new EditStringFileType({
         writeFile,
      }),
   })
   public file1?: string;

   @prop({
      type: String,
      name: '文件2',
      editType: new EditStringFileType({
         maxFileSize: 50 * 1000,
         writeFile: getFileWriter('file2'),
      }),
   })
   public file2?: string;
}

const StringFileTestModel = getModelForClass(StringFileTestModelClass);
export default StringFileTestModel;
