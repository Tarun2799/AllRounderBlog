import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsInstagram, BsTwitterX, BsGithub, BsDribbble} from 'react-icons/bs';

export default function FooterCon() {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="">
                        <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-lg font-semibold dark:text-white'>
                            <span className='py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'><img src="./TJ_LOGO.png" alt="logo" className='w-8 inline sm:w-11 sm:py-2' /></span>Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title='About' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://tarunjhamb-portfolio.netlify.app/' target='_blank' rel='noopener noreferrer'>
                                    Tj's Portfolio
                                </Footer.Link>
                                <Footer.Link href='/' target='_blank' rel='noopener noreferrer'>
                                    Tj's Blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    
                    
                        <div>
                            <Footer.Title title='FOLLOW US' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://github.com/Tarun2799' target='_blank' rel='noopener noreferrer'>
                                    Github
                                </Footer.Link>
                                <Footer.Link href='https://www.instagram.com/tarun.jhamb.007/#' target='_blank' rel='noopener noreferrer'>
                                    Instagram
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    
                    
                        <div>
                            <Footer.Title title='LEGAL' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='#'>
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href='#'>
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider/>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href='#' by="Tj's Blog" year={new Date().getFullYear()}/>
                    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                        <Footer.Icon href='#' icon={BsFacebook}/>
                        <Footer.Icon href='#' icon={BsInstagram}/>
                        <Footer.Icon href='#' icon={BsTwitterX}/>
                        <Footer.Icon href='#' icon={BsGithub}/>
                        <Footer.Icon href='#' icon={BsDribbble}/>
                    </div>
                </div>
            </div>
        </Footer>
    )
}
