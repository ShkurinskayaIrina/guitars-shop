type Props = {
  guitarDescription: string,
}

function DescriptionTab({guitarDescription}:Props):JSX.Element {
  return (
    <p className="tabs__product-description">
      {guitarDescription}
    </p>
  );
}

export default DescriptionTab;
