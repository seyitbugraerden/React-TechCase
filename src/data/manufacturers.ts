import type { Manufacturer } from '@/types'

function picsum(seed: string) {
  return `https://picsum.photos/seed/${seed}/1600/1000`
}

export const manufacturers: Manufacturer[] = [
  {
    id: 'atlas-textile',
    name: 'Atlas Textile Studio',
    city: 'İstanbul',
    category: 'Tekstil',
    minimumOrder: 1200,
    leadTimeDays: 18,
    score: 4.9,
    monthlyCapacity: 18000,
    logoText: 'AT',
    description:
      'Atlas Textile Studio; dokuma, örme ve konfeksiyon hatlarını tek operasyonda yönetir. Numuneden sevkiyata kadar net milestone planları, kalite raporları ve satın alma ekibiyle hızlı iletişim sunar.',
    certifications: ['ISO 9001', 'BSCI', 'OEKO-TEX', 'Sedex'],
    offerings: ['T-shirt', 'Sweatshirt', 'Jogger', 'Outerwear'],
    coverStyle:
      'linear-gradient(135deg, #0f172a 0%, #1d4ed8 52%, #38bdf8 100%)',
    gallery: [
      {
        title: 'Cut & sew line',
        caption: 'Numune ve seri üretim hatları tek vardiyada planlanır.',
        imageUrl: picsum('atlas-cut-sew'),
      },
      {
        title: 'QC checkpoint',
        caption: 'Her lot için dijital kalite raporu ve final audit.',
        imageUrl: picsum('atlas-qc'),
      },
      {
        title: 'Fabric library',
        caption: 'Pamuk, geri dönüşümlü polyester ve blended koleksiyonlar.',
        imageUrl: picsum('atlas-fabric'),
      },
      {
        title: 'Packing area',
        caption: 'E-ticaret ve perakende kolileme senaryoları hazır.',
        imageUrl: picsum('atlas-packing'),
      },
    ],
  },
  {
    id: 'nova-metalworks',
    name: 'Nova Metalworks',
    city: 'Bursa',
    category: 'Metal İşleme',
    minimumOrder: 400,
    leadTimeDays: 24,
    score: 4.8,
    monthlyCapacity: 5200,
    logoText: 'NM',
    description:
      'Nova Metalworks; raf, makina kasası ve özel sac form ihtiyaçlarında teknik çizim okuması, proses takibi ve sevkiyat öncesi kalite kontrol ile çalışır.',
    certifications: ['ISO 9001', 'ISO 14001', 'EN 1090'],
    offerings: ['Sac kasa', 'Bracket', 'Panel', 'Makine govdesi'],
    coverStyle:
      'linear-gradient(135deg, #111827 0%, #334155 50%, #f97316 100%)',
    gallery: [
      {
        title: 'Laser cutting',
        caption: '0.8 mm - 12 mm arası sac kesim yeteneği.',
        imageUrl: picsum('nova-laser'),
      },
      {
        title: 'Welding bay',
        caption: 'MIG ve TIG hatları operatöre bağlı kalite kontrol ile ilerler.',
        imageUrl: picsum('nova-welding'),
      },
      {
        title: 'CNC bending',
        caption: 'Tekrarlanabilir tolerans yapısı ve lot bazlı takip.',
        imageUrl: picsum('nova-cnc'),
      },
      {
        title: 'Shipping prep',
        caption: 'Paletleme ve barkodlama süreci ERP akışına bağlıdır.',
        imageUrl: picsum('nova-shipping'),
      },
    ],
  },
  {
    id: 'polaris-molding',
    name: 'Polaris Molding',
    city: 'Kocaeli',
    category: 'Plastik Enjeksiyon',
    minimumOrder: 5000,
    leadTimeDays: 14,
    score: 4.7,
    monthlyCapacity: 54000,
    logoText: 'PM',
    description:
      'Polaris Molding; kalıp transferi, hammaddede izlenebilirlik ve çıkış kalite kontrol disiplini ile büyük hacimli enjeksiyon operasyonlarını yönetir.',
    certifications: ['ISO 9001', 'ISO 22000', 'GMP'],
    offerings: ['Kapak', 'Kavanoz', 'Tray', 'Teknik plastik parca'],
    coverStyle:
      'linear-gradient(135deg, #082f49 0%, #0f766e 52%, #22c55e 100%)',
    gallery: [
      {
        title: 'Injection line',
        caption: '24 saat vardiya ve lot bazlı ham madde izleme.',
        imageUrl: picsum('polaris-injection'),
      },
      {
        title: 'Mold maintenance',
        caption: 'Kalıp bakımı ve devir teslim dokümantasyonu.',
        imageUrl: picsum('polaris-mold'),
      },
      {
        title: 'Decoration line',
        caption: 'Tampon baskı ve etiket entegrasyonu hazır.',
        imageUrl: picsum('polaris-decoration'),
      },
      {
        title: 'Warehouse',
        caption: 'Cross-dock sevkiyat ile hızlı çıkış planlaması.',
        imageUrl: picsum('polaris-warehouse'),
      },
    ],
  },
  {
    id: 'vera-electronics',
    name: 'Vera Electronics Assembly',
    city: 'İzmir',
    category: 'Elektronik Montaj',
    minimumOrder: 250,
    leadTimeDays: 21,
    score: 4.9,
    monthlyCapacity: 4600,
    logoText: 'VE',
    description:
      'Vera Electronics Assembly; düşük ve orta hacimli elektronik montaj işlerinde DFM geri bildirimi, test planlama ve pilot üretim raporlarıyla çalışır.',
    certifications: ['ISO 9001', 'IPC-A-610', 'RoHS'],
    offerings: ['PCB assembly', 'Control board', 'IoT gateway', 'Final assembly'],
    coverStyle:
      'linear-gradient(135deg, #0f172a 0%, #7c3aed 48%, #06b6d4 100%)',
    gallery: [
      {
        title: 'SMT line',
        caption: 'Prototype ve low-volume dizgi akışına uygun.',
        imageUrl: picsum('vera-smt'),
      },
      {
        title: 'Testing bench',
        caption: 'Fonksiyonel test, burn-in ve kalite raporlama.',
        imageUrl: picsum('vera-testing'),
      },
      {
        title: 'Clean station',
        caption: 'ESD kontrollü montaj ve paketleme alanı.',
        imageUrl: picsum('vera-clean'),
      },
      {
        title: 'Pilot batch',
        caption: 'NPI dokümanı ve onboarding checklist seti.',
        imageUrl: picsum('vera-pilot'),
      },
    ],
  },
  {
    id: 'ligna-home',
    name: 'Ligna Home Lab',
    city: 'Ankara',
    category: 'Ahşap Mobilya',
    minimumOrder: 80,
    leadTimeDays: 28,
    score: 4.6,
    monthlyCapacity: 900,
    logoText: 'LH',
    description:
      'Ligna Home Lab; teknik çizim onayı, numune revizyonu ve montaj kılavuzu hazırlığı ile proje bazlı siparişleri yönetir.',
    certifications: ['ISO 9001', 'FSC', 'TSE'],
    offerings: ['Dining chair', 'Cafe table', 'Console', 'Custom cabinet'],
    coverStyle:
      'linear-gradient(135deg, #3f3f46 0%, #7c2d12 52%, #f59e0b 100%)',
    gallery: [
      {
        title: 'Wood shop',
        caption: 'Masif ve panel bazlı kesim operasyonları ayrıdır.',
        imageUrl: picsum('ligna-wood'),
      },
      {
        title: 'Finishing room',
        caption: 'Lake, vernik ve özel renk numune yönetimi.',
        imageUrl: picsum('ligna-finishing'),
      },
      {
        title: 'Assembly line',
        caption: 'Koli içi aparat ve montaj kılavuzu hazırlanır.',
        imageUrl: picsum('ligna-assembly'),
      },
      {
        title: 'Project staging',
        caption: 'Horeca teslimlerinde sevkiyat planlama desteği.',
        imageUrl: picsum('ligna-staging'),
      },
    ],
  },
  {
    id: 'aria-pack',
    name: 'Aria Pack Solutions',
    city: 'Gaziantep',
    category: 'Ambalaj',
    minimumOrder: 3000,
    leadTimeDays: 16,
    score: 4.8,
    monthlyCapacity: 72000,
    logoText: 'AP',
    description:
      'Aria Pack Solutions; FMCG ve e-ticaret markaları için kutu, pouch ve raf içi display çözümleri geliştirir. Grafik ön kontrol ve baskı provası ile süreci netleştirir.',
    certifications: ['ISO 9001', 'BRCGS Packaging', 'FSC'],
    offerings: ['Pouch', 'Offset box', 'Display stand', 'Label'],
    coverStyle:
      'linear-gradient(135deg, #0f172a 0%, #0f766e 44%, #f59e0b 100%)',
    gallery: [
      {
        title: 'Print prep',
        caption: 'Baskı öncesi proof ve renk onay akışı.',
        imageUrl: picsum('aria-print'),
      },
      {
        title: 'Pouch line',
        caption: 'Yüksek hacimli esnek ambalaj operasyonu.',
        imageUrl: picsum('aria-pouch'),
      },
      {
        title: 'Finishing',
        caption: 'Laminasyon, kesim ve paketleme tek akış üzerinde.',
        imageUrl: picsum('aria-finishing'),
      },
      {
        title: 'Display mockup',
        caption: 'Perakende raf testleri ve dummy sunum setleri.',
        imageUrl: picsum('aria-display'),
      },
    ],
  },
]
