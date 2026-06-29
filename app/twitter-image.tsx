import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SewDigital - Stop running your tailoring business from a chaotic notebook.'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Simple top logo representation */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            display: 'flex',
            alignItems: 'center',
            fontSize: 28,
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.02em',
          }}
        >
          SEWDIGITAL
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '40px',
          }}
        >
          {/* Main heading */}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: 0,
            }}
          >
            <span>STOP RUNNING YOUR TAILORING</span>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>BUSINESS FROM A </span>
              <span style={{ color: '#FDE047' }}>CHAOTIC</span>
            </div>
            <span style={{ color: '#FDE047' }}>NOTEBOOK.</span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: 32,
              color: '#78716C', // text-stone-500
              marginTop: '40px',
              maxWidth: '800px',
              textAlign: 'center',
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            SewDigital keeps your clients, measurements, and orders perfectly organized in one place.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
