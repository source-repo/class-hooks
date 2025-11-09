import { classHooks } from "@core";
import React from "react";

function useCounter(props: { countStart: number }) {
    const [count, setCount] = React.useState(props.countStart);
    return { count, setCount };
}

type ItemCounterProps = {
    hookProps?: {
        items: { countStart: number };
    };
};

class ItemCounterBase extends React.Component<ItemCounterProps> {
}

const hooks = {
    items: (props: ItemCounterProps) => useCounter(props.hookProps?.items ?? { countStart: 0 }),
};

class ItemCounter1 extends classHooks(ItemCounterBase, hooks) {
    render() {
        return (
            <div>
                {this.renderClassHooks()}
                <h1>Counter: {this.items?.count}</h1>
                <button onClick={() => this.items?.setCount(this.items?.count + 1)}>
                    Increment
                </button>
            </div>
        );
    }
}

export const ItemCounter = () => <ItemCounter1 hookProps={{ items: { countStart: 456 } }} />;