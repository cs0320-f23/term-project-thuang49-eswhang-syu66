export interface MusicGraphProps {
  barData: string[][];
}

export default function MusicGraph(props: MusicGraphProps) {
  const { barData } = props;

  return (
    <div className="bar-container">
      {barData.map((barData: string[]) => {
        return (
          <div className="bar" style={{ height: `${barData[0]}` }}>
            <div>
              <p className="number">{barData[1]}</p>
              <p className="category">{barData[2]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
