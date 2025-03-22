import React from 'react';
import { HookFieldSync } from './HookFieldSync';

type HookConfig<T = any> = {
  name: string;
  hook: () => T;
};

type InternalHookConfig = HookConfig<any> & { stateKey: string };

type HookResultMap<T extends Record<string, () => any>> = {
  [K in keyof T]: ReturnType<T[K]>;
};

export interface HookBridgeState {
  [key: string]: any;
}

export function classHooks<THooks extends Record<string, () => any>>(
  hookDefs: THooks
) {
  return class extends React.Component {
    constructor(...args: [any]) {
      super(...args);
      this.hookValues = {} as HookResultMap<THooks>;
    }
    declare state: HookBridgeState & HookResultMap<THooks>;
    declare hookValues: HookResultMap<THooks>;

    getHookConfigs(): InternalHookConfig[] {
      return Object.entries(hookDefs).map(([name, hook]) => ({
        name,
        hook,
        stateKey: `__hook_${name}`,
      }));
    }

    getHookFieldNames(): string[] {
      return this.getHookConfigs().map((c) => c.name);
    }

    renderClassHooks(): React.ReactNode {
      return this.getHookConfigs().map((config) => {
        const { hook, name, stateKey } = config;
        const onChange = (value: any) => {
          if ((this.state?.[stateKey] ?? null) !== value) {
            this.setState({ [stateKey]: value });
          }
          (this as any).hookValues ||= {};
          (this as any).hookValues[name] = value;
        };
        return <HookFieldSync key={name} hook={hook} onChange={onChange} />;
      });
    }
  };
}