import { CheckCircle, Circle } from "lucide-react";

const stages = [
  // { name: "Initiated", description: "Application process started" },
  // { name: "KYC Pending", description: "Waiting for identity verification" },
  // { name: "Document Complete", description: "All required documents received" },
  {
    name: "Onboarding Initiated",
    description: "Beginning the onboarding process",
  },
  // { name: "Onboarding Complete", description: "Successfully onboarded" },
];

export default function WorkFlowStatus({ currentStage = 1 }) {
  return (
    <div className="w-full bg-white  overflow-hidden">
      <div className="p-4 ">
        <div className="flex min-w-max">
          {stages.map((stage, index) => (
            <div
              key={stage.name}
              className="flex flex-row items-center mx-2 w-40"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  index < currentStage
                    ? "bg-green-500 text-white"
                    : index === currentStage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {index < currentStage ? (
                  <CheckCircle className="w-10 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>
              {/* <div className="h-1 w-full bg-gray-200 mb-2">
                <div
                  className={`h-full ${
                    index < currentStage
                      ? "bg-green-500"
                      : index === currentStage
                      ? "bg-blue-500"
                      : "bg-gray-200"
                  }`}
                  style={{ width: index <= currentStage ? "100%" : "0%" }}
                ></div>
              </div> */}
              <div className="text-center">
                <h3
                  className={`font-semibold text-sm mb-1 ${
                    index < currentStage
                      ? "text-green-600"
                      : index === currentStage
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {stage.name}
                </h3>
                <p className="text-xs text-gray-500 mb-1">
                  {stage.description}
                </p>
                <p
                  className={`text-xs ${
                    index < currentStage
                      ? "text-green-500"
                      : index === currentStage
                      ? "text-blue-500"
                      : "text-gray-400"
                  }`}
                >
                  {index < currentStage
                    ? "Completed"
                    : index === currentStage
                    ? "In Progress"
                    : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
