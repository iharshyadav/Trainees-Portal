'use client'
import React, { useEffect, useRef } from 'react'
import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/navigation'

type Props = {
  onUpload: (e: string) => any
}

LR.registerBlocks(LR)

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter()
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null)

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl)
      console.log(file)
      if (file) {
        router.refresh()
      }
    }
    ctxProviderRef.current?.addEventListener('file-upload-success', handleUpload)
  }, [])

// pubkey="a9428ff5ff90ae7a64eb"
  return (
    <>
      <lr-config
        ctx-name="my-uploader"
        pubkey="9538b213b3b1493f5cbf"
      />

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.36.0/web/lr-file-uploader-regular.min.css`}
        class="my-config"
      />

      <lr-upload-ctx-provider
        ctx-name="my-uploader"
        ref={ctxProviderRef}
      />
    </>
  )
}

export default UploadCareButton