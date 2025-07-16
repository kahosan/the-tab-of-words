import { useAudio } from '../../hooks/use-audio';
import { getAudioUrl } from '../../hooks/use-vocab';

export default function Audio({ content }: { content: string }) {
  const url = getAudioUrl(content);
  const [play, setPlay] = useAudio();

  const callback = (e: HTMLVideoElement | null) => {
    if (play && e) {
      e.pause();
      e.load();
      e.play()
        .catch(e => console.error(`Play audio error: ${e}`))
        .finally(() => setPlay(false));
    }
  };

  return (
    <audio key={url} ref={callback} hidden src={url} autoPlay={false} />
  );
}
