import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create demo users
  const adminPassword = await bcrypt.hash("admin-sentinel-2026", 12);
  const analystPassword = await bcrypt.hash("analyst-sentinel-2026", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@atlas-sentinel.mil" },
    update: {},
    create: {
      email: "admin@atlas-sentinel.mil",
      name: "Commander Atlas",
      role: "ADMIN",
      clearance: "SCI",
      password: adminPassword,
    },
  });

  const analyst = await prisma.user.upsert({
    where: { email: "analyst@atlas-sentinel.mil" },
    update: {},
    create: {
      email: "analyst@atlas-sentinel.mil",
      name: "Senior Analyst",
      role: "ANALYST",
      clearance: "SECRET",
      password: analystPassword,
    },
  });

  // Create sample intel reports
  const reports = [
    {
      userId: admin.id,
      title: "Eastern European Armor Movement Assessment",
      classification: "TOP_SECRET" as const,
      region: "AOR-EASTEU",
      threatLevel: "FLASH" as const,
      summary: "Division-level mechanized units detected within 15km of border.",
      details: "Full assessment of 3rd Guards Tank Army repositioning. Satellite imagery confirms 400 MBTs, 200 IFVs.",
      sources: ["SIGINT", "IMINT", "HUMINT"],
    },
    {
      userId: analyst.id,
      title: "Baltic Cyber Infrastructure Analysis",
      classification: "SECRET" as const,
      region: "AOR-BALTIC",
      threatLevel: "CRITICAL" as const,
      summary: "Coordinated APT campaign targeting critical infrastructure.",
      details: "47 C2 nodes identified across 12 jurisdictions. Attribution: APT29 variant.",
      sources: ["CYBERCOM", "NCSC"],
    },
  ];

  for (const report of reports) {
    await prisma.intelReport.create({ data: report });
  }

  console.log("✅ Seed complete:");
  console.log(`  - Admin user: admin@atlas-sentinel.mil`);
  console.log(`  - Analyst user: analyst@atlas-sentinel.mil`);
  console.log(`  - 2 sample intel reports created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
