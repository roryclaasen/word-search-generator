import lodash from 'lodash';
import type { JSX, VoidComponent } from 'solid-js';

type Props = {
    label: string;
    wrapperClass?: string;
    inputClass?: string;
} & JSX.InputHTMLAttributes<HTMLInputElement>;

const GameOption: VoidComponent<Props> = ({ label, wrapperClass, inputClass = 'form-input rounded', type, ...inputProps }) => {
    const id = `option-${lodash.kebabCase(label)}`;
    if (type === 'checkbox') {
        return (
            <div class={wrapperClass}>
                <input id={id} class={inputClass} type={type} {...inputProps} />
                <label for={id} class="ml-2">
                    {label}
                </label>
            </div>
        );
    }

    return (
        <div class={wrapperClass}>
            <label for={id} class="mb-2 block">
                {label}
            </label>
            <input id={id} class={inputClass} type={type} {...inputProps} />
        </div>
    );
};

export default GameOption;
