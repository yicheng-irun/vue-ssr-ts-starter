import {
   Model, Document, SchemaTypeOpts, SchemaType,
} from 'mongoose';
import ModelAdminBase, { ModelAdminBaseParams } from './model-admin-base';
import EditBaseType from './edit-types/edit-base-type';
import EditStringType from './edit-types/edit-string-type';
import EditStringEnumType from './edit-types/edit-string-enum-type';
import EditNumberType from './edit-types/edit-number-type';
import EditNumberEnumType from './edit-types/edit-number-enum-type';
import EditBooleanType from './edit-types/edit-boolean-type';
import EditDateTimeType from './edit-types/edit-datetime-type';

/**
 * 映射mongoose的默认类型的图
 */
const INSTANCE_EDIT_TYPE_MAP: {
   [type: string]: (schemaTypeOpts: SchemaTypeOpts<{}>) => EditBaseType;
} = {
   ObjectID (schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      return new EditBaseType({
         required: schemaTypeOpts.required,
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   String (schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      if (schemaTypeOpts.enum) {
         return new EditStringEnumType({
            enum: schemaTypeOpts.enum,
            required: schemaTypeOpts.required,
            fieldNameAlias: schemaTypeOpts.name,
         });
      }
      return new EditStringType({
         required: schemaTypeOpts.required,
         minLength: schemaTypeOpts.minlength,
         maxLength: schemaTypeOpts.maxlength,
         fieldNameAlias: schemaTypeOpts.name,
         placeholder: schemaTypeOpts.placeholder || '',
      });
   },
   Number (schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      if (schemaTypeOpts.enum) {
         return new EditNumberEnumType({
            enum: schemaTypeOpts.enum,
            required: schemaTypeOpts.required,
            fieldNameAlias: schemaTypeOpts.name,
         });
      }
      return new EditNumberType({
         required: schemaTypeOpts.required,
         min: schemaTypeOpts.min,
         max: schemaTypeOpts.max,
         step: schemaTypeOpts.step || 1,
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   Date (schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      return new EditDateTimeType({
         required: schemaTypeOpts.required,
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   Boolean (schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      return new EditBooleanType({
         required: schemaTypeOpts.required,
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
};

export default class MongooseModelAdmin extends ModelAdminBase {
   public model: Model<Document, {}>;

   constructor (options: ModelAdminBaseParams & {
      model: Model<Document, {}>;
   }) {
      super(options);
      this.model = options.model;
   }

   public getEditFormFields (): EditBaseType[] {
      const fields: EditBaseType[] = [];

      const { schema } = this.model;
      const pathsKeys = Object.keys(schema.paths);
      pathsKeys.forEach((key) => {
         // 卧槽，这个mongoose的这里的类型声明不正确
         // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
         // @ts-ignore
         const schemaPath: SchemaType & {
            instance: string;
            path: string;
            options: SchemaTypeOpts<{}>;
         } = schema.paths[key];

         if (key === '_id' || key === '__v') return;
         const { instance } = schemaPath;

         let typeInstance: EditBaseType = null;

         if (schemaPath.options.editType && schemaPath.options.editType instanceof EditBaseType) {
            typeInstance = schemaPath.options.editType;
         } else if (INSTANCE_EDIT_TYPE_MAP[instance]) {
            typeInstance = INSTANCE_EDIT_TYPE_MAP[instance](schemaPath.options);
         }

         if (typeInstance) {
            typeInstance.fieldName = schemaPath.path;
            if (typeInstance.fieldNameAlias === null) {
               typeInstance.fieldNameAlias = schemaPath.options.name || '';
            }
            fields.push(typeInstance);
         }
      });

      return fields;
   }
}
