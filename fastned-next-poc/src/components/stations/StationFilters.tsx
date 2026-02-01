import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { FilterState } from '@/hooks/useFilterParams';

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'available', label: 'Available' },
  { value: 'busy', label: 'Busy' },
  { value: 'offline', label: 'Offline' },
  { value: 'unknown', label: 'Unknown' }
];

type StationFiltersProps = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
};

export function StationFilters({ filters, onChange }: StationFiltersProps) {
  return (
    <div className="flex flex-1 flex-wrap items-center gap-3">
      <div className="min-w-[220px] flex-1">
        <Input
          aria-label="Search stations"
          placeholder="Search by name, city, or postcode"
          value={filters.q}
          onChange={(event) => onChange({ ...filters, q: event.target.value })}
        />
      </div>
      <div className="min-w-[160px]">
        <Select
          aria-label="Filter by status"
          value={filters.status}
          onChange={(event) => onChange({ ...filters, status: event.target.value })}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value} className="text-muted">
              {option.label}
            </option>
          ))}
        </Select>
      </div>
      <label className="flex h-10 items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 text-sm font-normal text-muted">
        <span>Min power</span>
        <input
          aria-label="Minimum power"
          type="range"
          min={50}
          max={350}
          step={10}
          value={filters.minPowerKw}
          onChange={(event) =>
            onChange({ ...filters, minPowerKw: Number(event.target.value) })
          }
          className="accent-accent-strong"
        />
        <span className="text-ink">{filters.minPowerKw}kW</span>
      </label>
      <Toggle
        pressed={filters.favoritesOnly}
        onPressedChange={(pressed) => onChange({ ...filters, favoritesOnly: pressed })}
        label="Only favorites"
      />
    </div>
  );
}
