import React from 'react';
import Button from './Button';
import Image from 'next/image';

const Card = ({
  title,
  imgSrc,
  description,
  glass,
  category,
  onAddToBasket,
  onClick,
}) => {
  return (
    <div
      className="flex flex-col max-w-xs w-full h-auto transform rounded-xl bg-white px-4 pb-4 pt-4 shadow-lg transition duration-500 hover:scale-105 card cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-indigo mb-2 text-lg font-bold truncate">{title}</h3>

      <div className="relative w-full h-56">
        <Image
          className="object-cover rounded-xl"
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex-1 my-2">
        <div className="flex items-center space-x-1 text-sm my-5">
          <span>
            <Image
              className="h-7 w-auto"
              src="https://cdn-icons-png.flaticon.com/512/5873/5873604.png"
              alt="Cocktails Explorer"
              width={28}
              height={28}
              priority={true}
            />
          </span>
          <p>{`${glass} - ${category}`}</p>
        </div>

        <div className="flex items-center space-x-1 text-xs mb-5">
          <p className="line-clamp-3">{description}</p>
        </div>
      </div>

      <Button
        text="Sepete Ekle"
        className="mt-auto"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onAddToBasket();
        }}
      />
    </div>
  );
};

export default Card;
