import lodash from 'lodash';
import type { JSX, VoidComponent } from 'solid-js';

type Props = {
    label: string;
    wrapperClass?: string;
    inputClass?: string;
} & JSX.InputHTMLAttributes<HTMLInputElement>;

const GameOption: VoidComponent<Props> = ({ label, wrapperClass, inputClass = 'form-input rounded', type, ...inputProps }) => {
    const id = `option-${lodash.kebabCase(label)}`;

    let display: JSX.Element = undefined;

    switch (type) {
        case 'checkbox':
            display = (
                <>
                    <input id={id} class={inputClass} type={type} {...inputProps} />
                    <label for={id} class="ml-2">
                        {label}
                    </label>
                </>
            );
            break;
        default:
            display = (
                <>
                    <label for={id} class="mb-2 block">
                        {label}
                    </label>
                    <input id={id} class={inputClass} type={type} {...inputProps} />
                </>
            );
            break;
    }

    return <div class={wrapperClass}>{display}</div>;
};

export default GameOption;
