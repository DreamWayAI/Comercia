import { useState } from "react";

interface ProposalData {
  country: string;
  city: string;
  company: string;
  currency: string;
  rooms: any[];
  totalArea: number;
  materialsCost: number;
  discountPercent: number;
  discount: number;
  finalCost: number;
}

const initialData: ProposalData = {
  country: "",
  city: "",
  company: "",
  currency: "UAH",
  rooms: [{
    id: 1,
    area: 0,
    type: '1',
    material: 'enamel',
    materialQty: 0,
    materialCost: 0
  }],
  totalArea: 0,
  materialsCost: 0,
  discountPercent: 20,
  discount: 0,
  finalCost: 0,
};

export function useProposal() {
  const [proposalData, setProposalData] = useState<ProposalData>(initialData);

  const updateProposalData = (newData: Partial<ProposalData>) => {
    setProposalData(prev => ({ ...prev, ...newData }));
  };

  const resetProposal = () => {
    setProposalData(initialData);
  };

  return {
    proposalData,
    updateProposalData,
    resetProposal,
  };
}
