import FilterGroup from "@/components/clients-page/category/FilterGroup";
import {
  FILTER_GROUPS,
  type FilterKey,
  type SelectedFilters,
} from "@/lib/constants/job-filters";

interface FilterSidebarProps {
  selected: SelectedFilters;
  onToggle: (key: FilterKey, optionId: string) => void;
}

export default function FilterSidebar({
  selected,
  onToggle,
}: FilterSidebarProps) {
  return (
    <div className="flex flex-col gap-2 divide-y divide-subtext-gray2/30">
      {FILTER_GROUPS.map((group) => (
        <FilterGroup
          key={group.key}
          title={group.title}
          options={group.options}
          columns={group.columns}
          initialVisible={group.initialVisible}
          selectedIds={selected[group.key]}
          onToggle={(optionId) => onToggle(group.key, optionId)}
        />
      ))}
    </div>
  );
}
