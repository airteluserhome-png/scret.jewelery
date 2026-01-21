import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 26, // Larger text
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF0055', // Hot Pink
                    fontWeight: 900, // Extra Bold
                    borderRadius: '0px',
                    fontFamily: 'Impact, sans-serif', // Thicker, blockier font
                }}
            >
                S
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
