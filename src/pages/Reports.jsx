import WithLayout from "@/components/layout/WithLayout";
import { Button } from "@/components/ui/button";

const Reports = () => {
  console.log("Reports");
  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-1/2">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Transaction Statements</h2>
          <p className="text-gray-600 mb-4">
            View and download your transaction statements.
          </p>
          <Button disabled={true}>View Transaction Statements</Button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Tax Statements</h2>
          <p className="text-gray-600 mb-4">
            Access and download your tax statements.
          </p>
          <Button disabled={true}>View Tax Statements</Button>
        </div>
      </div>
    </div>
  );
};

export default WithLayout("client")(Reports);
