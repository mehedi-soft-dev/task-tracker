/**
 * @generated SignedSource<<c02959af4fc58f470294423c47ceb64e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TaskItemStatus = "COMPLETED" | "PENDING" | "%future added value";
export type UpdateTaskStatusMutation$variables = {
  id: any;
  status: TaskItemStatus;
};
export type UpdateTaskStatusMutation$data = {
  readonly updateTaskStatus: {
    readonly " $fragmentSpreads": FragmentRefs<"TaskFragment">;
  } | null | undefined;
};
export type UpdateTaskStatusMutation = {
  response: UpdateTaskStatusMutation$data;
  variables: UpdateTaskStatusMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "status"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "status",
    "variableName": "status"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateTaskStatusMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TaskItem",
        "kind": "LinkedField",
        "name": "updateTaskStatus",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateTaskStatusMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "TaskItem",
        "kind": "LinkedField",
        "name": "updateTaskStatus",
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
    "cacheID": "f5a215f49048e176f75f3aba1761a8d0",
    "id": null,
    "metadata": {},
    "name": "UpdateTaskStatusMutation",
    "operationKind": "mutation",
    "text": "mutation UpdateTaskStatusMutation(\n  $id: UUID!\n  $status: TaskItemStatus!\n) {\n  updateTaskStatus(id: $id, status: $status) {\n    ...TaskFragment\n  }\n}\n\nfragment TaskFragment on TaskItem {\n  id\n  title\n  description\n  status\n  createdAt\n  modifiedAt\n}\n"
  }
};
})();

(node as any).hash = "98037b96ddb85fa3736f8d9358601de4";

export default node;
