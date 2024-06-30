import Link from 'next/link'
import React from 'react'

const PageNotFound = () => {
  return (
    <div className='container'>
        Link kết không tìm thấy ! <Link href={'/'}>Quay lại trang chủ</Link>
    </div>
  )
}

export default PageNotFound