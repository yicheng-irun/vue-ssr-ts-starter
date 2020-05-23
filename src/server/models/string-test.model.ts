import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose';
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
