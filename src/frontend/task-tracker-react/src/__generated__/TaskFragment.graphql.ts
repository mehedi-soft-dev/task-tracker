/**
 * @generated SignedSource<<baeb500db776e3f0c0e89228d7d2c1a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type TaskItemStatus = "COMPLETED" | "PENDING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TaskFragment$data = {
  readonly createdAt: any;
  readonly description: string;
  readonly id: any;
  readonly modifiedAt: any;
  readonly status: TaskItemStatus;
  readonly title: string;
  readonly " $fragmentType": "TaskFragment";
};
export type TaskFragment$key = {
  readonly " $data"?: TaskFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TaskFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskFragment",
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
  "type": "TaskItem",
  "abstractKey": null
};

(node as any).hash = "ca65889043d4a0b39620ce0274696764";

export default node;
