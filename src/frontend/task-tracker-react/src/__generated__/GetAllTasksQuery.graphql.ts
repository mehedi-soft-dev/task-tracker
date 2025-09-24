/**
 * @generated SignedSource<<73bbccf432693b9bcae1d3050ccf132f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SortEnumType = "ASC" | "DESC" | "%future added value";
export type TaskItemStatus = "COMPLETED" | "PENDING" | "%future added value";
export type TaskItemFilterInput = {
  and?: ReadonlyArray<TaskItemFilterInput> | null | undefined;
  createdAt?: DateTimeOperationFilterInput | null | undefined;
  description?: StringOperationFilterInput | null | undefined;
  id?: UuidOperationFilterInput | null | undefined;
  modifiedAt?: DateTimeOperationFilterInput | null | undefined;
  or?: ReadonlyArray<TaskItemFilterInput> | null | undefined;
  status?: TaskItemStatusOperationFilterInput | null | undefined;
  title?: StringOperationFilterInput | null | undefined;
};
export type StringOperationFilterInput = {
  and?: ReadonlyArray<StringOperationFilterInput> | null | undefined;
  contains?: string | null | undefined;
  endsWith?: string | null | undefined;
  eq?: string | null | undefined;
  in?: ReadonlyArray<string | null | undefined> | null | undefined;
  ncontains?: string | null | undefined;
  nendsWith?: string | null | undefined;
  neq?: string | null | undefined;
  nin?: ReadonlyArray<string | null | undefined> | null | undefined;
  nstartsWith?: string | null | undefined;
  or?: ReadonlyArray<StringOperationFilterInput> | null | undefined;
  startsWith?: string | null | undefined;
};
export type TaskItemStatusOperationFilterInput = {
  eq?: TaskItemStatus | null | undefined;
  in?: ReadonlyArray<TaskItemStatus> | null | undefined;
  neq?: TaskItemStatus | null | undefined;
  nin?: ReadonlyArray<TaskItemStatus> | null | undefined;
};
export type UuidOperationFilterInput = {
  eq?: any | null | undefined;
  gt?: any | null | undefined;
  gte?: any | null | undefined;
  in?: ReadonlyArray<any | null | undefined> | null | undefined;
  lt?: any | null | undefined;
  lte?: any | null | undefined;
  neq?: any | null | undefined;
  ngt?: any | null | undefined;
  ngte?: any | null | undefined;
  nin?: ReadonlyArray<any | null | undefined> | null | undefined;
  nlt?: any | null | undefined;
  nlte?: any | null | undefined;
};
export type DateTimeOperationFilterInput = {
  eq?: any | null | undefined;
  gt?: any | null | undefined;
  gte?: any | null | undefined;
  in?: ReadonlyArray<any | null | undefined> | null | undefined;
  lt?: any | null | undefined;
  lte?: any | null | undefined;
  neq?: any | null | undefined;
  ngt?: any | null | undefined;
  ngte?: any | null | undefined;
  nin?: ReadonlyArray<any | null | undefined> | null | undefined;
  nlt?: any | null | undefined;
  nlte?: any | null | undefined;
};
export type TaskItemSortInput = {
  createdAt?: SortEnumType | null | undefined;
  description?: SortEnumType | null | undefined;
  id?: SortEnumType | null | undefined;
  modifiedAt?: SortEnumType | null | undefined;
  status?: SortEnumType | null | undefined;
  title?: SortEnumType | null | undefined;
};
export type GetAllTasksQuery$variables = {
  order?: ReadonlyArray<TaskItemSortInput> | null | undefined;
  where?: TaskItemFilterInput | null | undefined;
};
export type GetAllTasksQuery$data = {
  readonly allTasks: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"TaskFragment">;
  }>;
};
export type GetAllTasksQuery = {
  response: GetAllTasksQuery$data;
  variables: GetAllTasksQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "order"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "where"
},
v2 = [
  {
    "kind": "Variable",
    "name": "order",
    "variableName": "order"
  },
  {
    "kind": "Variable",
    "name": "where",
    "variableName": "where"
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
    "name": "GetAllTasksQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "TaskItem",
        "kind": "LinkedField",
        "name": "allTasks",
        "plural": true,
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "GetAllTasksQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "f31734c5cb83506ce25fafaa89c42df7",
    "id": null,
    "metadata": {},
    "name": "GetAllTasksQuery",
    "operationKind": "query",
    "text": "query GetAllTasksQuery(\n  $where: TaskItemFilterInput\n  $order: [TaskItemSortInput!]\n) {\n  allTasks(where: $where, order: $order) {\n    ...TaskFragment\n  }\n}\n\nfragment TaskFragment on TaskItem {\n  id\n  title\n  description\n  status\n  createdAt\n  modifiedAt\n}\n"
  }
};
})();

(node as any).hash = "c81fb4caaba0a0c69be0f27db8620d4e";

export default node;
