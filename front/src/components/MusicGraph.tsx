export interface MusicGraphProps {
  barHeights: string[];
}

export default function MusicGraph(props: MusicGraphProps) {
  const { barHeights } = props;

  return (
    <div className="bar-container">
      {barHeights.map((height: string) => {
        return <div className="bar" style={{ height: `${height}` }}></div>;
      })}
    </div>
  );
}
