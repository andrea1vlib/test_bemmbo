

const ButtonInject = ({
  selectedInvoices,
  onInject,
  loading,
}: {
  selectedInvoices: any[];
  onInject: (invoices: any[]) => void;
  loading: boolean;
}) => {
  const handleInject = () => {
    if (selectedInvoices.length === 0) {
      alert("Please select at least one invoice to inject.");
      return;
    }
    onInject(selectedInvoices);
  };

  return (
    <div className="flex">
      <button
        className="text-white px-4 py-2 rounded mb-8 mr-12 ml-auto bg-[#8b92a9] disabled:opacity-50"
        onClick={handleInject}
        disabled={loading}
      >
        {loading ? "Inyectando..." : "Inyectar"}
      </button>
    </div>
  );
};

export default ButtonInject;
