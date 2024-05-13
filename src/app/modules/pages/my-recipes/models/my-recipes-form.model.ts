import { prop } from "@rxweb/reactive-form-validators";

export class SearchRecipesModel {
    @prop()
    name: string = '';
}