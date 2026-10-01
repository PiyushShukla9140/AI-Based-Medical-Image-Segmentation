function ScanStatus({ status }) {
  const styles = {
    uploaded: "border border-neutral-700 bg-neutral-800/70 text-neutral-300",
    processing: "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
    completed: "border border-orange-500/20 bg-orange-500/10 text-orange-400",
    failed: "border border-red-500/20 bg-red-500/10 text-red-400",
  };

  const currentStatus = status || "uploaded";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
        styles[currentStatus] || styles.uploaded
      }`}
    >
      {currentStatus}
    </span>
  );
}

export default ScanStatus;
