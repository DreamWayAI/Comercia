import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { MATERIAL_PRICES } from "./constants";

// Function to convert Cyrillic text to Latin transliteration for PDF compatibility
function transliterate(text: string): string {
  const cyrillicToLatin: { [key: string]: string } = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
    'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
    'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts',
    'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'І': 'I', 'і': 'i', 'Ї': 'Yi', 'ї': 'yi', 'Є': 'Ye', 'є': 'ye', 'Ґ': 'G', 'ґ': 'g'
  };
  
  return text.split('').map(char => cyrillicToLatin[char] || char).join('');
}

export async function generatePDF(proposalData: any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const { width, height } = page.getSize();
  const margin = 50;
  
  // Header with English text to avoid encoding issues
  page.drawText('COMMERCIAL PROPOSAL', {
    x: margin,
    y: height - margin,
    size: 20,
    font: boldFont,
    color: rgb(0.77, 0.12, 0.23), // PoliBest red
  });
  
  page.drawText('POLYMER MATERIALS FOR PROTECTIVE COATING', {
    x: margin,
    y: height - margin - 30,
    size: 14,
    font: boldFont,
  });
  
  page.drawText('PoliBest 911 (solvent-free)', {
    x: margin,
    y: height - margin - 50,
    size: 12,
    font,
  });
  
  // Project details
  let yPosition = height - margin - 100;
  
  page.drawText(`Країна: ${getCountryLabel(proposalData.country)}`, {
    x: margin,
    y: yPosition,
    size: 12,
    font,
  });
  
  page.drawText(`Місто: ${proposalData.city}`, {
    x: margin,
    y: yPosition - 20,
    size: 12,
    font,
  });
  
  page.drawText(`Total Area: ${proposalData.totalArea?.toFixed(1)} sq.m`, {
    x: margin,
    y: yPosition - 40,
    size: 12,
    font,
  });
  
  // Detailed room calculations
  yPosition -= 80;
  page.drawText('ROOM CALCULATIONS:', {
    x: margin,
    y: yPosition,
    size: 14,
    font: boldFont,
  });
  
  yPosition -= 30;
  let materialOffset = 0;
  
  // Generate table for each room
  proposalData.rooms?.forEach((room: any, index: number) => {
    const roomNumber = index + 1;
    const area = room.area || 0;
    const layers = parseInt(room.type || '1');
    const material = room.material || 'enamel';
    const materialQty = room.materialQty || 0;
    const materialCost = room.materialCost || 0;
    
    // Room header
    page.drawText(`Room ${roomNumber} - ${area} sq.m`, {
      x: margin,
      y: yPosition - materialOffset,
      size: 12,
      font: boldFont,
    });
    materialOffset += 20;
    
    page.drawText(`Protective polymer coating PoliBest 911 (${layers} layer${layers === 1 ? '' : 's'})`, {
      x: margin,
      y: yPosition - materialOffset,
      size: 10,
      font,
    });
    materialOffset += 25;
    
    // Table headers
    page.drawText('No.', {
      x: margin,
      y: yPosition - materialOffset,
      size: 9,
      font: boldFont,
    });
    page.drawText('Materials', {
      x: margin + 40,
      y: yPosition - materialOffset,
      size: 9,
      font: boldFont,
    });
    page.drawText('Usage per sq.m, kg', {
      x: margin + 200,
      y: yPosition - materialOffset,
      size: 9,
      font: boldFont,
    });
    page.drawText('Total quantity, kg', {
      x: margin + 320,
      y: yPosition - materialOffset,
      size: 9,
      font: boldFont,
    });
    page.drawText(`Price ${currencySymbol} per 1 kg incl. VAT`, {
      x: margin + 430,
      y: yPosition - materialOffset,
      size: 9,
      font: boldFont,
    });
    page.drawText(`Total ${currencySymbol} incl. VAT`, {
      x: margin + 500,
      y: yPosition - materialOffset,
      size: 9,
      font: boldFont,
    });
    materialOffset += 20;
    
    // Material row
    const materialName = material === 'enamel' ? 'PoliBest 911 (захисна епоксидна емаль для бетону, 2-х компонентна)' :
                        material === 'paint' ? 'PoliBest 911 (фарба)' : 'PoliBest 911 (грунт)';
    const consumptionRate = (layers * 0.1).toFixed(3);
    // Get price from constants - simplified for now
    const currencyPrices = proposalData.currency === 'EUR' ? 
      { enamel: 34.56, paint: 27.18, primer: 19.71 } : 
      { enamel: 1512, paint: 1188, primer: 864 };
    const price = currencyPrices[material as keyof typeof currencyPrices];
    
    page.drawText('1', {
      x: margin + 10,
      y: yPosition - materialOffset,
      size: 9,
      font,
    });
    page.drawText(materialName.substring(0, 50), {
      x: margin + 40,
      y: yPosition - materialOffset,
      size: 8,
      font,
    });
    page.drawText(consumptionRate, {
      x: margin + 230,
      y: yPosition - materialOffset,
      size: 9,
      font,
    });
    page.drawText(materialQty.toFixed(1), {
      x: margin + 340,
      y: yPosition - materialOffset,
      size: 9,
      font,
    });
    page.drawText(price.toString(), {
      x: margin + 450,
      y: yPosition - materialOffset,
      size: 9,
      font,
    });
    page.drawText(materialCost.toLocaleString(), {
      x: margin + 520,
      y: yPosition - materialOffset,
      size: 9,
      font,
    });
    materialOffset += 25;
    
    // Room total
    page.drawText(`Total materials cost incl. VAT: ${materialCost.toLocaleString()} ${currencySymbol}`, {
      x: margin,
      y: yPosition - materialOffset,
      size: 10,
      font: boldFont,
    });
    materialOffset += 15;
    
    const roomDiscount = materialCost * ((proposalData.discountPercent || 20) / 100);
    const roomTotal = materialCost - roomDiscount;
    
    page.drawText(`Dealer discount ${proposalData.discountPercent || 20}%. Total = ${roomTotal.toLocaleString()} ${currencySymbol}`, {
      x: margin,
      y: yPosition - materialOffset,
      size: 10,
      font: boldFont,
      color: rgb(0, 0.6, 0),
    });
    materialOffset += 20;
    
    page.drawText('Production time: up to 9 calendar days after 100% payment', {
      x: margin,
      y: yPosition - materialOffset,
      size: 9,
      font,
    });
    materialOffset += 15;
    
    page.drawText('7 years warranty on materials', {
      x: margin,
      y: yPosition - materialOffset,
      size: 9,
      font,
    });
    materialOffset += 35;
  });
  
  // Pricing
  yPosition -= (60 + materialOffset);
  page.drawText('PRICING:', {
    x: margin,
    y: yPosition,
    size: 14,
    font: boldFont,
  });
  
  yPosition -= 30;
  
  const currencySymbol = proposalData.currency === 'UAH' ? 'UAH' : 'EUR';
  
  page.drawText(`Materials cost incl. VAT: ${proposalData.materialsCost?.toLocaleString()} ${currencySymbol}`, {
    x: margin,
    y: yPosition,
    size: 12,
    font,
  });
  
  page.drawText(`Dealer discount (${proposalData.discountPercent || 20}%): -${proposalData.discount?.toLocaleString()} ${currencySymbol}`, {
    x: margin,
    y: yPosition - 20,
    size: 12,
    font,
  });
  
  page.drawText(`TOTAL: ${proposalData.finalCost?.toLocaleString()} ${currencySymbol}`, {
    x: margin,
    y: yPosition - 50,
    size: 16,
    font: boldFont,
    color: rgb(0.77, 0.12, 0.23),
  });
  
  // Material Information Section
  yPosition -= 120;
  page.drawText('ABOUT PoliBest 911 MATERIALS:', {
    x: margin,
    y: yPosition,
    size: 14,
    font: boldFont,
  });
  
  yPosition -= 25;
  page.drawText('Solvent-free polymer coating PoliBest 911 is recommended for arrangement', {
    x: margin,
    y: yPosition,
    size: 10,
    font,
  });
  
  page.drawText('of concrete floors and walls as decorative-protective coating with high resistance', {
    x: margin,
    y: yPosition - 12,
    size: 10,
    font,
  });
  
  page.drawText('to mechanical and chemical damage.', {
    x: margin,
    y: yPosition - 24,
    size: 10,
    font,
  });
  
  yPosition -= 50;
  page.drawText('MAIN ADVANTAGES:', {
    x: margin,
    y: yPosition,
    size: 12,
    font: boldFont,
  });
  
  const advantages = [
    '• Material without odor and solvents',
    '• Economical consumption',
    '• High resistance to mechanical and chemical damage',
    '• Easy application: roller, spatula, sprayer',
    '• Dedusting and maximum hardening of concrete surface',
    '• Long service life of coating',
    '• Vapor permeable and UV resistant',
    '• Does not lose properties at low temperatures',
    '• Fire safe (no volatile substances)'
  ];
  
  yPosition -= 20;
  advantages.forEach((advantage, index) => {
    page.drawText(advantage, {
      x: margin,
      y: yPosition - (index * 12),
      size: 9,
      font,
    });
  });
  
  yPosition -= advantages.length * 12 + 25;
  page.drawText('TECHNICAL PARAMETERS:', {
    x: margin,
    y: yPosition,
    size: 12,
    font: boldFont,
  });
  
  const techSpecs = [
    '• Type: two-component',
    '• Color: according to order, RAL',
    '• Service life in mixed state: from 30 min (+30°C) to 3 hours (+10°C)',
    '• Start of operation: 24 hours - pedestrian loads',
    '• Mechanical loads: 5 days',
    '• Full polymerization: 7 days for chemical treatment',
    '• Adhesion: coating exceeds concrete strength'
  ];
  
  yPosition -= 20;
  techSpecs.forEach((spec, index) => {
    page.drawText(spec, {
      x: margin,
      y: yPosition - (index * 12),
      size: 9,
      font,
    });
  });
  
  // Terms
  yPosition -= techSpecs.length * 12 + 40;
  page.drawText('TERMS:', {
    x: margin,
    y: yPosition,
    size: 14,
    font: boldFont,
  });
  
  yPosition -= 30;
  page.drawText('• Production time: up to 9 calendar days after 100% payment', {
    x: margin,
    y: yPosition,
    size: 10,
    font,
  });
  
  page.drawText('• Materials warranty: 7 years', {
    x: margin,
    y: yPosition - 15,
    size: 10,
    font,
  });
  
  // Footer
  page.drawText('TM PoliBest', {
    x: margin,
    y: 50,
    size: 12,
    font: boldFont,
  });
  
  page.drawText('+38(093)-512-58-38 | vedevpered@gmail.com', {
    x: margin,
    y: 30,
    size: 10,
    font,
  });
  
  try {
    const pdfBytes = await pdfDoc.save();
    
    // Create and download the PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `Commercial_Proposal_${proposalData.city || 'PoliBest'}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Ensure the link is added to DOM for some browsers
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Невідома помилка';
    throw new Error(`Помилка створення PDF: ${errorMessage}`);
  }
}

function getCountryLabel(value: string): string {
  const countryMap: { [key: string]: string } = {
    ukraine: "Україна",
    poland: "Польща",
    romania: "Румунія"
  };
  return countryMap[value] || value;
}
