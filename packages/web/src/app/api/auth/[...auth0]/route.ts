import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Simple implementation of Auth0 login/callback/logout routes
export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);

  // Login route
  if (pathname.endsWith('/login')) {
    const redirectUri = `${process.env.AUTH0_BASE_URL}/api/auth/callback`;
    const authUrl = `${process.env.AUTH0_ISSUER_BASE_URL}/authorize?` +
      `response_type=code&` +
      `client_id=${process.env.AUTH0_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=openid profile email`;

    return NextResponse.redirect(authUrl);
  }

  // Callback route
  if (pathname.endsWith('/callback')) {
    // In a real implementation, you would exchange the code for tokens
    // For this workaround, we'll create a simple mock session
    const mockSession = {
      user: {
        name: 'Demo User',
        email: 'user@example.com',
        sub: 'auth0|123456',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    // Sign the session with your AUTH0_SECRET
    const token = jwt.sign(mockSession, process.env.AUTH0_SECRET!);

    // Set the session cookie
    return new NextResponse(null, {
      status: 302,
      headers: {
        'Set-Cookie': `appSession=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax;${process.env.NODE_ENV === 'production' ? ' Secure;' : ''}`,
        Location: process.env.AUTH0_BASE_URL!,
      },
    });
  }

  // Logout route
  if (pathname.endsWith('/logout')) {
    return new NextResponse(null, {
      status: 302,
      headers: {
        'Set-Cookie': 'appSession=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax;',
        Location: process.env.AUTH0_BASE_URL!,
      },
    });
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}