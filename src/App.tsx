import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

interface Sorting {
  goods: string[],
  sorting: string,
  isReverse: boolean,
}

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SET_SORT_ALPHABET: string = 'alphabet';
const SET_SORT_LENGTH: string = 'length';

function sort({ goods, sorting, isReverse }: Sorting) {

  const SortGoods = [...goods];

  SortGoods.sort((good1, good2) => {
    switch (sorting) {
      case SET_SORT_ALPHABET:
        return good1.localeCompare(good2);
      case SET_SORT_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  })

  if (isReverse) {
    SortGoods.reverse();
  }

  return SortGoods;

}

export const App: React.FC = () => {
  const [sortField, SetSortField] = useState('');
  const [isReverse, SetIsReverse] = useState(false);

  const newVisibleGoods = sort({
    goods: goodsFromServer,
    sorting: sortField,
    isReverse: isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            `button is-info ${sortField === SET_SORT_ALPHABET ? '' : 'is-light' }`,
          )}
          onClick={() => SetSortField(SET_SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            `button is-success ${sortField === SET_SORT_LENGTH ? '' : 'is-light' }`,
          )}
          onClick={() => SetSortField(SET_SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            `button is-warning ${isReverse === true ? '' : 'is-light' }`,
          )}
          onClick={() => SetIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              SetSortField('');
              SetIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {newVisibleGoods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
