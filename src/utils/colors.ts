export const bgColors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', 
'#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'];

export interface Color {
  background: string;
  text: string;
}

export const contrastColors = (bgColor: string): Color => {
  const dark = ['#B80000', '#DB3E00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB'];

  return {
    background: bgColor,
    text: dark.includes(bgColor) ? '#FFFFFF': '#000000',
  };
}