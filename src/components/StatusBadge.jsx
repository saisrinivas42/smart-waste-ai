const MAP = {
  PENDING:     { cls: 'badge-pending',  label: 'Pending' },
  ASSIGNED:    { cls: 'badge-assigned', label: 'Assigned' },
  IN_PROGRESS: { cls: 'badge-progress', label: 'In Progress' },
  RESOLVED:    { cls: 'badge-resolved', label: 'Resolved' },
};

export default function StatusBadge({ status }) {
  const { cls, label } = MAP[status] ?? { cls: 'badge-pending', label: status };
  return <span className={`badge ${cls}`}>{label}</span>;
}
