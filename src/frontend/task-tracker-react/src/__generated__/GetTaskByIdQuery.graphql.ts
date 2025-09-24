/**
 * @generated SignedSource<<9d8ad4b4bd46b70c54c87bfb156ea866>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GetTaskByIdQuery$variables = {
  id: any;
};
export type GetTaskByIdQuery$data = {
  readonly taskById: {
    readonly " $fragmentSpreads": FragmentRefs<"TaskFragment">;
  } | null | undefined;
};
export type GetTaskByIdQuery = {
  response: GetTaskByIdQuery$data;
  variables: GetTaskByIdQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GetTaskByIdQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TaskItem",
        "kind": "LinkedField",
        "name": "taskById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TaskFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetTaskByIdQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TaskItem",
        "kind": "LinkedField",
        "name": "taskById",
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
    ]
  },
  "params": {
    "cacheID": "a4e329fa637ce17209cd7f54672874f3",
    "id": null,
    "metadata": {},
    "name": "GetTaskByIdQuery",
    "operationKind": "query",
    "text": "query GetTaskByIdQuery(\n  $id: UUID!\n) {\n  taskById(id: $id) {\n    ...TaskFragment\n  }\n}\n\nfragment TaskFragment on TaskItem {\n  id\n  title\n  description\n  status\n  createdAt\n  modifiedAt\n}\n"
  }
};
})();

(node as any).hash = "b19ff349e7b1863eb38701d558efcf1b";

export default node;
