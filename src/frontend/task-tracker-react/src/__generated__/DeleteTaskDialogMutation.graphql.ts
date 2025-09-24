/**
 * @generated SignedSource<<762fbef0c08722318054cee333f7e684>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DeleteTaskDialogMutation$variables = {
  id: any;
};
export type DeleteTaskDialogMutation$data = {
  readonly deleteTask: boolean;
};
export type DeleteTaskDialogMutation = {
  response: DeleteTaskDialogMutation$data;
  variables: DeleteTaskDialogMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ScalarField",
    "name": "deleteTask",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteTaskDialogMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteTaskDialogMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8586bc60c770fdfed2002d622eae6dee",
    "id": null,
    "metadata": {},
    "name": "DeleteTaskDialogMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteTaskDialogMutation(\n  $id: UUID!\n) {\n  deleteTask(id: $id)\n}\n"
  }
};
})();

(node as any).hash = "dde12c2e87716d8f3b4977830e7fa6df";

export default node;
