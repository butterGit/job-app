import { useEffect, useState } from "react";
import { Board, Column, JobApplication } from "../models/models.types";
import { updateJobApplication } from "../actions/job-applications";

export function useBoard(initialBoard: Board | null) {
  const [board, setBoard] = useState<Board | null>(initialBoard);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

  const moveJob = async (
    jobApllicationId: string,
    newColumnId: string,
    newOrder: number,
  ) => {
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => ({
        ...column,
        jobApplications: [...column.jobApplications],
      }));

      let jobToMove: JobApplication | null = null;
      let oldColumnId: string | null = null;

      for (const column of newColumns) {
        const jobIndex = column.jobApplications.findIndex(
          (job) => job._id === jobApllicationId,
        );

        if (jobIndex !== -1) {
          jobToMove = column.jobApplications[jobIndex];
          oldColumnId = column._id;
          column.jobApplications = column.jobApplications.filter(
            (job) => job._id !== jobApllicationId,
          );
          break;
        }
      }

      if (jobToMove && oldColumnId) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col._id === newColumnId,
        );
        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];
          const currentJobs = targetColumn.jobApplications || [];

          const updatedJobs = [...currentJobs];
          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder,
          });
          const jobsWithUpdatedOrders = updatedJobs.map((job, index) => ({
            ...job,
            order: index * 100,
          }));

          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrders,
          };
        }
      }

      return newColumns;
    });

    try {
      const result = await updateJobApplication(jobApllicationId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch (error) {
      setError("Failed to update job application");
    }
  };

  return { board, columns, error, moveJob };
}
