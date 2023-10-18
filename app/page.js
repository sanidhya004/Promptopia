import Feed from '@components/Feed'
import Image from 'next/image'

export default function Home() {
  return (
    <section className='w-full flex-center flex-col'>
         <p className='head_text text-center'>Discover and Share
           <br/>
           <span className='orange_gradient text-center'>AI-Powered Prompts</span>
         </p>
         <p className='desc text-center'>
      Promptopia is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts
    </p>

    <Feed/>

    </section>
  )
}
