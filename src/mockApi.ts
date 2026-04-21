import type { ManufacturerRequestPayload } from '@/types'

function wait(duration: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

function createReferenceCode() {
  const stamp = Date.now().toString().slice(-6)
  return `TLP-${stamp}`
}

export async function submitManufacturerRequest(
  payload: ManufacturerRequestPayload,
  monthlyCapacity: number,
) {
  await wait(1200)

  if (payload.quantity > monthlyCapacity) {
    throw new Error(
      'Talep miktarı, üreticinin doğrulanmış aylık kapasitesini aşıyor. Lütfen daha düşük bir miktar veya parçalı teslim planı belirtin.',
    )
  }

  if (payload.description.toLocaleLowerCase('tr').includes('iptal')) {
    throw new Error(
      'Açıklama alanı operasyon onayı için yeterince net değil. Daha açık bir üretim özeti paylaşın.',
    )
  }

  return {
    referenceCode: createReferenceCode(),
    manufacturerId: payload.manufacturerId,
  }
}
