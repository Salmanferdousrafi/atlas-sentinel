import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { resourceUnits } from "@/app/data/crisisData";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    units: resourceUnits,
    total: resourceUnits.length,
    deployed: resourceUnits.filter((u) => u.status === "DEPLOYED").length,
    staging: resourceUnits.filter((u) => u.status === "STAGING").length,
    standby: resourceUnits.filter((u) => u.status === "STANDBY").length,
  });
}
