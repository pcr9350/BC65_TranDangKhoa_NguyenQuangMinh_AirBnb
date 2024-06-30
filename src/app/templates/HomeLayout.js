import React from 'react'
import Header from '../(components)/Header'

const HomeLayout = (props) => {
  return (
    <div>
        <Header />
        <div className='w-100' style={{minHeight:800}}>
            {props.children}
        </div>
        <footer className='bg-primary text-center'>Footer</footer>
    </div>
  )
}

export default HomeLayout