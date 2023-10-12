import classNames from 'classnames';
import type { Accessor, JSX, ParentComponent } from 'solid-js';

type Props = {
    small?: boolean;
    disabledAccessor?: Accessor<boolean>;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: ParentComponent<Props> = ({ class: extraClasses, disabled = false, disabledAccessor, small = false, children, ...props }) => {
    return (
        <button
            class={classNames(
                'bg-blue-500 hover:bg-blue-400',
                'text-white font-bold',
                {
                    'py-2 px-4': !small,
                    'py-1 px-2': small
                },
                'border-b-4 border-blue-700 hover:border-blue-500 rounded',
                'disabled:opacity-25 disabled:cursor-not-allowed',
                {
                    'hover:bg-blue-400 hover:border-blue-500': disabled
                },
                extraClasses
            )}
            disabled={disabledAccessor?.() ?? disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
