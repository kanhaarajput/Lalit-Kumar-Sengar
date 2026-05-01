import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return new NextResponse('Failed to fetch file', { status: response.status });
    }

    const blob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Disposition', 'attachment; filename="Lalit_Kumar_Sengar_CV.pdf"');
    headers.set('Content-Type', 'application/pdf');

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Error downloading file', { status: 500 });
  }
}
