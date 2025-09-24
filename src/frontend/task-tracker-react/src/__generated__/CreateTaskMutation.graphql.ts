/**
 * @generated SignedSource<<1c360d7668f9c66da79871ba4979e09c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateTaskMutation$variables = {
  description: string;
  title: string;
};
export type CreateTaskMutation$data = {
  readonly createTask: {
    readonly " $fragmentSpreads": FragmentRefs<"TaskFragment">;
  };
};
export type CreateTaskMutation = {
  response: CreateTaskMutation$data;
  variables: CreateTaskMutation$variables;
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
    "kind": "Variable",
    "name": "description",
    "variableName": "description"
  },
  {
    "kind": "Variable",
    "name": "title",
    "variableName": "title"
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
    "name": "CreateTaskMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TaskItem",
        "kind": "LinkedField",
        "name": "createTask",
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
    "name": "CreateTaskMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "7b80a92a57696da83b7719bc49105968",
    "id": null,
    "metadata": {},
    "name": "CreateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation CreateTaskMutation(\n  $title: String!\n  $description: String!\n) {\n  createTask(title: $title, description: $description) {\n    ...TaskFragment\n  }\n}\n\nfragment TaskFragment on TaskItem {\n  id\n  title\n  description\n  status\n  createdAt\n  modifiedAt\n}\n"
  }
};
})();

(node as any).hash = "8be52adb59c25d73d969e3c4c336ca77";

export default node;
