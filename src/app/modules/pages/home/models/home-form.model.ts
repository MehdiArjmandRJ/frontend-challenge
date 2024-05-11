import { prop, required } from "@rxweb/reactive-form-validators";

export class SearchRecipesModel {
    @prop()
    name: string = '';
}

export class InsertRecipesModel {
    @required({ message: 'this field is requirement' })
    name: string = '';

    @required({ message: 'this field is requirement' })
    image: string = '';

    @required({ message: 'this field is requirement' })
    recipe: string = '';

    @prop()
    userId: string = '1';
}