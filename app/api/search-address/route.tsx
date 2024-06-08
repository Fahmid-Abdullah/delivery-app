import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('q');

    const url = `${BASE_URL}?q=${searchText}&language=en&limit=5&session_token=[GENERATED-UUID]&proximity=-83.748708,42.265837&country=CA&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

    try {
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
        }
        const searchResults = await res.json();
        return NextResponse.json({ searchResults });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
