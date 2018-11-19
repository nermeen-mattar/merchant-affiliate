/* tslint:disable */

declare var Object: any;
export interface BusinessInterface {
  "name"?: string;
  "type"?: string;
  "country"?: string;
  "currency"?: string;
  "phone"?: string;
  "address"?: string;
  "image"?: any;
  "social"?: any;
  "images"?: any;
  "id"?: any;
}

export class Business implements BusinessInterface {
  "name": string;
  "type": string;
  "country": string;
  "currency": string;
  "phone": string;
  "address": string;
  "image": any;
  "social": any;
  "images": any;
  "id": any;
  constructor(data?: BusinessInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Business`.
   */
  public static getModelName() {
    return "Business";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Business for dynamic purposes.
  **/
  public static factory(data: BusinessInterface): Business{
    return new Business(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Business',
      plural: 'Businesses',
      path: 'Businesses',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "country": {
          name: 'country',
          type: 'string'
        },
        "currency": {
          name: 'currency',
          type: 'string'
        },
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "image": {
          name: 'image',
          type: 'any'
        },
        "social": {
          name: 'social',
          type: 'any'
        },
        "images": {
          name: 'images',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
