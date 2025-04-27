import React from "react";
import Barcode from "react-barcode";

interface BarcodeGeneratorProps {
  value: string;
  width?: string | number;
  height?: string | number;
}

const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = ({ value }) => {
  console.log(value);
  
  return (
    <div>
      <Barcode
        value={value}
        format="CODE128"
        width={1.1}
        height={40}
        displayValue={true}
        fontSize={9}
        background="#ffffff"
        lineColor="#000000"
      />
    </div>
  );
};

export default BarcodeGenerator;
