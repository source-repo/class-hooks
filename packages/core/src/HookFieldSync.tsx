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