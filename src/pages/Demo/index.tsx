/**
 * ```
 * 李鸿章 <poodll@163.com>
 * 12/20/2019, 1:48:10 AM
 * ```
 * doc comment for the file goes here
 */

/** Happy Coding */
import React, { useState, useEffect, useRef } from 'react';

import withPath from '_base/withPath';
import SpinView from '_view/SpinView';

import { fetchFrom } from './fetch';
export const defaultParams = { page: 1, size: '20' };
export const defaultQuery = { keyword: '', order: 1 };

export default withPath(
  WITH_PATH,
  defaultParams,
  defaultQuery
)(
  ({
    match: { params, query, pathOf },
    location: { pathname, search },
    history,
  }) => {
    console.log('params', params);
    console.log('query', query);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    useEffect(() => {
      fetchFrom(pathname, search).then(() => {
        setLoading(false);
      });
    }, [pathname, search]);

    return (
      <SpinView spinning={loading}>
        <div>
          Page: {params.page}; Size: {params.size}
        </div>
        <form
          onSubmit={event => {
            event.preventDefault();
            history.replace(
              pathOf(undefined, {
                keyword: inputRef.current!.value,
                order: Number(selectRef.current!.value),
              })
            );
          }}>
          <input defaultValue={query.keyword} ref={inputRef} />
          <select defaultValue={query.order} ref={selectRef}>
            {[1, 2, 3, 4].map(i => (
              <option key={i} value={i}>
                # {i}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
          <button
            onClick={event => {
              event.preventDefault();
              history.replace(pathOf(undefined, defaultQuery));
            }}>
            Clear
          </button>
        </form>
        <div>
          <button
            onClick={() => {
              history.push(pathOf({ page: params.page + 1 }));
            }}>
            Next Page
          </button>
        </div>
      </SpinView>
    );
  }
);
