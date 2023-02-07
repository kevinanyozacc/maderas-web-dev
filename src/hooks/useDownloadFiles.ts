interface IProps {
  url: string,
  nameFile?: string
}

// interface FileB64 {
//   ext: string
//   mime: string
//   name: string
//   base64: string
// }

// interface APIDownload {
//   ok: boolean
//   data?: FileB64[]
//   error?: string
// }

function saveBlob (fileName: string, base64: string) {
  const link = document.createElement('a')
  link.href = base64
  link.download = fileName
  link.click()
}

export default async function useDownloadFiles ({ url, nameFile }: IProps) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors'
    }
  })

  const data: any = await res.json()

  if (data.ok && data?.data) {
    for (const file of data.data) {
      saveBlob(`${file.name}`, file.base64)
    }
  }
}
