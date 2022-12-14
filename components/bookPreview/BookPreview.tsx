import Image, { StaticImageData } from "next/future/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import clsx from "clsx";
import { randomInt } from "../../utils/random";

const bookSizes = {
    homepage: "h-54",
    previewGrid: "h-45",
    listItem: "h-20",
    confirmationScreen: "h-89",
    carouselItem: "h-54",
};

const placeholderColors = ["bg-blue", "bg-salmon", "bg-dustyRose"];
interface BookPreviewProps {
    /**
     * Source of Image?
     */
    imgSrc?: string | StaticImageData;
    /**
     * Book title?
     */
    bookTitle;
    /**
     * Book author?
     */
    bookAuthor;
    /**
     * Link target of where preview takes you
     */
    linkHref: string;
    /**
     * Determine context and and size of component
     */
    bookSize: keyof typeof bookSizes;
}

/**
 * Book thumbnail that can be used in lists and overviews. Aspet ratio fixed to prevent distorted images.
 */
export const BookPreview = ({
    bookSize,
    imgSrc,
    bookTitle,
    bookAuthor,
    linkHref,
}: BookPreviewProps) => {
    const [faved, setFaved] = useState(false);

    function toggleFavorite() {
        console.log(faved);
        setFaved(!faved);
    }

    // TODO: if we change design for larger screen we need to modify the sizes below.
    let sizes = "100vw";
    switch (bookSize) {
        case "previewGrid":
            sizes = "40vw";
            break;
        case "homepage":
            sizes = "28vw";
            break;
        case "confirmationScreen":
            sizes = "62vw";
            break;
        case "listItem":
            var tinyText = true;
            sizes = "17vw";
            break;
        case "carouselItem":
            sizes = "28vw";
            var modifiedShadow = true;
            break;
        default:
            break;
    }

    // the actual image tag
    let image;

    // if no image provide we fill image tag with placeholder
    if (!imgSrc) {
        image = (
            <div
                className={clsx(
                    "font-serif flex h-full w-full flex-col items-center justify-between p-4 text-center text-white",
                    placeholderColors[randomInt(3)]
                )}
            >
                <p
                    className={clsx(
                        tinyText ? "w-full truncate text-[11px]" : "text-sm"
                    )}
                >
                    {bookTitle}
                </p>
                <p
                    className={clsx(
                        "w-full truncate",
                        tinyText ? "text-[9px]" : "text-xs"
                    )}
                >
                    {bookAuthor}
                </p>
            </div>
        );
    } else {
        image = (
            <Image
                src={imgSrc}
                fill
                alt={bookAuthor + ": " + bookTitle}
                sizes={sizes}
                title={bookTitle}
                style={{ objectFit: "contain" }}
            />
        );
    }

    if (bookSize === "previewGrid") {
        return (
            <Link href={linkHref}>
                <div
                    className={clsx(
                        bookSizes[bookSize],
                        "relative flex h-44 w-40 items-center justify-center bg-linen"
                    )}
                >
                    <div className="relative aspect-6/9 h-5/6 bg-linen drop-shadow">
                        {image}
                    </div>
                    <div className="text-gray-400 absolute bottom-0 right-0 flex aspect-square w-1/4 items-center justify-center bg-white opacity-90 ">
                        <button
                            className="flex h-full w-full items-center justify-center"
                            onClick={toggleFavorite}
                        >
                            <FiHeart
                                className={clsx(
                                    "h-5/6 w-5/6 stroke-1",
                                    faved
                                        ? "fill-salmon text-salmon"
                                        : "text-grey"
                                )}
                            />
                        </button>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <div
            className={clsx(
                bookSizes[bookSize],
                "relative aspect-6/9 w-fit bg-linen drop-shadow"
            )}
        >
            <Link href={linkHref}>{image}</Link>
        </div>
    );
};
