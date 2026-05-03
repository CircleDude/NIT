import { useState, useEffect } from "react";

// /*
//    компонент, для сортировки
//    пропсы:
//       data - данные для таблицы в виде массива объектов
//       sorting - функция обновления данных для сортировки
//       sortLevelsNum - кол-во уровней сортировки
// */

const Sort = (props) => {

    const fields = Object.keys(props.data[0]);

    useEffect(() => {
        props.setSortReset(handleSortReset);
    }, []);

    const [sortLevels, setSortLevels] = useState(
        Array.from({ length: props.sortLevelsNum }, () => ({
            field: 'Нет',
            desc: false
        }))
    );

    const changeSortLevels = (level, value) => {
        const newLevels = [...sortLevels];
        newLevels[level].field = value;
        for (let i = level + 1; i < newLevels.length; i++) {
            newLevels[i] = { field: 'Нет', desc: false };
        }
        setSortLevels(newLevels);
    };

    const changeDirection = (level) => {
        const newLevels = [...sortLevels];
        newLevels[level].desc = !newLevels[level].desc;
        setSortLevels(newLevels);
    };

    const sortingFields = sortLevels.map((level, i) => {
        const usedFields = sortLevels
            .slice(0, i)
            .map(l => l.field);

        const availableFields = fields.filter(
            f => !usedFields.includes(f)
        );

        return (
            <p key={i}>
                <select
                    value={level.field}
                    disabled={i !== 0 && sortLevels[i - 1].field === 'Нет'}
                    onChange={(e) => changeSortLevels(i, e.target.value)}
                >
                    <option>Нет</option>
                    {availableFields.map((f, idx) =>
                        <option key={idx}>{f}</option>
                    )}
                </select> по убыванию?
                <input
                    type="checkbox"
                    checked={level.desc}
                    disabled={level.field === 'Нет'}
                    onChange={() => changeDirection(i)}
                />
            </p>
        );
    });

    const sortTable = (sortFields) => {

        let sortedData = [...props.data].sort( (first, second) => {
            for (let { field, desc} of sortFields) {
                const firstCell = first[field];
                const secondCell = second[field];

                let comparison;

                if ([fields.at(-2), fields.at(-1)].includes(field)) {
                    comparison = Number(firstCell) - Number(secondCell);
                } else {
                    comparison = firstCell.localeCompare(secondCell);
                }

                if (comparison !== 0) return (desc ? -comparison : comparison);
            }
            return 0;
        });

        return sortedData;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const activeSort = sortLevels.filter(l => l.field !== 'Нет');

        props.sorting(sortTable(activeSort));
    };

    const handleSortReset = () => {
        setSortLevels(
            Array.from({ length: props.sortLevelsNum }, () => ({
                field: 'Нет',
                desc: false
            }))
        );

        props.sorting(props.data);
    };

    return (
        <details>
            <summary>Сортировка</summary>

            <form onSubmit={handleSubmit} onReset={handleSortReset}>
                <p>Сортировать по</p>

                {sortingFields}

                <p>
                    <button type="submit">Сортировать</button>
                    <button type="reset">Сбросить сортировку</button>
                </p>
            </form>
        </details>
    );
};

export default Sort;