import { NextResponse } from "next/server";
import { loadTable, patchRow } from "@/app/table/table.logic";

export async function GET() {
  return NextResponse.json(loadTable(), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, patch } = body;

    if (!id || !patch) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    patchRow(id, patch);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
