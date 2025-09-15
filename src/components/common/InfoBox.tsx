const InfoBox = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="font-semibold text-gray-600">{label}</p>
      <p className="text-gray-700">{value}</p>
    </div>
  );
};

export default InfoBox;
