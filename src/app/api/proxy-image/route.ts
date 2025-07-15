import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // URL 유효성 검사
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    console.log('프록시 이미지 요청:', imageUrl);

    // 외부 이미지 fetch
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TryItOn-Bot/1.0)',
      },
    });

    if (!response.ok) {
      console.error('이미지 fetch 실패:', response.status, response.statusText);
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type') || 'image/png';
    const imageBuffer = await response.arrayBuffer();

    console.log('프록시 이미지 성공:', imageUrl, 'Size:', imageBuffer.byteLength);

    // CORS 헤더와 함께 이미지 반환
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=3600', // 1시간 캐시
      },
    });

  } catch (error) {
    console.error('프록시 이미지 에러:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
