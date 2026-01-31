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
        'flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-2 text-xs font-semibold',
        pressed ? 'text-ink' : 'text-muted'
      )}
    >
      <span
        className={cn(
          'h-4 w-4 rounded-full border transition',
          pressed ? 'bg-accent border-accent-strong' : 'border-white/70'
        )}
      />
      {label}
    </button>
  );
}
