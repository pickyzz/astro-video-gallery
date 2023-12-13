export type Video = {
  // Photo ID (unique). It will also become the URL slug.
  id: number | string
  // Photo title
  title: string
  // Photo URL (can be absolute or relative to the public folder)
  url: string
  // Photo description
  description?: string
  // Thumnail URL
  thumbnail: string
}

export const videos: Video[] = [
  {
    id: 1,
    title: 'เสียงเด็กหนุ่มชาย (อนิเมะ)',
    description:
      "ตัวละคร โทมิโอกะ กิยู (ดาบพิฆาตรอสูร)",
    url: '/vid/demo_giyuu.mp4',
    thumbnail: '/img/giyuu.png',
  },
  {
    id: 2,
    title: 'เสียงผู้ใหญ่ชาย (อนิเมะ)',
    description:
      'ตัวละคร ชิบะ ไทจุ (โตเกียวรีเวนเจอร์)',
    url: '/vid/demo_taijuu.mp4',
    thumbnail: '/img/taijuu.png',
  },
]
