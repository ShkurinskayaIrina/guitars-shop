import {useState} from 'react';
import { Link } from 'react-router-dom';

import { Guitar } from '../../types/guitars';

import CharacteristicsTab from '../guitar-tabs/characteristics-tab';
import DescrintionTab from './description-tab';


const guitarTabs = [
  'Характеристики',
  'Описание',
];

type Props = {
  guitar: Guitar,
}

function GuitarTabs({guitar}: Props): JSX.Element {
  const activeTabCurrent = 'Характеристики';
  const [activeTab, setActiveTab] = useState(activeTabCurrent);

  const handleClick = (tab:string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="tabs">
        {guitarTabs.map((tab) => (
          <Link key = {tab}
            className = {`button button--medium tabs__button
            ${activeTab === tab ? '' : 'button--black-border'}`}
            onClick = {() => handleClick(tab)}
            to={`#${tab===guitarTabs[0]? 'characteristics' : 'descrintion'}`}
          >{tab}
          </Link>
        ))}
      </div>
      {activeTab === guitarTabs[0] && <CharacteristicsTab guitar={guitar}/>}
      {activeTab === guitarTabs[1] && <DescrintionTab guitarDescription={guitar.description}/>}
    </>
  );
}

export default GuitarTabs;
