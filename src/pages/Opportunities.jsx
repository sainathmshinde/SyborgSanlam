import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import WithLayout from "@/components/layout/WithLayout";
import { useNavigate } from "react-router";

// Mock data for opportunities
const initialOpportunities = [
  {
    id: 1,
    name: "Client A Project",
    stage: "qualified",
    date: "2023-06-15",
    value: "$10,000",
  },
  {
    id: 2,
    name: "Client B Consultation",
    stage: "proposal",
    date: "2023-06-18",
    value: "$5,000",
  },
  {
    id: 3,
    name: "Client C Partnership",
    stage: "negotiation",
    date: "2023-06-20",
    value: "$25,000",
  },
  {
    id: 4,
    name: "Client D Contract",
    stage: "closed won",
    date: "2023-06-22",
    value: "$15,000",
  },
  {
    id: 5,
    name: "Client E Deal",
    stage: "closed lost",
    date: "2023-06-25",
    value: "$8,000",
  },
  {
    id: 6,
    name: "Client F Opportunity",
    stage: "qualified",
    date: "2023-06-27",
    value: "$12,000",
  },
];

const stages = [
  "qualified",
  "proposal",
  "negotiation",
  "closed won",
  "closed lost",
];

const stageColors = {
  qualified: "bg-blue-100 text-blue-800",
  proposal: "bg-yellow-100 text-yellow-800",
  negotiation: "bg-purple-100 text-purple-800",
  "closed won": "bg-green-100 text-green-800",
  "closed lost": "bg-red-100 text-red-800",
};

function Opportunities() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState(initialOpportunities);

  const moveOpportunity = (id, direction) => {
    setOpportunities((prevOpportunities) => {
      const opportunityIndex = prevOpportunities.findIndex(
        (opp) => opp.id === id
      );
      const opportunity = prevOpportunities[opportunityIndex];
      const currentStageIndex = stages.indexOf(opportunity.stage);
      const newStageIndex =
        direction === "left" ? currentStageIndex - 1 : currentStageIndex + 1;

      if (newStageIndex < 0 || newStageIndex >= stages.length)
        return prevOpportunities;

      const updatedOpportunity = {
        ...opportunity,
        stage: stages[newStageIndex],
      };
      const updatedOpportunities = [...prevOpportunities];
      updatedOpportunities[opportunityIndex] = updatedOpportunity;

      return updatedOpportunities;
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Opportunities </h1>
        <Button
          onClick={() => {
            navigate("/createOpportunity");
          }}
        >
          Create Opportunity
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stages.map((stage) => (
          <div key={stage} className="bg-muted rounded-lg p-4">
            <h2 className="text-lg font-semibold capitalize mb-4">{stage}</h2>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4">
                {opportunities
                  .filter((opp) => opp.stage === stage)
                  .map((opportunity) => (
                    <Card key={opportunity.id} className="bg-card">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                          {opportunity.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div>
                            <p className="font-medium text-muted-foreground">
                              Stage
                            </p>
                            <Badge className={stageColors[opportunity.stage]}>
                              {opportunity.stage}
                            </Badge>
                          </div>

                          <div>
                            <p className="font-medium text-muted-foreground">
                              Date
                            </p>
                            <p>{opportunity.date}</p>
                          </div>

                          <div>
                            <p className="font-medium text-muted-foreground">
                              Value
                            </p>
                            <p>{opportunity.value}</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="grid grid-cols-1">
                        <div className="flex my-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              moveOpportunity(opportunity.id, "left")
                            }
                            disabled={stage === stages[0]}
                          >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Move Left</span>
                          </Button>
                          <Button
                            className="ml-2"
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              moveOpportunity(opportunity.id, "right")
                            }
                            disabled={stage === stages[stages.length - 1]}
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Move Right</span>
                          </Button>
                        </div>
                        <div>
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WithLayout("sales")(Opportunities);
