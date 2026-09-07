export default function StatusBadge({ status }) {
    const style = status
        ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
        : "bg-slate-100 text-slate-500 ring-slate-500/15";
    const dot = status ? "bg-emerald-500" : "bg-slate-400";
    const label = status ? "Disponible" : "Rupeture";

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
            {label}
    </span>
    );
}