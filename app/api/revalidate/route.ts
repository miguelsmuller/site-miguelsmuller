import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { HOME_CONTENT_CACHE_TAG } from '../../services/hygraph'

const SECRET_HEADER = 'x-revalidate-secret'

function getBearerToken(authorizationHeader: string | null): string | null {
  if (!authorizationHeader) {
    return null
  }

  if (!authorizationHeader.toLowerCase().startsWith('bearer ')) {
    return null
  }

  return authorizationHeader.slice(7).trim()
}

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.REVALIDATE_SECRET

  if (!expectedSecret) {
    return NextResponse.json(
      { revalidated: false, message: 'REVALIDATE_SECRET is not configured.' },
      { status: 500 }
    )
  }

  const headerSecret = request.headers.get(SECRET_HEADER)
  const bearerSecret = getBearerToken(request.headers.get('authorization'))
  const querySecret = request.nextUrl.searchParams.get('secret')

  const providedSecret = headerSecret || bearerSecret || querySecret

  if (!providedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json(
      { revalidated: false, message: 'Invalid revalidation secret.' },
      { status: 401 }
    )
  }

  revalidateTag(HOME_CONTENT_CACHE_TAG)
  revalidatePath('/')

  return NextResponse.json(
    { revalidated: true, path: '/', tag: HOME_CONTENT_CACHE_TAG },
    { status: 200 }
  )
}
