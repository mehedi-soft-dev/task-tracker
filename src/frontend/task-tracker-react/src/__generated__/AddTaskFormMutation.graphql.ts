/**
 * @generated SignedSource<<91ea3e6c6f01b983c3bd118d7304ab34>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TaskItemStatus = "COMPLETED" | "PENDING" | "%future added value";
export type AddTaskFormMutation$variables = {
  description: string;
  title: string;
};
export type AddTaskFormMutation$data = {
  readonly createTask: {
    readonly createdAt: any;
    readonly description: string;
    readonly id: any;
    readonly modifiedAt: any;
    readonly status: TaskItemStatus;
    readonly title: string;
  };
};
export type AddTaskFormMutation = {
  response: AddTaskFormMutation$data;
  variables: AddTaskFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      },
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
      }
    ],
    "concreteType": "TaskItem",
    "kind": "LinkedField",
    "name": "createTask",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "modifiedAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddTaskFormMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AddTaskFormMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "1c1fdc7f55bc2cd49a3d597e97e40607",
    "id": null,
    "metadata": {},
    "name": "AddTaskFormMutation",
    "operationKind": "mutation",
    "text": "mutation AddTaskFormMutation(\n  $title: String!\n  $description: String!\n) {\n  createTask(title: $title, description: $description) {\n    id\n    title\n    description\n    status\n    createdAt\n    modifiedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "be89297fd54f03291e6117fe2d98fb67";

export default node;
