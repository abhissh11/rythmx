import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const YT_REGEX = new RegExp("https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}$")

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = YT_REGEX.test(data.url)
        if (!isYt) {
            return NextResponse.json({
                message: "Error while adding a stream"
            }, {
                status: 411
            })
        }

        const extractedId = data.url.split("?v=")[1];

        await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "YouTube"
            }
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 411
        })
    }
}