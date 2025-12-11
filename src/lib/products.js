const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'Multi-Purpose Cleaning Supplies Kit',
    category: 'Cleaning and Housekeeping Items',
    price: 1200,
    rating: 4.5,
    reviews: 128,
    image: '🧹',
    sku: 'CS-2024-001',
    stock: 450,
    description: 'Comprehensive cleaning and housekeeping supplies for professional use.',
    specifications: [
      'Quantity: 25 pieces',
      'Includes: Mops, brushes, cloths',
      'Material: High-grade synthetic',
      'Suitable for: Office, hospital, commercial'
    ],
    features: [
      'Professional grade',
      'Durable materials',
      'Eco-friendly options',
      'Long-lasting'
    ],
    warranty: '12 months'
  },
  {
    id: 2,
    name: 'LED Emergency Lighting System',
    category: 'Electronic Items',
    price: 2850,
    rating: 4.8,
    reviews: 245,
    image: '💡',
    sku: 'EL-2024-002',
    stock: 1200,
    description: 'Advanced LED emergency lighting system for institutional use.',
    specifications: [
      'Power: 20W LED',
      'Battery Backup: 8 hours',
      'Input: 220V AC',
      'Certification: ISO approved'
    ],
    features: [
      'Energy efficient',
      'Auto on/off',
      'Long battery life',
      'Certified quality'
    ],
    warranty: '24 months'
  },
  {
    id: 3,
    name: 'Complete Safety Equipment Bundle',
    category: 'Safety Items',
    price: 5400,
    rating: 4.6,
    reviews: 89,
    image: '🛡️',
    sku: 'SE-2024-003',
    stock: 120,
    description: 'Comprehensive safety equipment for workplace protection.',
    specifications: [
      'Includes: Helmets, gloves, vests',
      'Quantity: 50 pieces',
      'Material: Industrial grade',
      'Standards: ISI certified'
    ],
    features: [
      'Complete protection',
      'Professional grade',
      'ISI certified',
      'Durable construction'
    ],
    warranty: '24 months'
  },
  {
    id: 4,
    name: 'Ergonomic Office Chair',
    category: 'Furniture and Fixtures',
    price: 8500,
    rating: 4.7,
    reviews: 156,
    image: '🪑',
    sku: 'OF-2024-004',
    stock: 350,
    description: 'Premium ergonomic office chair for comfortable working environment.',
    specifications: [
      'Material: High-quality mesh',
      'Adjustable height: 45-55cm',
      'Weight capacity: 150kg',
      'Base: Heavy-duty metal'
    ],
    features: [
      'Ergonomic design',
      'Adjustable components',
      'Premium materials',
      'Long service life'
    ],
    warranty: '36 months'
  },
  {
    id: 5,
    name: 'Desktop Computer Hardware Bundle',
    category: 'Computer Hardwares',
    price: 45000,
    rating: 4.5,
    reviews: 95,
    image: '💻',
    sku: 'CH-2024-005',
    stock: 75,
    description: 'Complete desktop computer hardware bundle for office and institutional use.',
    specifications: [
      'Processor: Intel i5 equivalent',
      'RAM: 8GB DDR4',
      'Storage: 256GB SSD',
      'Monitor: 21.5 inch LED'
    ],
    features: [
      'High performance',
      'Energy efficient',
      'Certified components',
      'Complete package'
    ],
    warranty: '36 months'
  },
  {
    id: 6,
    name: 'Clinical Medical Instruments Set',
    category: 'Clinical Items',
    price: 6200,
    rating: 4.8,
    reviews: 203,
    image: '⚕️',
    sku: 'CI-2024-006',
    stock: 200,
    description: 'Professional clinical medical instruments for healthcare facilities.',
    specifications: [
      'Quantity: 40 instruments',
      'Material: Surgical stainless steel',
      'Sterilization: Autoclave ready',
      'Standards: Medical grade'
    ],
    features: [
      'Medical grade quality',
      'Sterilizable',
      'Precise instruments',
      'Professional standard'
    ],
    warranty: '24 months'
  },
  {
    id: 7,
    name: 'Heavy-Duty Utility Bags Set',
    category: 'Bags',
    price: 3200,
    rating: 4.4,
    reviews: 142,
    image: '👜',
    sku: 'BG-2024-007',
    stock: 500,
    description: 'Durable utility bags for storage and transportation.',
    specifications: [
      'Quantity: 10 bags',
      'Material: Canvas + nylon',
      'Size: 30L capacity each',
      'Warranty: Reinforced stitching'
    ],
    features: [
      'Heavy-duty construction',
      'Multiple compartments',
      'Long-lasting',
      'Professional grade'
    ],
    warranty: '12 months'
  },
  {
    id: 8,
    name: 'Premium Thermal Paper Roll Bundle',
    category: 'Thermal Papers and Stickers',
    price: 1800,
    rating: 4.6,
    reviews: 178,
    image: '🖨️',
    sku: 'TP-2024-008',
    stock: 800,
    description: 'High-quality thermal papers and stickers for printing applications.',
    specifications: [
      'Format: 80mm x 100mm',
      'Quantity: 100 rolls',
      'GSM: 80gsm',
      'Quality: Premium grade'
    ],
    features: [
      'Crisp printing',
      'Weather resistant',
      'Professional output',
      'Long shelf life'
    ],
    warranty: '6 months'
  }
];

export const CATEGORIES = [
  {
    name: 'Cleaning & Housekeeping Items',
    subs: [
      'Floor Cleaners',
      'Hand wash',
      'Toilet cleaners',
      'Glass Cleaners',
      'Brooms - soft',
      'Brooms - hard'
    ]
  },
  {
    name: 'Electronic Items',
    subs: [
      'Power Contractor',
      'Air Break Contractor',
      'HR Fuse',
      'Relay',
      'Insulating mat',
      'MCCB',
      'Vacuum contractor'
    ]
  },
  {
    name: 'Safety Items',
    subs: [
      'Hand gloves',
      'Safety Shoes',
      'High voltage electrical gloves',
      'Road Traffic Cones',
      'Safety Floor stand',
      'Gumboots'
    ]
  },
  {
    name: 'Furniture & Fixtures',
    subs: [
      'Office chair',
      'Executive office chair',
      'Visitor chair',
      'Sofa set - Single seater',
      'Sofa set - Double seater',
      'Sofa set - Three seater',
      'Sofa set - Five seater',
      'Wooden sofa Set',
      'Computer table',
      'Computer Chair',
      'Executive table',
      'L-shape Executive table',
      'Steel table',
      'Center Table'
    ]
  },
  {
    name: 'IT',
    subs: [
      'Keyboard',
      'Pen Drives',
      'Routers',
      'Computer',
      'Laptop'
    ]
  },
  {
    name: 'Clinical Items',
    subs: [
      'Vaccine Carrier',
      'Lab coat',
      'Doctor gown',
      'Mackintosh sheet',
      'Urinal cube',
      'Hospital bedsheet',
      'Vomit bag',
      'POP bandage',
      'Gloves',
      'Pillow Covers',
      'Surgical Gowns'
    ]
  },
  {
    name: 'Bags',
    subs: [
      'School bags',
      'Laptop bag'
    ]
  },
  {
    name: 'Thermal Papers & Stickers',
    subs: [
      'Thermal paper roll',
      'Speed post sticker',
      'Register barcode',
      'Multipurpose sticker',
      'Label sticker'
    ]
  },
  {
    name: 'Waste & Bins',
    subs: [
      'Biomedical Waste Bins',
      'DOM Type Round Dustbin',
      'Dustbin with wheel',
      'Pedestal Type Round Dustbin',
      'Swing Type Round Dustbin'
    ]
  }
];

// Flattened category options for selects and legacy compatibility
export const CATEGORY_OPTIONS = [
  'All Products',
  ...CATEGORIES.map(c => c.name),
  ...CATEGORIES.flatMap(c => c.subs)
];

// Backwards-compatible export: initial product list
export const PRODUCTS = DEFAULT_PRODUCTS;


// LocalStorage-backed product state helpers
export function getProducts() {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
  const raw = localStorage.getItem('novelsols_products');
  if (!raw) return DEFAULT_PRODUCTS;
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function setProducts(products) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('novelsols_products', JSON.stringify(products));
}
