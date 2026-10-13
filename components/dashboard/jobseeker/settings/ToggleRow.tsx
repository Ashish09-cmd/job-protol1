import { Icon } from "@iconify/react";
import Switch from "@/components/ui/Switch";

interface ToggleRowProps {
  icon: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ToggleRow({
  icon,
  title,
  description,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <li className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg text-primary-blue"
        >
          <Icon icon={icon} />
        </span>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold font-manrope text-text-heading">
            {title}
          </p>
          <p className="text-vxs font-inter text-text-secondary-color">
            {description}
          </p>
        </div>
      </div>
      <Switch checked={checked} onChange={onChange} label={title} />
    </li>
  );
}
