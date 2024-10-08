import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

export default function SignIn() {

  const [formData, setFormData] = useState({});
  // const [errorMessage,setErrorMessage] = useState(null);
  // const [loading,setLoading] = useState(false);
  const {loading, error: errorMessage} = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()}); //we are using trim, so that if someone added space by mistake that we don't save.
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if ( !formData.email || !formData.password){
      // return setErrorMessage("Please fill out all fields.")
      return dispatch(signInFailure("Please fill out all fields."));
    }
    try {
      // when it starts we set loading true
      // setLoading(true);
      // maybe we have error from previous req, so wants to set it null as well
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if(data.success === false){
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
      }
      // if everything is fine, no errors
      // setLoading(false);
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }

    } catch (error) { //client side message
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col gap-5 md:flex-row md:items-center">
        {/* left side */}
        <div className="flex-1">
        <Link to='/' className='text-4xl font-bold dark:text-white'>
            <span className='py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'><img src="./TJ_LOGO.png" alt="logo" className='w-20 inline' /></span>Blog
        </Link>
        <p className='text-sm'>
          This is all rounder blog. You understand it right you write or find anything here. You can sign in with your email or with Google.
        </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="">
              <Label value='Your email'/>
              <TextInput
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value='Your password'/>
              <TextInput
              type='password'
              placeholder='********'
              id='password'
              onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' /> 
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : "Sign In"
              }
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Don't Have an account?</span>
            <Link to="/sign-up" className='text-blue-500'>Sign Up</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
