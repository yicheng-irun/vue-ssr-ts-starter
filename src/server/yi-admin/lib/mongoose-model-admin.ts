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

/**
 * 映射mongoose的默认类型的图
 */
const INSTANCE_EDIT_TYPE_MAP: {
   [type: string]: (fieldName: string, schemaTypeOpts: SchemaTypeOpts<{}>) => EditBaseType;
} = {
   ObjectID (fieldName: string, schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      return new EditBaseType({
         required: schemaTypeOpts.required,
         fieldName,
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   String (fieldName: string, schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      if (schemaTypeOpts.enum) {
         return new EditStringEnumType({
            enum: schemaTypeOpts.enum,
            required: schemaTypeOpts.required,
            fieldName,
            fieldNameAlias: schemaTypeOpts.name,
         });
      }
      return new EditStringType({
         required: schemaTypeOpts.required,
         minLength: schemaTypeOpts.minlength,
         maxLength: schemaTypeOpts.maxlength,
         fieldName,
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   Number (fieldName: string, schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      if (schemaTypeOpts.enum) {
         return new EditNumberEnumType({
            enum: schemaTypeOpts.enum,
            required: schemaTypeOpts.required,
            fieldName,
            fieldNameAlias: schemaTypeOpts.name,
         });
      }
      return new EditNumberType({
         required: schemaTypeOpts.required,
         min: schemaTypeOpts.min,
         max: schemaTypeOpts.max,
         fieldName,
         fieldNameAlias: schemaTypeOpts.name,
      });
   },
   Boolean (fieldName: string, schemaTypeOpts: SchemaTypeOpts<{}>): EditBaseType {
      return new EditBooleanType({
         required: schemaTypeOpts.required,
         fieldName,
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

      console.log(this.getEditFormFields());
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

         if (INSTANCE_EDIT_TYPE_MAP[instance]) {
            fields.push(INSTANCE_EDIT_TYPE_MAP[instance](schemaPath.path, schemaPath.options));
         }
      });

      return fields;
   }
}
