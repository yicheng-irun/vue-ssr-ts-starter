import { Model, Document } from 'mongoose';
import ModelAdminBase, { ModelAdminBaseParams } from './model-admin-base';

export default class MongooseModelAdmin extends ModelAdminBase {
    public model: Model<Document, {}>;

    constructor (options: ModelAdminBaseParams & {
        model: Model<Document, {}>;
    }) {
       super(options);
       this.model = options.model;

       console.log(this.model);
       console.log(this.model.schema);
    }
}
