import React from 'react';

export type HookBridgeProps<T> = {
  hook: () => T;
  onChange: (value: T) => void;
};

export function HookFieldSync<T>({ hook, onChange }: HookBridgeProps<T>): React.ReactElement | null {
  const value = hook();

  React.useEffect(() => {
    onChange(value);
  }, [value]);

  return null;
}

type HookConfig<T = any> = {
  name: string;
  hook: () => T;
};

type InternalHookConfig = HookConfig<any> & { stateKey: string };

export interface HookBridgeState {
  [key: string]: any;
}

type HookResultMap<T extends Record<string, () => any>> = {
  [K in keyof T]: ReturnType<T[K]>;
};

type MixinResult<
  TBase extends new (...args: any[]) => React.Component<any, any>,
  THooks extends Record<string, () => any>
> = new (...args: ConstructorParameters<TBase>) =>
  InstanceType<TBase> &
  HookResultMap<THooks> & {
    renderClassHooks: () => React.ReactNode;
  };

export function classHooks<
  TBase extends new (...args: any[]) => React.Component<any, any>,
  THooks extends Record<string, () => any>
>(Base: TBase, hookDefs: THooks): MixinResult<TBase, THooks> {
  class Mixed extends Base {
    declare state: HookBridgeState & HookResultMap<THooks>;

    private getHookConfigs(): InternalHookConfig[] {
      return Object.entries(hookDefs).map(([name, hook]) => ({
        name,
        hook,
        stateKey: `__hook_${name}`,
      }));
    }

    renderClassHooks(): React.ReactNode {
      return this.getHookConfigs().map(({ hook, name, stateKey }) => {
        const onChange = (value: any) => {
          if ((this.state?.[stateKey] ?? null) !== value) {
            this.setState({ [stateKey]: value });
          }
          (this as any)[name] = value;
        };
        return <HookFieldSync key={name} hook={hook} onChange={onChange} />;
      });
    }
  }

  // Safe cast to satisfy TypeScript without overlap error
  return Mixed as unknown as MixinResult<TBase, THooks>;
}