import React, { useEffect, useRef } from "react";

const NameImage = ({ name }) => {
    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    // Function to generate a random color in hexadecimal format
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const canvasSize = 50;
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        // Generate a random background color
        const backgroundColor = getRandomColor();

        // Set the random background color
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvasSize, canvasSize);

        // Split the name into initials
        const initials = name
            .split(" ")
            .map((word) => word[0].toUpperCase())
            .join("");

        // Set text properties
        context.fillStyle = "#ffffff"; // White text color for contrast
        context.font = "20px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";

        // Draw text
        context.fillText(initials, canvasSize / 2, canvasSize / 2);

        // Convert canvas to image URL and set it to the img element
        const imageURL = canvas.toDataURL("image/png");
        imageRef.current.src = imageURL;
    }, [name]);

    return (
        <div>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            <img
                ref={imageRef}
                className="w-10 h-10 rounded-full"
                alt={`${name} Initials`}
            />
        </div>
    );
};

export default NameImage;
