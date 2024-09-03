import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col gap-5 md:flex-row md:items-center">
        {/* left side */}
        <div className="flex-1">
        <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'><img src="./TJ_LOGO.png" alt="logo" className='w-20 inline' /></span>Blog
        </Link>
        <p className='text-sm'>
          This is all rounder blog. You understand it right you write or find anything here.
        </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className='flex flex-col gap-4'>
            <div className="">
              <Label value='Your name'/>
              <TextInput
              type='text'
              placeholder='Username'
              id='username'
              />
            </div>
            <div className="">
              <Label value='Your email'/>
              <TextInput
              type='email'
              placeholder='name@company.com'
              id='email'
              />
            </div>
            <div className="">
              <Label value='Your password'/>
              <TextInput
              type='password'
              placeholder='Password'
              id='password'
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className='text-blue-500'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
