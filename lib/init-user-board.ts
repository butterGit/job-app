import connectDB from "./db";
import { Board, Column } from "./models";

const DEFAULT_COLUMNS = [
  { name: "Wish List", order: 0 },
  { name: "Applied", order: 1 },
  { name: "Interviewing", order: 2 },
  { name: "Offer", order: 3 },
  { name: "Rejected", order: 4 },
];

export const initializeUserBoard = async (userId: string) => {
  try {
    await connectDB();

    const existing = await Board.findOne({ userId, name: "Job Hunt" });

    if (existing) {
      return existing;
    }

    const board = await Board.create({
      name: "Job Hunt",
      userId,
      columns: [],
    });

    const columns = await Promise.all(
      DEFAULT_COLUMNS.map((col) =>
        Column.create({ ...col, boardId: board._id, jobApplications: [] }),
      ),
    );

    board.columns = columns.map((col) => col._id);
    await board.save();
    return board;
  } catch (error) {
    console.error("Error initializing user board:", error);
    throw error;
  }
};
