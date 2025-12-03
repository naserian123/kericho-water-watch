import { cn } from '@/lib/utils';
import { IssueType, issueTypeLabels, issueTypeIcons } from '@/types/report';
import { Droplets, Waves, AlertTriangle, Wrench, FileText } from 'lucide-react';

interface IssueTypeCardProps {
  type: IssueType;
  selected: boolean;
  onSelect: (type: IssueType) => void;
}

const iconMap: Record<IssueType, React.ReactNode> = {
  leaking_pipe: <Droplets className="w-6 h-6" />,
  burst_pipe: <Waves className="w-6 h-6" />,
  illegal_connection: <AlertTriangle className="w-6 h-6" />,
  broken_meter: <Wrench className="w-6 h-6" />,
  other: <FileText className="w-6 h-6" />,
};

export const IssueTypeCard = ({ type, selected, onSelect }: IssueTypeCardProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(type)}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300",
        "hover:border-primary/50 hover:bg-primary/5 hover:-translate-y-1",
        selected 
          ? "border-primary bg-primary/10 shadow-soft" 
          : "border-border bg-card"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
        selected ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
      )}>
        {iconMap[type]}
      </div>
      <span className={cn(
        "text-sm font-medium text-center transition-colors",
        selected ? "text-primary" : "text-muted-foreground"
      )}>
        {issueTypeLabels[type]}
      </span>
    </button>
  );
};
