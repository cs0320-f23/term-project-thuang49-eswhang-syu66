export interface MusicGraphProps {
  barData: string[][];
}

/**
 * A component that generates the interactive music graph graphic on the
 * home page. The barData prop allows the heights of the bars to change during
 * the loading state, and also contains the different parameters that show up
 * on hover in the final state.
 * @param props list of data that defines each bar height
 * @returns component graphic
 */
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
