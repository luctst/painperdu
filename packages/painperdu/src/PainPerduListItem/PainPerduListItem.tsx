import { useEffect } from 'react';
import type { FC } from 'react'
import type { PathItem } from '../types';
import '../index.css'

interface Props {
  pathItem: PathItem[]
}

export const PainPerduListItem: FC<Props> = ({ pathItem }) => {
 useEffect(() => {})

	return (
    <div className="painperdu--modal--body--container">
      <ul className="painperdu--modal--body--container--list">
        {
          pathItem.map((item, index) => {
            return (
              <li key={index}> { item.alias } </li>
            )
          })
        }
      </ul>
    </div>
	);
};