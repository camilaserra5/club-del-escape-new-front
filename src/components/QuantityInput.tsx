import React, { useState } from 'react';

function QuantityInput() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center">
      <button
        className="bg-amber-300 text-gray-700  px-3 py-2 focus:outline-none border border-amber-300"
        onClick={() => setQuantity(quantity - 1)}
        disabled={quantity <= 1}
      >
        -
      </button>
      <input
        type="text"
        className="px-3 bg-black py-2 text-center w-12 text-gray-100 focus:outline-none border border-amber-300"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button
        className="bg-amber-300 text-gray-700  px-3 py-2 focus:outline-none border border-amber-300"
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}

export default QuantityInput;