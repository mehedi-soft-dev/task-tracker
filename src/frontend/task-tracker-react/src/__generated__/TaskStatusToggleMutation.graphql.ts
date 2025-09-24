/**
 * @generated SignedSource<<9261f09ed0bef6a593200817efff963f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TaskItemStatus = "COMPLETED" | "PENDING" | "%future added value";
export type TaskStatusToggleMutation$variables = {
  id: any;
  status: TaskItemStatus;
};
export type TaskStatusToggleMutation$data = {
  readonly updateTaskStatus: {
    readonly id: any;
    readonly modifiedAt: any;
    readonly status: TaskItemStatus;
  } | null | undefined;
};
export type TaskStatusToggleMutation = {
  response: TaskStatusToggleMutation$data;
  variables: TaskStatusToggleMutation$variables;
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
    "alias": null,
    "args": [
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
    ],
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskStatusToggleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaskStatusToggleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "df18df1a6934b458fb58a64a6b731910",
    "id": null,
    "metadata": {},
    "name": "TaskStatusToggleMutation",
    "operationKind": "mutation",
    "text": "mutation TaskStatusToggleMutation(\n  $id: UUID!\n  $status: TaskItemStatus!\n) {\n  updateTaskStatus(id: $id, status: $status) {\n    id\n    status\n    modifiedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "152a787a3c52124f0073ffb5737084fd";

export default node;
