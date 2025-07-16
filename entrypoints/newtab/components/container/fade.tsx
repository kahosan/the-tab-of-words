import { MotionEffect } from '../animate-ui/effects/motion-effect';

interface FadeContainerProps {
  show: boolean
  children: React.ReactNode
}
export default function FadeContainer({ children, show }: FadeContainerProps) {
  return (
    <MotionEffect
      fade
      className={show ? '' : 'hidden'}
    >
      {children}
    </MotionEffect>
  );
}
