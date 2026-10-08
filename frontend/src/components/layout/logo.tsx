import Image from 'next/image';

export function Logo({compact = false,}: {
  compact?: boolean;
}) {
  return (
    <span className="brand-mark">
      <Image
        src="/images/logo.svg"
        alt=""
        width={52}
        height={52}
        priority
      />
      {!compact && <span>CNS</span>}
    </span>
  );
}
