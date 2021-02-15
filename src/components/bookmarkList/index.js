import React from 'react';

import { Bookmark, createStorageKey } from 'components/bookmark';
import { List } from 'components/list';
import { Storage, getBookmarkedItems } from 'utils';
import { ITEMS_PER_LIST } from 'values';

export function BookmarkList({
  type = '',
  items = [],
  onChange = () => {},
  onClick = () => {},
}) {
  const removeBookmarks = () => {
    items.forEach((item) => {
      Storage.remove(createStorageKey(item));
    });
    onChange(getBookmarkedItems(type));
  };

  return (
    <List>
      <List.Item>
        {items.length ? (
          <>
            <List.Title>Marcadores</List.Title>
            <List.Action className="text-right" onClick={removeBookmarks}>
              (Borrar)
            </List.Action>
          </>
        ) : null}
      </List.Item>

      {items.map((item, index) => {
        return index < ITEMS_PER_LIST ? (
          <List.Item key={index}>
            <List.Action
              onClick={() => onClick(item)}
              title={
                type === 'verse'
                  ? item?.text.replaceAll('<br/>', '\n')
                  : item?.slides[1].text
                      .replaceAll('<br/>', '\n')
                      .replaceAll('1)', '')
              }
            >
              {item.title}
            </List.Action>
            <Bookmark icon element={item} onChange={onChange} />
          </List.Item>
        ) : null;
      })}

      {items.length > ITEMS_PER_LIST ? (
        <List.Item>
          <List.Text>
            +{items.length - ITEMS_PER_LIST} marcador
            {items.length - ITEMS_PER_LIST > 1 ? 'es' : ''}
          </List.Text>
        </List.Item>
      ) : null}
    </List>
  );
}
