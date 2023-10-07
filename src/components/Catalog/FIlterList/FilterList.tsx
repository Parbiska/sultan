import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import s from './FilterList.module.scss';

type Item = {
    [key: string]: number;
};

type CheckboxCompanyProps = {
    name: string;
    checked: boolean;
    items: Item;
    onChange: (name: string, checked: boolean) => void;
};

const InputCheckbox: React.FC<CheckboxCompanyProps> = ({ name, checked, onChange, items }) => {
    return (
        <li>
            <input
                id={`company${name}`}
                type='checkbox'
                checked={checked}
                onChange={(e) => onChange(name, e.target.checked)}
            />
            <label htmlFor={`company${name}`}>
                {name + ' '}
                <span>({items[name]})</span>
            </label>
        </li>
    );
};

type FilterListProps = {
    selectedItems: string[];
    setSelectedItems: (items: string[]) => void;
    items: Item;
};

const FilterList: React.FC<FilterListProps> = ({ selectedItems, setSelectedItems, items }) => {
    const [itemFilter, setItemFilter] = useState<string>('');

    // Функция для переключения элемента в массиве selectedItems
    const toggleElementInArray = useCallback(
        (item: string, checked: boolean) => {
            if (checked) {
                setSelectedItems([...selectedItems, item]);
            } else {
                setSelectedItems(selectedItems.filter((i) => i !== item));
            }
        },
        [selectedItems, setSelectedItems],
    );

    const filteredItems = useMemo(() => {
        if (itemFilter) {
            return Object.keys(items).filter((item) =>
                item.toLocaleLowerCase().includes(itemFilter.toLocaleLowerCase()),
            );
        } else {
            return Object.keys(items);
        }
    }, [items, itemFilter]);

    return (
        <div className={s.filter}>
            <form className={s.filter__search}>
                <input
                    value={itemFilter}
                    type='text'
                    placeholder='Поиск...'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setItemFilter(e.currentTarget.value);
                    }}
                />
            </form>

            <ul className={s.filter__list}>
                {filteredItems.map((item) => (
                    <InputCheckbox
                        items={items}
                        key={item}
                        name={item}
                        checked={selectedItems.includes(item)}
                        onChange={toggleElementInArray}
                    />
                ))}
            </ul>
        </div>
    );
};

export default FilterList;
