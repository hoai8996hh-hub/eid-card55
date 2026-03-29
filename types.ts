export interface Template {
  id: number;
  name: string;
  category: 'elegant' | 'modern' | 'islamic' | 'festive';
  gradient: string[];
  pattern: string;
  textColor: string;
  titleSize: string;
  subtitleSize: string;
}

export interface UserData {
  name: string;
  imageUrl: string | null;
  selectedTemplate: number;
}
