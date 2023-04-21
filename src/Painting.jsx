export default function Painting({ pixels, onPixelClick }) {
    return (
        <div className="flex flex-col aspect-square flex-grow">
            {pixels.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-grow">
                    {row.map((color, colIndex) => (
                        <div
                            key={colIndex}
                            className="flex-grow border border-black"
                            style={{ backgroundColor: color || "#FFFFFF" }}
                            onClick={() => {
                                onPixelClick?.(rowIndex, colIndex);
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}