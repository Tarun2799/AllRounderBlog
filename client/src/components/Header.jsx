import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import "../App.css"
import { Link, useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

export default function Header() {
  
  const path = useLocation().pathname; // this we are using, to active the links in collapsing mode.

  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white'>
            <span className='py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'><img src="./TJ_LOGO.png" alt="logo" className='w-8 inline sm:w-11 sm:py-2' /></span>Blog
        </Link>
        <form>
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
          />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch/>
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button className='w-12 h-10 hidden sm:inline' color='gray' pill >
            <FaMoon/>
          </Button>
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline className='w-17 h-10 sm:w-24 sm:h-10'>
              Sign In
            </Button>
          </Link>
          <Navbar.Toggle/>
        </div>
        <Navbar.Collapse> 
          <Navbar.Link active={ path === '/'} as={'div'}>
          {/* // here we are usinf 'active' for small screen showing active link */}
            <Link to='/'>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={ path === '/about'} as={'div'}>
            <Link to='/about'>About</Link>
          </Navbar.Link>
          <Navbar.Link active={ path === '/projects'} as={'div'}>
            <Link to='/projects'>Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
