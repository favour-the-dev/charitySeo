import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listingDataType } from "@/types/types";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ViewDiscrepancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: listingDataType;
}

export function ViewDiscrepancyModal({
  isOpen,
  onClose,
  listing,
}: ViewDiscrepancyModalProps) {
  // Parse discrepancies
  // listing.discrepancies is an array of objects like { "field_name": { local: "...", platform: "..." } }
  // We want to flatten this for the table.

  //   const discrepancyItems = listing.discrepancies?.flatMap((d) =>
  //     Object.entries(d).map(([field, values]) => ({
  //       field,
  //       local: values.local,
  //       platform: values.platform,
  //     }))
  //   ) || [];
  const discrepancyItems = listing.discrepancies
    ? Object.entries(listing.discrepancies).map(([field, values]) => ({
        field,
        local: values.local,
        platform: values.platform,
      }))
    : [];
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Data Discrepancies
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Comparison between your local location data and the data currently
            on {listing.platform}.
          </p>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Field</TableHead>
                  <TableHead>Local Data (Updated)</TableHead>
                  <TableHead>Platform Data (Original)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {discrepancyItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                        <p>No discrepancies found. Data is in sync.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  discrepancyItems.map((item, index) => (
                    <TableRow key={`${item.field}-${index}`}>
                      <TableCell className="font-medium capitalize">
                        {item.field.replace(/_/g, " ")}
                      </TableCell>
                      <TableCell className="text-green-600 bg-green-50/50 dark:bg-green-900/10">
                        {item.local || (
                          <span className="text-muted-foreground italic">
                            Empty
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-amber-600 bg-amber-50/50 dark:bg-amber-900/10">
                        {item.platform || (
                          <span className="text-muted-foreground italic">
                            Empty
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
