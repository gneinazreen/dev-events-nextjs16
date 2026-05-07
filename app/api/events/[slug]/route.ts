import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event, {IEvent} from "@/database/event.model";

type RouteParams = {
    params: Promise<{
        slug: string;
    }>;
};

export async function GET(
    req: NextRequest,
    { params }: RouteParams
): Promise<Response> {
    try{
        await connectDB();
        const { slug } = await params;
        if(!slug || typeof slug !== 'string' || slug.trim() === ''){
            return NextResponse.json({message: 'Invalid slug parameter'}, {status: 400})
        }
        const sanitizedSlug = slug.trim().toLowerCase();
        const event = await Event.findOne({ slug: sanitizedSlug }).lean();
        if(!event){
            return NextResponse.json({message: 'Event not found'}, {status: 404})
        }
        return NextResponse.json({message:'Event fetched successfuly',event}, {status:200});
    
    
    
    }catch(e){
        if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching event:', e);
        }
        if(e instanceof Error){
            if(e.message.includes('MONGODB_URI')){
                return NextResponse.json({message: 'Database connection error. Please check your MongoDB URI.'}, {status: 500})
            }
        }
        return NextResponse.json({message: 'Failed to fetch event', error: e instanceof Error ? e.message : 'Unknown error'}, {status: 500})

    }
}