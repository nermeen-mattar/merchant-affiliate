/* tslint:disable */

declare var Object: any;
export interface DealInterface {
  "name"?: string;
  "description"?: string;
  "limit"?: string;
  "src_business"?: any;
  "target_business_types"?: Array<any>;
  "target_businesses"?: Array<any>;
  "status"?: string;
  "id"?: any;
}

export class Deal implements DealInterface {
  "name": string;
  "description": string;
  "limit": string;
  "src_business": any;
  "target_business_types": Array<any>;
  "target_businesses": Array<any>;
  "status": string;
  "id": any;
  constructor(data?: DealInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Deal`.
   */
  public static getModelName() {
    return "Deal";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Deal for dynamic purposes.
  **/
  public static factory(data: DealInterface): Deal{
    return new Deal(data);
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
      name: 'Deal',
      plural: 'Deals',
      path: 'Deals',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "limit": {
          name: 'limit',
          type: 'string'
        },
        "src_business": {
          name: 'src_business',
          type: 'any'
        },
        "target_business_types": {
          name: 'target_business_types',
          type: 'Array&lt;any&gt;'
        },
        "target_businesses": {
          name: 'target_businesses',
          type: 'Array&lt;any&gt;'
        },
        "status": {
          name: 'status',
          type: 'string'
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
