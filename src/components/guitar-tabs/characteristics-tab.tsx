import { Guitar } from '../../types/guitars';

type Props = {
  guitar: Guitar,
}

function CharacteristicsTab({guitar}:Props): JSX.Element {
  const { vendorCode, type, stringCount } = guitar;
  return (
    <div className="tabs__content" id="characteristics">
      <table className="tabs__table">
        <thead>
          <tr className="tabs__table-row">
            <td className="tabs__title">Артикул:</td>
            <td className="tabs__value">{vendorCode}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Тип:</td>
            <td className="tabs__value">{type}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Количество струн:</td>
            <td className="tabs__value">{stringCount} струнная</td>
          </tr>
        </thead>
      </table>

    </div>
  );
}

export default CharacteristicsTab;

