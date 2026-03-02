type LegendItem = {
  name: string;
  color: string;
};

type Props = {
  title: string;
  items: LegendItem[];
};

const Legend: React.FC<Props> = ({ title, items }) => {
  return (
    <div>
      <p className="font-poppins font-medium text-[14px] text-[var(--light-text)] mb-2">
        {title}
      </p>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name} className="flex items-center gap-2 text-[14px]">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[var(--light-text)]">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;