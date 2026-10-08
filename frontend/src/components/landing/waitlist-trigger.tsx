'use client';

export function WaitlistTrigger({
  children,
  className = 'button-primary',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  function openDialog() {
    window.dispatchEvent(new Event('cns:open-waitlist'));
  }

  return (
    <button
      className={className}
      onClick={openDialog}
      type="button"
    >
      {children}
    </button>
  );
}
