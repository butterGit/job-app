import { getSession } from "@/lib/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import KanbanBoard from "@/components/kanban-board";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const getBoard = async (userId: string | undefined) => {
  "use cache";
  await connectDB();

  if (!userId) {
    return null;
  }

  const board = await Board.findOne({
    userId: userId,
    name: "Job Hunt",
  })
    .populate({
      path: "columns",
      populate: {
        path: "jobApplications",
      },
    })
    .lean();

  return board;
};

async function DashboardPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const board = await getBoard(session?.user?.id);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Job Hunt</h1>
          <p className="text-gray-600">Track your job applications</p>
        </div>
        <KanbanBoard board={board} userId={session?.user?.id} />
      </div>
    </div>
  );
}

export default async function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  );
}
