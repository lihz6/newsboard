import React, { createContext, PureComponent, ReactNode } from 'react';
export enum AppStatus {
  LOADING = -1,
  UNKNOWN = 0,
  LOGINED = 1,
}

export interface Fetch {
  appStatus: AppStatus;
  headers: {
    'X-Admin-Token': string | null;
    'X-Admin-Id': string | null;
  };
  // userName: string;
  // username: string;
  // avatar: string;
}

// ##################### start
interface Model extends Fetch {
  // popupView: ReactNode;
}
const defaultContextModel: Model = {
  // popupView: null,
  appStatus: AppStatus[REACT_APP_APP_STATUS],
  headers: {
    'X-Admin-Token': null,
    'X-Admin-Id': null,
  },
  // userName: '',
  // username: '',
  // avatar: '',
};
// ##################### end

interface Props {
  children(context: ContextState): React.ReactNode;
}

export interface ContextState extends Model {
  setContextState: PureComponent<Props, Model>['setState'];
}

export const context = createContext<ContextState>(
  defaultContextModel as ContextState
);

const { Provider } = context;

export default class Context extends PureComponent<Props, ContextState> {
  constructor(props) {
    super(props);
    this.state = {
      setContextState: this.setState.bind(this),
      ...defaultContextModel,
    };
  }

  render() {
    const { children } = this.props;
    return <Provider value={this.state}>{children(this.state)}</Provider>;
  }
}
