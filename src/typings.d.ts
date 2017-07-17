/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Timer {
    id: number;
    conditions: Array<object>;
    variables: object|any;
    actions: Array<object>;
    name: string;
    user: string;
}