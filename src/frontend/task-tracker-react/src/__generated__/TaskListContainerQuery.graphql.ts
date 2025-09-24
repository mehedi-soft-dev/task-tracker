/**
 * @generated SignedSource<<9ad12c6bbbbb8248a839c98411f50571>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type TaskItemStatus = "COMPLETED" | "PENDING" | "%future added value";
export type TaskListContainerQuery$variables = Record<PropertyKey, never>;
export type TaskListContainerQuery$data = {
  readonly allTasks: ReadonlyArray<{
    readonly createdAt: any;
    readonly description: string;
    readonly id: any;
    readonly modifiedAt: any;
    readonly status: TaskItemStatus;
    readonly title: string;
  }>;
};
export type TaskListContainerQuery = {
  response: TaskListContainerQuery$data;
  variables: TaskListContainerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "TaskItem",
    "kind": "LinkedField",
    "name": "allTasks",
    "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskListContainerQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TaskListContainerQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0aba9b3aedd652fe22dc030a01f77ec5",
    "id": null,
    "metadata": {},
    "name": "TaskListContainerQuery",
    "operationKind": "query",
    "text": "query TaskListContainerQuery {\n  allTasks {\n    id\n    title\n    description\n    status\n    createdAt\n    modifiedAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "b7816b1a80dadbd2533c48d2b2113b97";

export default node;
