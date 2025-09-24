/**
 * @generated SignedSource<<4a51652bb1c6b0a39bf3b873583d3c55>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TaskItemStatus = "COMPLETED" | "PENDING" | "%future added value";
export type EditTaskFormMutation$variables = {
  description: string;
  id: any;
  title: string;
};
export type EditTaskFormMutation$data = {
  readonly updateTask: {
    readonly description: string;
    readonly id: any;
    readonly modifiedAt: any;
    readonly status: TaskItemStatus;
    readonly title: string;
  } | null | undefined;
};
export type EditTaskFormMutation = {
  response: EditTaskFormMutation$data;
  variables: EditTaskFormMutation$variables;
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
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v3 = [
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
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "title",
        "variableName": "title"
      }
    ],
    "concreteType": "TaskItem",
    "kind": "LinkedField",
    "name": "updateTask",
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EditTaskFormMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "EditTaskFormMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "0750fe2941ef13a8c912a1ff2ffe1ad7",
    "id": null,
    "metadata": {},
    "name": "EditTaskFormMutation",
    "operationKind": "mutation",
    "text": "mutation EditTaskFormMutation(\n  $id: UUID!\n  $title: String!\n  $description: String!\n) {\n  updateTask(id: $id, title: $title, description: $description) {\n    id\n    title\n    description\n    status\n    modifiedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "b14f1c5b706a7d5d172d13f27f615445";

export default node;
