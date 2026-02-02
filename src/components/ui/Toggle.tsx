import { cn } from '@/lib/utils';

type ToggleProps = {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  label: string;
};

export function Toggle({ pressed, onPressedChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        'flex h-10 items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 text-sm font-normal',
        pressed ? 'text-ink' : 'text-muted'
      )}
    >
      <span
        className={cn(
          'h-4 w-4 rounded-full border transition',
          pressed ? 'bg-accent border-accent-strong' : 'border-current bg-transparent'
        )}
      />
      {label}
    </button>
  );
}
