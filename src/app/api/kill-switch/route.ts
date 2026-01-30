import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
    // Check if kill switch is activated via environment variable
    const killSwitch = process.env.SITE_KILL_SWITCH;
    const killMessage = process.env.SITE_KILL_MESSAGE || "Site temporarily unavailable for maintenance";

    if (killSwitch === "true" || killSwitch === "1") {
        return NextResponse.json({
            killed: true,
            message: killMessage,
            timestamp: new Date().toISOString(),
        });
    }

    return NextResponse.json({
        killed: false,
        timestamp: new Date().toISOString(),
    });
}
