import lodash from 'lodash';
import type { Accessor, JSX, VoidComponent } from 'solid-js';
import { Show } from 'solid-js';

type Props = {
    label: string;
    wrapperClass?: string;
    inputClass?: string;
    valueAccessor?: Accessor<string>;
    checkedAccessor?: Accessor<boolean>;
} & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'id'>;

const GameOption: VoidComponent<Props> = ({ label, wrapperClass, inputClass = 'form-input rounded', type, value, valueAccessor, checked, checkedAccessor, ...inputProps }) => {
    const id = `option-${lodash.kebabCase(label)}`;

    const showLabelBeforeInput = type !== 'checkbox';
    return (
        <div class={wrapperClass}>
            <Show when={showLabelBeforeInput}>
                <label for={id} class="mb-2 block">
                    {label}
                </label>
            </Show>

            <input id={id} class={inputClass} type={type} value={valueAccessor?.() ?? value} checked={checkedAccessor?.() ?? checked} {...inputProps} />

            <Show when={!showLabelBeforeInput}>
                <label for={id} class="ml-2">
                    {label}
                </label>
            </Show>
        </div>
    );
};

export default GameOption;
