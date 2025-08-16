/**
 * @author: luxudongg@gmail.com
 * Iframe
 */

interface IframeProps {
  url: string;
}

export default function Iframe(props: IframeProps) {
  const { url } = props;

  return <iframe src={url} style={{ width: '100%', height: '100%' }} />;
}
